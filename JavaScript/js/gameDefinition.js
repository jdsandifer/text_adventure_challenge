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
      look: ['look', 'view', 'examine', 'inspect'],
      take: ['take', 'pick', 'grab', 'steal'],
      use: ['use', 'operate'],
      drop: ['drop', 'leave', 'throw', 'abandon']
    })

    //init the game state
    let _rooms = []
    let _doors = []
    let _items = []
    let _entities = []
    let _currentRoom = {}
      //let _player = {}
    resetState(setupData)

    //private func for setting _currentRoom
    function setCurrentRoom(room){
      _currentRoom = room
    }

    // Sets up the game data with setupDate (or loads previous game)
    function resetState(setupData) {
      // Create item objects from setupData
      for (let item of setupData.items) {
        let newItem = new Item( item.name,
                                item.descriptions[0])
        _items.push(newItem)
      }

      // Create entities from setupData
      // TODO: Add entity code here and in room setup below

      // Create room objects from setupData
      for (let room of setupData.rooms) { 
        let newRoom = new Room( room.name, 
                                room.descriptions[0])
        for (let itemName of room.items) {
          newRoom.addItem(itemByName(itemName))
        }
        _rooms.push(newRoom)
      }
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
        //_player = new Player( player.name,
        //                      player.description,
        //                      player.health,
        //                      player.strength,
        //                      player.inventory,
        //                      player.hunger)
    }

    function itemByName(itemName) {
      for (let item of _items) {
        if (item.name() === itemName)
          return item
      }
      return {}
    }

    function roomByName(roomName) {
      for (let room of _rooms) {
        if (room.name() === roomName)
          return room
      }
      return {}
    }

    function doorByName(doorName) {
      for (let door of _doors) {
        if (door.name() === doorName)
          return door
      }
      return {}
    }

    //run function starts the game accepting input
    this.run = () => {
      //$('#playerHealth').text('health:' + state.player.getHeath())  
      // ** debugging feature **
      $('#room').text(_currentRoom.name())
      $('#description').text(_currentRoom.description())
      $('#items').text(_currentRoom.listOfItems())

      $userInput.on('keydown', (event) => {
        //user presses enter
        if (event.which === 13) {
          let commands = parser.validate($userInput.val())
          let command = []

          while (command = commands.next().value) {
            switch (command[0]) {
              case 'go':
                go(command[1])
                break
              default:
                console.log('Something went wrong in the parser for command', command)

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

    // Private movement function - might need to be 
    function go(direction) {
      if (_currentRoom.canGo(direction)) {
        setCurrentRoom(_currentRoom.connectedRoom(direction))
        //messenger.addOutput(`You went to the ${_currentRoom.name() }`)
        $('#room').text(_currentRoom.name()) // needs to be moved
        $('#description').text(_currentRoom.description())
       $('#items').text(_currentRoom.listOfItems())
      }
      else{
        messenger.addOutput(`You can't go ${direction}.`)
      }
    }
  } //end constructor
}
