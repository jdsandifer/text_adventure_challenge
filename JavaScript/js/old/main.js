// possible inspiration: http://textadventures.co.uk/games/play/5zyoqrsugeopel3ffhz_vq

/*
  Things to keep in mind when building this game:
  * What is the user's experience going to be on this story/adventure?
  * Teach your player (e.g. consistent commands, messages, etc.)
  * Story is important

  Goal for today:
  * 4 rooms (start small and add later)
  * Character movement
  * At least one item that is interactable
  * Ability to use at least one item
  * Character inventory (add, remove, display)
  * Response/Conflict (monster, trap, etc.)
  * Game over (exit, death, win, solved puzzle)

  Game perspective: you're a mouse in a human world.
*/
$('#command-list').text(array); // ** debugging feature **
$('#playerHealth').text('health:' + player.health);  // ** debugging feature **
$('#room').text(player.currentRoom);
$('#description').text(rooms[player.currentRoom].description);
focusInput(); // place focus on input field

$('input#command').on('keypress', function(event) {
  if (event.which == 13) { // upon pressing the enter key, read command and decide if input is actionable
    $('#message').html(''); // clear message area on each enter keypress
    var command = $(this).val();
    var commands = command.split(/\s+/);
    //console.log(commands, typeof(commands));
    console.log(command); // 'go west'
    focusInput(); // refocus on input field
    switch(commands[0]) {
      case 'inventory':
        //console.log('listing inventory');
        var items = '<ul>';
        for (var j = 0; j <  player.inventory.length; j++) {
          items += '<li>' +  player.inventory[j] + '</li>';
        }
        items += '</ul>';
        displayMessage(items,5000);
        break;
      case 'go':
      case 'run':
      case 'flee':
        console.log('going, fleeing, or running');
        console.log(commands[1]);
        player.moves++;
        switch (commands[1]) {
          case 'west':
          case 'w':
            updateLocation('west');
            break;
          case 'east':
          case 'e':
            updateLocation('east');
            break;
          case 'north':
          case 'n':
            updateLocation('north');
            break;
          case 'south':
          case 's':
            updateLocation('south');
            break;
          case 'up':
          case 'u':
            updateLocation('up');
            break;
          case 'down':
          case 'd':
            updateLocation('down');
            break;
          default:
            displayMessage('Go where?',5000);
            //console.log('Directional error');
        }

        break;
        // ** should we merge look and examine commands? **
        case 'look': // provide short description
          if (commands[1] == 'at' && commands[2] == 'room') { // 'look at room'
            for (i in rooms) {
              if (rooms[i].id == player.currentRoom) { // display short description of current rooms
                displayDescription(rooms[i].description);
              }
            }
          }
          break;
        case 'examine': // provide detailed description
          if (commands[1] == 'room') {
            for (i in rooms) {
              if (rooms[i].id == player.currentRoom) { // display short description of current rooms
                displayDescription(rooms[i].deepDesc);
              }
            }
          }
          break;
        case 'get':
          var object = "";
          for (var i = 1; i < commands.length; i++) {
            object += commands[i];
          }
          object = object.trim();
          playerGet(object);
          break;
        case 'eat':
          playerFunctionEat(commands[1]);
          break;
        case 'attack':
          // ** figure this out
          break;
        case 'use':
          console.log('use' + commands[1]);
          playerFunctionUse(commands[1],commands[3]); // 'use knife on door' for example ('knife' and 'door' are passed in)
          break;
        case 'ctrl+alt+del':
          // ** restart the game
          break;
        default:
          //console.log('something went wrong');
          displayMessage('I do not understand.',5000);
    }
    /*
        // <action> <object>
        // <action> <item> on <object>
    */
    $(this).val(''); // clear input
  }
});

function displayDescription(room) { // show room description
  $('#description').show().html(room);
}

function displayMessage(message,delay) {
  // ** redo this function
  // clear #message
  // display content in #message
  //$('#message').show().html(message).delay(delay).hide();
  $('#message').show().html(message);
  //$('#message').fadeIn('fast', function() {
    //$(this).html(message).delay(delay).fadeOut('slow');
  //});
}

function updateLocation(direction,room) {
  var location = player.currentRoom; // get player's current location
  for (i in rooms) {
    for (j in rooms[i].directions) {
      if (rooms[i].id == location) {
        if (direction == rooms[i].directions[j]) { // if the entered direction matches the 'entered' room, move player into that room
          player.currentRoom = rooms[i].connected[j]; // update player status (location)
          $('#room').text(player.currentRoom); // ** debugging feature **
          $('#description').text(rooms[player.currentRoom].description); // display new room description
          break;
        }
      } else {
        // ** see https://github.com/CodeBytes-PDX/text_adventure_challenge/issues/1
        // ** figure out invalid direction routine
        //console.log('not a valid direction');
        //displayMessage('Not a valid direction',5000);
      }
    }
  }
}

function focusInput() { // place focus on input field
  $('input').focus();
}
