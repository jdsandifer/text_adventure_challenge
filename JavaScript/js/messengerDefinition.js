// Jacob's working on this...

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