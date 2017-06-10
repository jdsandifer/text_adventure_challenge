class Messenger {
  constructor($outputBox) {
    this.outputBox = $outputBox
    this.outputHistory = []
  }

  addOutput(str) {
    this.outputHistory.push(str)
    this.render()
  }

  clearHistory() {
    this.outputHistory = []
  }

  render() {
    let listItems = this.outputHistory.reduce((acc, curr) => acc + `<div>${curr}</div>`, '')
    let messagesList = `<div class="outputList">${listItems}</div>`
    this.outputBox.children().remove()
    this.outputBox.append(messagesList)
  }
}

//accepts a validActions object with valid action keys with an array of synonyms
//right now it defaults to {go: ['go', 'run', 'flee']} object
class Parser {
  constructor(validActions) {
    let _validActions = validActions || {
      go: ['go', 'run', 'flee']
    }
    let _commandHistory = []
    let _currentHistoryIndex = _commandHistory.length-1

    function getValidAction(str) {
      if (str) {
        for (let action in _validActions) {
          if (_validActions[action].includes(str.toLowerCase())) {
            return action
          }
        }
      }
      return undefined
    }

    //generator function to validate a string and yeild commands as long as there are more
    this.validate = function*(str) {
      let words = str.split(' ')
      let wordIndex = 0

      _commandHistory.push(str)
      _currentHistoryIndex = _commandHistory.length-1

      while (wordIndex < words.length) {
        if (getValidAction(words[wordIndex])) {
          let command = []
          let actionPayload = ""
          command.push(getValidAction(words[wordIndex]))
          wordIndex++

          while (wordIndex < words.length && !getValidAction(words[wordIndex])) {
            actionPayload += words[wordIndex++] + " "
          }
          command.push(actionPayload.trim())
          yield command
        }
        else{
          wordIndex++
        }
      }
    }

    this.getLastCommandHistory = function(){
      if(_currentHistoryIndex > 0)
        return _commandHistory[_currentHistoryIndex--]
      else if(_currentHistoryIndex === 0)
        return _commandHistory[_currentHistoryIndex]
      return undefined
    }

    this.getNextCommandHistory = function(){
      if(_currentHistoryIndex < _commandHistory.length)
        return _commandHistory[_currentHistoryIndex++]
      return undefined
    }
  } //END constructor
}

class Game {
  constructor(setupData) {
    //setup the DOM with jquery
    const $userInput = $("#command")
    const $outputBox = $("#message")

    //create a messenger with access to the dom output box
    const messenger = new Messenger($outputBox)

    //create a new interpreter/parser with availible commands and synonyms
    const parser = new Parser({
      go: ['go', 'run', 'flee']
    })

    //init the game state
    const state = resetState(setupData)

    //private func for setting curr room
    function setCurrentRoom(room){
      state.currentRoom = room
    }

    //resets and sets up the game data with setupDate
    //TODO this function needs work to build the game correctly from game data
    function resetState(setupData) {
      const player = setupData.entities.player
      const newState = {
        rooms: setupData.rooms, //TODO this init can be replaced with new room objs when ready/built
        doors: setupData.doors, //TODO this init can be replaced with new doos objs when ready/built
        player: new Player(player.name, player.descriptions, player.health, player.strength, player.inventory, player.hunger)
      }
      newState.currentRoom = newState.rooms[setupData.game.startingRoom]
      return newState
    }

    //run function starts the game accepting input
    this.run = () => {
      //$('#playerHealth').text('health:' + state.player.getHeath())  // ** debugging feature **
      $('#room').text(state.rooms.find((room) => room === state.currentRoom).name)
      $('#description').text(state.rooms.find((room) => room === state.currentRoom).description)

      $userInput.on('keydown', (event) => {
        //user presses enter
        if (event.which === 13) {
          let commands = parser.validate($userInput.val())
          let command = []

          while (command = commands.next().value) {
            switch (command[0]) {
              case 'go':
                //TODO this is a bit of a mess and could be simplified if we
                //add functions to the room and door classes
                //to allow finding/matching obj refrances
                if (state.currentRoom.doors[command[1]]) {
                  for (let door of state.doors) {
                    if (door.name === state.currentRoom.doors[command[1]]) {
                      let enterRoomName = door.connectingRooms.find((roomName) => roomName !== state.currentRoom.name)
                      state.rooms.forEach((room) => {
                        if (room.name === enterRoomName) {
                          setCurrentRoom(room)
                          messenger.addOutput(`you moved to room ${state.currentRoom.name}`)
                          $('#room').text(state.rooms.find((room) => room === state.currentRoom).name) //TODO testing, needs to be moved
                        }
                      })
                      break //break out of the door loop once passed through
                    }
                  }
                }
                break //case break
              default:
                console.log('something went wrong in the parser for command', command)

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
    } //end constructor
  }
