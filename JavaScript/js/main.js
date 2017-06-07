let game = new Game(setupData)

$(function(){
  game.run()
  focusInput() // place focus on input field
})

function focusInput() { // place focus on input field
  $('input').focus()
}
