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
    let {_player, _rooms, _doors, _currentRoom} = loadGame(setupData)

    //private func for setting CurrentRoom str
    function setCurrentRoom(roomName){
      _currentRoom = roomName
    }

    //private func for getting CurrentRoom obj
    function getCurrentRoom(){
      return _rooms.find(room => _currentRoom == room.name())
    }

    // Sets up the game data with setupDate (or loads previous game)
    function loadGame(gameData) {
      return {
        // Create player object from setupData
        _player: new Player(
          gameData.entities.player.name,
          gameData.entities.player.descriptions[0],
          gameData.entities.player.health,
          gameData.entities.player.strength,
          gameData.entities.player.inventory.map(item =>
            new Item(
              item,
              gameData.items[item].descriptions[0])),
          gameData.entities.player.hunger),

        // Create door objects from setupData
        _doors: Object.keys(gameData.doors).map(door => new Door(
          door,
          gameData.doors[door].descriptions[0],
          gameData.doors[door].connectingRooms)),

        // Create room objects from setupData
        //TODO add entities to the room objs once entity class is implemented
        // example of adding simple named entity here:
        // gameData.rooms[room].entities.map(entityName => new Entity(
        //  gameData.entities[entityName].name))
        _rooms: Object.keys(gameData.rooms).map(room => new Room(
          room,
          gameData.rooms[room].descriptions[0],
          gameData.rooms[room].doors,
          gameData.rooms[room].items.map(item =>
            new Item(
              item,
              gameData.items[item].descriptions[0])))),

        // Set the current room
        _currentRoom: gameData.game.startingRoom
      }
    }

    //debug function that shows info about room in UI
    function debugDisplayRoomStats(room){
      $('#room').text(room.name())
      $('#description').text(room.description())
      $('#items').text(room.listOfItems())
    }

    //run function starts the game accepting input
    this.run = () => {
      //$('#playerHealth').text('health:' + state.player.getHeath())
      // ** debugging feature **
      debugDisplayRoomStats(getCurrentRoom())

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
      if (getCurrentRoom().getDoor(direction)) {
        setCurrentRoom(_doors.find(door =>
          door.name() === getCurrentRoom().getDoor(direction)).otherRoom(getCurrentRoom()))
        debugDisplayRoomStats(getCurrentRoom())

        checkWinningConditions()
      }
      else{
        messenger.addOutput(`You can't go ${direction}.`)
      }
    }

    function take(itemName) {
      if (getCurrentRoom().hasItem(itemName)) {
        let item = getCurrentRoom().removeItem(itemName)
        _player.take(item)
        $('#items').text(getCurrentRoom().listOfItems())
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
        getCurrentRoom().addItem(item)
        $('#items').text(getCurrentRoom().listOfItems())
      }
      else{
        messenger.addOutput(`You don't have a ${itemName}.`)
      }

      checkWinningConditions()
    }

    function checkWinningConditions() {
      // Hacked in game-winning condition.
      if (getCurrentRoom().name() === 'Secret Room'
          && getCurrentRoom().hasItem('toy')
          && getCurrentRoom().hasItem('knife')) {
        _currentRoom = new Room('You win!',
                                "You've completed the game by giving the man the toy and the knife.")
        debugDisplayRoomStats(getCurrentRoom())
      }
    }
  } //end constructor
}
