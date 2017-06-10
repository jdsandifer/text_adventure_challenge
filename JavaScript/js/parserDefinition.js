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