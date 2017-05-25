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
$('#command-list').text(array);
$('#room').text(player.currentRoom);
$('#description').text(rooms[player.currentRoom].description);

$('input#command').on('keypress', function(event) {
  if (event.which == 13) { // upon pressing the enter key, read command and decide if input is actionable
    $('#message').html(''); // clear message area on each enter keypress
    var command = $(this).val();
    var commands = command.split(/\s+/);
    //console.log(commands, typeof(commands));
    console.log(command); // 'go west'
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
        case 'examine':
          if (commands[1] == 'room') {
            // examine room
            // ** display deeper description of room which includes actionable objects (if any)
          }
          break;
        case 'get':
          // ** figure out this command
          break;
        case 'attack':
          // ** figure this out
          break;
        case 'use':
          // ** figure this out
          console.log('use');
          break;
        case 'ctrl+alt+del':
          // ** restart the game
          break;
        default:
          //console.log('something went wrong');
          displayMessage('I do not understand.',5000);
    }
    /*
        // ** nothing special about examined object
        //if (array[i] == 'examine' && ) {
          // I see nothing special about the <object>
        //}
        // check if command is value
        // check if second half of command is a directions


            // confirm direction is valid
            // else, display vague direction error message

        // <action> <object>
        // <action> <item> on <object>
    */
    $(this).val(''); // clear input
  }
});

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
  //console.log('executing updateLocation()');
  //console.log('entered direction: ' + direction); // 'west'
  // get current room
  var location = player.currentRoom;
  //console.log('current player location: ' + location);
  // loop through rooms to see if the current room is connected with the room
  // in the desired direction
  //console.log(rooms[location].directions); // my current room's directions`
  //console.log(rooms[location].connected); // my current room's connected rooms
  for (i in rooms) {
    //console.log(rooms[i]);
    //console.log('rooms seen: ' + rooms[i].id);
    for (j in rooms[i].directions) {
      if (rooms[i].id == location) {
        //console.log(rooms[i].connected[j] + ' is to the ' + rooms[i].directions[j]);
        //console.log(direction == rooms[i].directions[j]);
        if (direction == rooms[i].directions[j]) {
          //console.log('player current location: ' + player.currentRoom);
          //console.log('moving to ' + rooms[i].connected[j]);
          player.currentRoom = rooms[i].connected[j];
          //console.log('player new location: ' + player.currentRoom);
          $('#room').text(player.currentRoom);
          // display new room description
          $('#description').text(rooms[player.currentRoom].description);
          break;
        }
      } else {
        // ** figure out invalid direction routine
        //console.log('not a valid direction');
        //displayMessage('Not a valid direction',5000);
      }
    }
  }
}
