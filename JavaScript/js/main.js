$(function(){
  let game = new Game(setupData)
  game.run()

  $('#command-list').text("go, run, flee"); // ** debugging feature **
  $('#playerHealth').text('health:' + game.state.player.getHeath());  // ** debugging feature **
  $('#room').text(game.state.currentRoom);
  $('#description').text(setupData.rooms.find((room,i)=>i === game.state.currentRoom).name;
  focusInput(); // place focus on input field
})

function focusInput() { // place focus on input field
  $('input').focus();
}
