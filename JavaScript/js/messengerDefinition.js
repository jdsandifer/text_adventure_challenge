/**
 * For displaying messages to the player
 */
class Messenger {

  /**
    * @param messageArea A dom object in which to place message text
    */
  constructor($messageArea) {
    const _messageArea = $messageArea   // A dom object in which to place messages
    let _messageHistory = []    // A list of all previous messages, newest first
    
    /**
    * @param message A string to display to the user
    */
    this.addMessage = message => {
      // Add the new message to the beginning of the history list (FILO)
      _messageHistory.unshift(message)

      // And display all messages
      this.render()
    }

    this.clearHistory = () => _messageHistory = []

    // Display the list of messages
    this.render = () => {
      // Trim off all but the last ten messages in the history (first ten in array)
      const MAX_MESSAGES_TO_DISPLAY = 10
      let lastTenMessages = _messageHistory.slice(0, MAX_MESSAGES_TO_DISPLAY)

      // Create an html message list (using BEM css class structure)
      let htmlMessages = lastTenMessages.reduce(
        (acc, message) => acc + `<div class="messages_message">${message}</div>`,
        ''
        )
      let htmlMessagesGroup = `<div class="messages">${htmlMessages}</div>`

      // Replace current messages with the updated list
      _messageArea.children().remove()
      _messageArea.append(htmlMessagesGroup)
    }
  }
}