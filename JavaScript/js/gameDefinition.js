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

    // Sets up the game data with gameData (or loads previous game)
    function loadGame(gameData) {
      const player = gameData.entities.player
      const gameState = {
        // Create player object from gameData
        _player: new Player(
          player.name,
          player.descriptions[0],
          player.health,
          player.strength,
          player.inventory.map(itemName =>
            new Item(itemName, gameData.items[itemName].descriptions[0])),
          player.hunger),

        // Create room objects from setupData
        //TODO add entities to the room objs once entity class is implemented
        _rooms: gameData.rooms.map(room => new Room(
          room.name,
          room.descriptions[0],
          room.items.map(itemName =>
            new Item(itemName, gameData.items[itemName].descriptions[0]))
          ))
      }//end gameState init

      // Create door objects and connect rooms from gameData
      gameState._doors = gameData.doors.map(door => new Door(
        door.name,
        door.descriptions[0],
        door.connectingRooms.map(connection => ({
          room: gameState._rooms.find(room => room.name() === connection.inRoom),
          located: connection.located
        })),
      ))

      // Set current room from gameData
      gameState._currentRoom = gameState._rooms.find(
        room => room.name() === gameData.game.startingRoom)

      return gameState
    }

    //debug function that shows info about room in UI
    function debugDisplayRoomStats(room){
      $('#room').text(room.name())
      $('#description').text(room.description())
      $('#items').text(room.listOfItems())
    }

    //run function starts the game accepting input
    this.run = () => {
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
          debugDisplayRoomStats(_currentRoom)
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
        _currentRoom = _currentRoom.connectedRoom(direction)
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
      }
    }
  } //end constructor
}
