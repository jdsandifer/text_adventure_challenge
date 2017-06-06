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
          _commandHistory.push(command)
          yield command
        }
      }
    }

    this.commandHistory = function(i) {
      return _commandHistory[i] ? _commandHistory[i] : undefined
    }
  } //END constructor
}

class Game {
  constructor(setupData) {
    //setup the DOM
    const $userInput = $("#command")
    const $outputBox = $("#message")

    //create a messenger with access to the dom output box
    const messenger = new Messenger($outputBox)

    //create a new interpreter/parser
    const parser = new Parser({
      go: ['go', 'run', 'flee']
    })

    //init the game state
    const state = this.resetState(setupData)

    //run function starts the game accepting input
    this.run = () => {
      $userInput.on('keypress', (event) => {
          //user presses enter
          if (event.which === 13) {
            let commands = parser.validate($userInput.val())
            let command = []

            while(command = commands.next().value){
              switch (command[0]) {
                case 'go':
                  if(setupData.rooms[state.currentRoom].doors.includes(command[1])){
                    for(let door in setupData.doors){
                      if(door.name === setupData.rooms[state.currentRoom].doors[command[1]]){
                        let roomNum = 0
                        for(let room in setupData.rooms){
                          if(door.connectingRooms.includes(room.name) && room.name !== setupData.rooms[state.currentRoom].name){
                            state.currentRoom = roomNum
                            messenger.addOutput(`you moved to room ${setupData.rooms[roomNum].name}`)
                          }
                          roomNum++
                        }
                      }
                    }

                  }
                  break
                default: console.log('something went wrong in the parser for command', command)

              }
            }
              //log the command
              messenger.addOutput($userInput.val())

              //clear the input field
              $userInput.val('')
            }
          })
      }
    } //end constructor

    //resets and sets up the game data
    //TODO this function needs work to build the game correctly from game data
    resetState(setupData) {
      return {
        currentRoom: setupData.startingRoom,
        player: new Player()
      }
    }
  }
