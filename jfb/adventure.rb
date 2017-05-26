#!/usr/bin/env ruby

require 'pry'
require 'readline'

class Room

    attr_accessor :doors, :type, :items, :directions

    def initialize(room_type = 'room')
        @doors = []
        @items = []
        @type = room_type
        @ambient = (room_type == 'room' ? nil : 'dark and musty')
        @directions = {
            'north' => 1,
            'south' => 1,
            'east' => 1,
            'west' => 1,
            'northeast' => 1,
            'northwest' => 1,
            'southeast' => 1,
            'southwest' => 1,
        }
    end # initialize

    def describe
        text = ''
        text +=  "It is #{@ambient} in here.\n" if @ambient
        if @type == 'passage'
            text += "You can move only #{@directions.keys[0]} or #{@directions.keys[1]} in here.\n"
        end
        return nil if text == ''
        return text.chomp
    end # describe

    def item_remove(item_in)
        new_inv = []
        @items.each { |item|
            new_inv << item unless item == item_in
        }
        @items = new_inv
    end

    def find_door(type, position, visible = nil)
        @doors.each { |door|

            # if visibility was specified, only doors with that visibility can match.
            next if visible != nil and door.visible != visible

            # visibility matched the specified value or was not specified; return
            # the door if it is at the specified position.
            return door if door.type == type and door.position.match(/#{position}/)
        }
        return nil
    end

end

class Door

    attr_accessor :position, :type, :visible, :locked, :to_door, :room
    def initialize(position, type = 'door', visible = true, locked = false)
        @visible = visible
        @position = position
        @type = type
        @to_door = nil
        @room = nil
    end # initialize

end

class Player
    attr_accessor :location, :position, :inventory
    def initialize(location, position = 'middle')
        @location = location
        @position = position
        @inventory = []
    end

    def holding
        @inventory.each { |item|
            return item if item.in_hand
        }
        return nil
    end

    def inventory_remove(drop_item)
        new_inv = []
        @inventory.each { |item|
            new_inv << item unless item == drop_item
        }
        drop_item.in_hand = false
        @inventory = new_inv
    end

    def move(direction)

        if direction == 'up'
            if @location.find_door('hole', 'ceiling')
                puts "You jump and jump, as high as you can, but you cannot reach the edges\n" +
                    "of the hole. If only you were 20 feet (6.096m) taller!"
            elsif @location.find_door('trap door', 'ceiling', true)
                if @position == 'middle'
                    puts "You grab the chain hanging from the trap door and pull it but immediately\n" +
                        "realize that this part of the universe has not yet been coded. What a world!"
                else
                    puts "Move to the middle of the room to access the trap door."
                end
            else
                puts "You see no way through the ceiling."
            end
            return -1
        elsif direction == 'down'
            if @location.find_door('hole', 'floor')
                puts "You try to jump into the hole but immediately realize that this part of\n" +
                    "the universe has not yet been coded. What a world!"
            elsif @location.find_door('trap door', 'floor', true)
                if @position == 'middle'
                    puts "You push down on the trap door but immediately realize that this part of\n" +
                        "the universe has not yet been coded. What a world!"
                else
                    puts "Move to the middle of the room to access the trap door."
                end
            else
                puts "You see no way through the floor."
            end
            return -1
        elsif direction =~ /^(north|south)?(east|west)?$/
            if @location.directions[direction]
                # the whole position/direction system needs some big-time refactoring
                pos_ew = pos_ns = move_ew = move_ns = 0
                newpos = ''
                pos_ew = 1 if @position =~ /east/
                pos_ew = -1 if @position =~ /west/
                pos_ns = 1 if @position =~ /north/
                pos_ns = -1 if @position =~ /south/
                move_ew = 1 if direction =~ /east/
                move_ew = -1 if direction =~ /west/
                move_ns = 1 if direction =~ /north/
                move_ns = -1 if direction =~ /south/
                new_ns = pos_ns + move_ns
                new_ew = pos_ew + move_ew
                newpos = 'north' if new_ns == 1
                newpos = 'south' if new_ns == -1
                newpos += 'east' if new_ew == 1
                newpos += 'west' if new_ew == -1
                @position = (newpos == '' ? 'middle' : newpos)
                return 1
            else
                puts "You see only a wall to the #{direction}."
                return -1
            end
        end
        return 0
    end
end

class Item
    attr_accessor :name, :position, :in_hand
    def initialize (name, article, position)
        @name = name
        @position = position
        @indefinite_article = article
        @in_hand = false
    end

    def indefinite
        return @indefinite_article + " " + @name
    end
end

def die_roll(dice, sides)
    roll = 0
    (1..dice).each {
        subroll = rand(sides)+1
        roll += subroll
    }
    return roll
end

def normalize_command(cmd)
    cmd = cmd.sub(/^\s+/, '').sub(/\s+$/, '')
    case
        # straight-up substitutions
        when cmd.match(/^pick up/)
            return cmd.sub(/^pick up/, 'get')
        when cmd.match(/^put down/)
            return cmd.sub(/^put down/, 'drop')
        when cmd.match(/^move/)
            return cmd.sub(/^move/, 'go')
        when cmd.match(/^(exit|bye)$/)
            return 'quit'

        # abbreviations
        when "inventory".index(cmd)
            return cmd.sub(/^i.*/, 'inventory')
        when "look".index(cmd)
            return cmd.sub(/^l\S*/, 'look')
        when cmd =~ /^h(o(l(d)?)?)?\s/
            return cmd.sub(/^h\S*/, 'hold')
        when cmd =~ /^u(n(h(o(l(d)?)?)?)?)?\s*/
            return cmd.sub(/^u\S*/, 'unhold')
        else
            return cmd
    end
end

def item_search(items, name)
    items.each { |item|
        if item.name == name or (name.size >= 5 and item.name.index(name))
            return item
        end
    }
    return nil
end


HELP = <<-EOH
Valid commands:
    l[ook]              view your surroundings
    go <direction>      move around your environment
    move <direction>    alias for 'go'
    search              locate hidden features
    get <object>        pick up an item
    pick up <object>    alias for 'get'
    drop <object>       put down an item
    put down <object>   alias for 'drop'
    h[old] <object>     ready an item for use, replacing held item (if any)
    u[nhold]            place held item in your pack
    i[nventory]         list items in your possession
    quit, exit, bye     leave the game

Valid directions: n[orth] s[outh] e[ast] w[est]
                  n[orth]w[est] n[orth]e[ast]
                  s[outh]w[est] s[outh]e[ast]
                  up down
EOH

rooms = []

rooms[0] = Room.new
rooms[0].items << Item.new('tapestry', 'a', 'south')
rooms[0].items << Item.new('chisel', 'a', 'middle')
rooms[0].items << Item.new('ocarina', 'an', 'northeast')
rooms[0].items << Item.new('pair of scissors', 'a', 'middle')

rooms[1] = Room.new

rooms[2] = Room.new('passage')
rooms[2].directions = {'southwest' => 1, 'northeast' => 1}

door_room0_room1 = Door.new('east')
door_room0_room1.room = rooms[0]
door_room0_room1.to_door = Door.new('southwest') # passage side of the door
door_room0_room1.to_door.to_door = door_room0_room1
rooms[0].doors << door_room0_room1

door_room1_room0 = Door.new('west')
door_room1_room0.room = rooms[1]
door_room1_room0.to_door = Door.new('northeast') # passage side of the door
door_room1_room0.to_door.to_door = door_room1_room0
rooms[1].doors << door_room1_room0

door_room0_room1.to_door.room = rooms[2]
rooms[2].doors << door_room0_room1.to_door
door_room1_room0.to_door.room = rooms[2]
rooms[2].doors << door_room1_room0.to_door

#rooms[3] = Room.new

#puts rooms.inspect

pc = Player.new(rooms[rand(rooms.size)])
pc.location.doors << Door.new('ceiling', 'hole')

rooms[1].doors << Door.new('ceiling', 'trap door', false) unless rooms[1].find_door('hole', 'ceiling')

puts <<-EOH
You are walking through the basement of an abandoned building as you
explore the old part of this city.

Suddenly the floor weakens and gives way! You fall through a hole!

You pick yourself off the ground and try to make out your surroundings.

Type 'help' at any time for help.
EOH


while true do

    print "\nYou are in the #{pc.position} of a #{pc.location.type}.\n#{(pc.location.describe + "\n") if pc.location.describe}"
    command = Readline::readline('> ')
    break if command.nil?
    command = normalize_command(command)
    Readline::HISTORY.push(command) if Readline::HISTORY.length == 0 or
                                       Readline::HISTORY[Readline::HISTORY.length-1] != command

    command = command.downcase

    print "\n"

    if command =~ /\s/
        cmd = command[0, command.index(' ')]
        args = command.split(/\s+/)
        args.shift
    else
        cmd = command
        args = nil
    end

    if cmd =~ /^(go|get|drop|hold)\s*$/
        if ! args
            puts 'Wh' + (cmd == 'go' ? 'ere' : 'at') + " do you want to #{cmd}?"
            next
        end
    elsif cmd == 'unhold' and args
        puts "Input error: command 'unhold' is used only by itself."
        next
#    else
#        puts "'#{command}'"
    end # if command

    case cmd
        when 'look'
            print "You see "
            if pc.location.items.size == 0
                puts "no objects here."
            else
                puts "here:"
                pc.location.items.each { |item|
                    print "- #{item.indefinite} "
                    if item.position == pc.position
                        puts "beside you"
                    else
                        puts "in the " + item.position + " of the #{pc.location.type}"
                    end # if item.position
                }
            end # if pc.location.items.size
            if pc.location.doors.size > 0
                puts "\n"
                pc.location.doors.each { |door|
                    next unless door.visible
                    side = pc.location.type == 'room' ? 'side' : 'end'
                    puts "You see a #{door.type} " + (door.position =~ /^(ceiling|floor)$/ ? 'in' : 'on') +
                        " the #{door.position}" + (door.position =~ /^(ceiling|floor)$/ ? '.' : " #{side} of the #{pc.location.type}.")
                }
            end # if pc.location.doors.size
        when 'go'
            direction = args.shift
            if pc.position == direction
                # player moves into a wall
                move_door = nil
                pc.location.doors.each { |door|
                    move_door = door if door.position == pc.position and door.visible
                }
                if move_door
                    if move_door.locked and pc.holding.name != 'key'
                        puts "The #{direction} door is locked."
                    else
                        if move_door.locked and pc.holding.name == 'key'
                            puts "You unlock the door and walk through it."
                            move_door.locked = false
                            move_door.to_door.locked = false
                        else
                            puts "You open the door and walk through."
                            pc.location = move_door.to_door.room
                            pc.position = move_door.to_door.position
                        end
                    end
                else
                    puts "You start toward the wall but see no door to walk through."
                end
            else
                res = pc.move(direction)
                if res > 0
                    puts "You take a few steps to the #{direction}."
                elsif res == 0
                    puts "Invalid direction '#{direction}'."
                end
            end
        when 'search'
            puts "You feel around in the dust and dirt that seems to cover every surface here."
            uncovered = pc.location.find_door(pc.position == 'middle' ? 'trap door' : 'door',
                                              pc.position == 'middle' ? 'floor|ceiling' : pc.position,
                                              false)
            if uncovered and die_roll(5, 12) <= 50
                if uncovered.position == 'ceiling'
                    puts "A cloud of dust hits you in the face. Yecch." if die_roll(4, 8) < 30
                    puts "You knock a slim chain loose from the ceiling!"
                end
                print "You find a #{uncovered.type} in the #{uncovered.position}"
                print ' wall' if uncovered.type == 'door'
                puts "!"
                uncovered.visible = true
                uncovered.to_door.visible = true if uncovered.to_door
            else
                puts "After a few minutes of fruitless searching, you give up."
            end
        when 'inventory'
            puts "You are holding #{pc.holding.indefinite}." if pc.holding
            if (pc.inventory.size > 0 and !pc.holding) or (pc.inventory.size > 1 and pc.holding)
                puts "Items in pack:"
                pc.inventory.each { |item|
                    puts "- " + item.name unless item.in_hand
                }
            else
                puts "You have no items in your pack."
            end
        when 'hold'
            requested_item = args.join(' ')
            found_item = item_search(pc.inventory, requested_item)
            if found_item
                if found_item.in_hand
                    puts "You are already holding your #{found_item.name}."
                else
                    pc.inventory.each { |item|
                        puts "You stash the #{item.name} in your pack." if item.in_hand
                        item.in_hand = false
                    }
                    found_item.in_hand = true
                    puts "You are now holding #{found_item.indefinite}."
                end
            else
                puts "I couldn't find that item in your inventory."
            end
        when 'unhold'
            if pc.holding
                pc.holding.in_hand = false
                puts "You stash the #{found_item.name} in your pack."
            else
                puts "You are not holding anything."
            end
        when 'drop'
            requested_item = args.join(' ')
            found_item = item_search(pc.inventory, requested_item)
            if found_item
                pc.inventory_remove(found_item)
                found_item.position = pc.position
                pc.location.items << found_item
                puts "You set the #{found_item.name} down beside you."
            else
                puts "I couldn't find that item in your inventory."
            end
        when 'get'
            requested_item = args.join(' ')
            available_items = []
            pc.location.items.each { |item|
                available_items << item if item.position == pc.position
            }
            if available_items.size > 0
                found_item = item_search(available_items, requested_item)
                if found_item
                    pc.location.item_remove(found_item)
                    found_item.position = ''
                    pc.inventory << found_item
                    puts "You grab the #{found_item.name} and stash it in your pack."
                else
                    puts "You see no objects here matching that description."
                end
            else
                puts "You see no objects here."
            end
        when 'help'
            puts HELP
        when 'quit'
            break
        when ''
            next
        else
            puts "I don't understand your command '#{command}'.\nEnter 'help' for help."
    end # case

end # while

puts "\nThe world melts around you as you wake up from a weird dream!"
