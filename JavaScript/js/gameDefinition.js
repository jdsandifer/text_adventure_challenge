// Jacob's working on this...

class Game {
  constructor(setupData) {
    //setup the DOM with jquery
    const $userInput = $("#command")
    const $outputBox = $("#message")

    //create a messenger with access to the dom output box
    const messenger = new Messenger($outputBox)

    //create a new interpreter/parser with availible commands and synonyms
    const parser = new Parser({
      go: ['go', 'walk', 'run', 'flee'],
      look: ['look', 'l', 'view', 'examine', 'inspect'],
      take: ['take', 't', 'pick', 'grab', 'steal'],
      inventory: ['inventory', 'i', 'stuff', 'pack', 'backpack'],
      use: ['use', 'u', 'operate'],
      drop: ['drop', 'd', 'leave', 'throw', 'abandon']
    })

    //init the game state
    let {_player, _rooms, _doors, _items, _entities, _currentRoom} = setState(setupData)

    //private func for setting _currentRoom
    function setCurrentRoom(room){
      _currentRoom = room
    }

    // Sets up the game data with setupDate (or loads previous game)
    function setState(setupData) {
      // Create item objects from setupData
      _items = setupData.items.map((item)=> new Item(
        item.name, item.descriptions[0])
      )

      // Create entities from setupData
      // TODO: Add entity code here and in room setup below

      // Create room objects from setupData
      //TODO finish working this out
      _rooms = setupData.rooms.map((room)=> new Room(
        room.name, room.descriptions[0], )
      )
      setCurrentRoom(_rooms[0])

      // Create door objects from setupData
      for (let door of setupData.doors) {
        const room1Name = door.connectingRooms[0]
        const room2Name = door.connectingRooms[1]
        let connectedRooms = [roomByName(room1Name), roomByName(room2Name)]
        let newDoor = new Door( door.name,
                                door.descriptions[0],
                                connectedRooms)
        _doors.push(newDoor)
      }

      // Add doors to rooms
      for (let room of setupData.rooms) {
        for (let direction in room.doors) {
          let roomObject = roomByName(room.name)
          roomObject.addDoor(direction, doorByName(room.doors[direction]))
        }
      }

      // Create player object from setupData
      _player = new Player( setupData.entities.player.name,
                            setupData.entities.player.descriptions[0],
                            setupData.entities.player.health,
                            setupData.entities.player.strength,
                            [],
                            setupData.entities.player.hunger)
      for (let itemName of setupData.entities.player.inventory) {
        let item = itemByName(itemName)
        _player.take(item)
      }
    }//end reset state

    //debug function that shows info about room in UI
    function debugDisplayRoomStats(room){
      $('#room').text(room.name())
      $('#description').text(romm.description())
      $('#items').text(romm.listOfItems())
    }

    function itemByName(itemName) {
      for (let item of _items) {
        if (item.name() === itemName)
          return item
      }
      throw new Error("Game.itemByName(): No item named " + itemName + ".")
    }

    function roomByName(roomName) {
      for (let room of _rooms) {
        if (room.name() === roomName)
          return room
      }
      throw new Error("Game.roomByName(): No room named " + roomName + ".")
    }

    function doorByName(doorName) {
      for (let door of _doors) {
        if (door.name() === doorName)
          return door
      }
      throw new Error("Game.doorByName(): No door named " + doorName + ".")
    }


    //run function starts the game accepting input
    this.run = () => {
      //$('#playerHealth').text('health:' + state.player.getHeath())
      // ** debugging feature **
      debugDisplayRoomStats(_currentRoom)

      $userInput.on('keydown', (event) => {
        //user presses enter
        if (event.which === 13) {
          let commands = parser.validate($userInput.val())
          let command = {}

          while (command = commands.next().value) {
            switch (command.action) {
              case 'go':
                go(command.payload)
                break
              case 'take':
                take(command.payload)
                break
              case 'inventory':
                inventory()
                break
              case 'drop':
                drop(command.payload)
                break
              default:
                throw new Error('Something went wrong in the parser for command', command)

            }
          }//end while, no more commands to switch

          //clear the input field
          $userInput.val('')
        }
        else if(event.which === 38){//Up arror pushed
          $userInput.val(parser.getLastCommandHistory())
        }
        else if(event.which === 40){//Down arror pushed
          $userInput.val(parser.getNextCommandHistory())
        }
      })
    }

    /// Functions for commands start here *******
    function go(direction) {
      if (_currentRoom.canGo(direction)) {
        setCurrentRoom(_currentRoom.connectedRoom(direction))
        debugDisplayRoomStats(_currentRoom)

        checkWinningConditions()
      }
      else{
        messenger.addOutput(`You can't go ${direction}.`)
      }
    }

    function take(itemName) {
      if (_currentRoom.hasItem(itemName)) {
        let item = _currentRoom.removeItem(itemName)
        _player.take(item)
        $('#items').text(_currentRoom.listOfItems())
      }
      else{
        messenger.addOutput(`There's no ${itemName} here.`)
      }
    }

    function inventory() {
      messenger.addOutput(_player.inventory())
    }

    function drop(itemName) {
      if (_player.has(itemName)) {
        let item = _player.drop(itemName)
        _currentRoom.addItem(item)
        $('#items').text(_currentRoom.listOfItems())
      }
      else{
        messenger.addOutput(`You don't have a ${itemName}.`)
      }

      checkWinningConditions()
    }

    function checkWinningConditions() {
      // Hacked in game-winning condition.
      if (_currentRoom.name() === 'Secret Room'
          && _currentRoom.hasItem('toy')
          && _currentRoom.hasItem('knife')) {
        _currentRoom = new Room('You win!',
                                "You've completed the game by giving the man the toy and the knife.")
        debugDisplayRoomStats(_currentRoom)
      }
    }
  } //end constructor
}
