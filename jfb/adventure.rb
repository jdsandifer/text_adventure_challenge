#!/usr/bin/env ruby

require 'pry'

class Room

    attr_accessor :doors, :type, :items

    def initialize(room_type = 'room')
        @doors = []
        @items = []
        @type = room_type
    end # initialize

    def describe
    end # describe

    def item_remove(item_in)
        new_inv = []
        @items.each { |item|
            new_inv << item unless item == item_in
        }
        @items = new_inv
    end

end

class Door

    attr_accessor :position, :type, :visible, :locked
    def initialize(position, type = 'normal', visible = true, locked = false)
        @visible = visible
        @position = position
        @type = type
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
        @inventory = new_inv
    end

    def move(direction)
        #binding.pry
        unless direction =~ /^(north|south)?(east|west)?$/
            return nil
        end
        if @position == 'middle'
            @position = direction
        else
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
        end
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
    search <direction>  locate hidden features
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
rooms[0].doors << Door.new('east', 'normal', false)
rooms[0].items << Item.new('tapestry', 'a', 'south')
#rooms[0].items << Item.new('chisel', 'a', 'middle')
rooms[0].items << Item.new('ocarina', 'an', 'northeast')
rooms[0].items << Item.new('pair of scissors', 'a', 'middle')

rooms[1] = Room.new
rooms[1].doors << Door.new('west')
rooms[1].doors << Door.new('floor', 'trap', false)

rooms[2] = Room.new('passage')
rooms[2].doors << rooms[0].doors[0]
rooms[2].doors << rooms[1].doors[0]

rooms[3] = Room.new

#puts rooms.inspect

#pc = Player.new(rooms[rand(rooms.size)])
pc = Player.new(rooms[0])
pc.inventory << Item.new('chisel', 'a', '')


puts <<-EOH
You are walking through the basement of an abandoned building as you
explore the old part of this city.

Suddenly the floor weakens and gives way! You fall through a hole!

You pick yourself off the ground and try to make out your surroundings.

Type 'help' at any time for help.
EOH


while true do

    print "\nYou are in the #{pc.position} of a #{pc.location.type}.\n> "

    break unless command = gets
    command = command.chomp.downcase

    print "\n"

    command = normalize_command(command)

    if command =~ /\s/
        cmd = command[0, command.index(' ')]
        args = command.split(/\s+/)
        args.shift
    else
        cmd = command
        args = nil
    end

    if cmd =~ /^(go|search|get|drop|hold)\s*$/
        if ! args
            puts 'Wh' + (cmd =~ /^(go|search)$/ ? 'ere' : 'at') + " do you want to #{cmd}?"
            next
        end
    elsif cmd == 'unhold' and args
        puts "Input error: command 'unhold' is used only by itself."
        next
#    else
#        puts "'#{command}'"
    end # if command

#binding.pry
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
                        puts "in the " + item.position + " of the room"
                    end # if item.position
                }
            end # if pc.location.items.size
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
                        puts "going to move through door"
                    end
                else
                    puts "You start toward the wall but see no door to walk through."
                end
            else
                res = pc.move(direction)
                if res
                    puts "You take a few steps to the #{direction}."
                else
                    puts "Invalid direction '#{direction}'."
                end
            end
        when 'search'
            puts "going to search "
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
                puts "You set the #{found_item.name} beside you."
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
