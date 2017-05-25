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

var array = ['go','look','examine','get','attack','run','flee','use','ctrl+alt+del','inventory'];
// player attributes
var player = {
  health: 100,
  hunger: 0,
  inventory: ['pocket knife','health snack bar'],
  currentRoom: 'room1',
  moves: 0,
}

var rooms = {
  room1: {
    id: 'room1',
    name: 'Study room',
    description: 'Large study with lots dusty old of books. To the east, you see an open door and to the west an hallway.',
    deepDesc: '',
    directions: ['east','west'],
    connected: ['room2', 'room3'],
    secret: 'none',
    objects: {
      objectName: 'book',
      objectDescription: 'An dusty old book that looks uninteresting.',
      addInventory: false,
    }
  },
  room2: {
    id: 'room2',
    name: 'Kitchen',
    description: 'Messy kitchen with mushrooms growing the dark corners.',
    deepDesc: '',
    directions: ['north','south'],
    connected: ['room1', 'room4', 'room5'],
    secret: 'none',
    objects: {
      objectName: 'mushroom',
      objectDescription: 'Nasty smelling mushroom that looks uninteresting.',
      addInventory: false,
    }
  },
  room3: {
    id: 'room3',
    description: '...room 3 description...',
    deepDesc: '...',
    directions: ['east','north'],
    connected: ['room1', 'room4'],
    secret: '',
    objects: {
      objectName: '',
      objectDescription: '',
      addInventory: false,
    }
  },
  room4: {
    id: 'room4',
    description: '...room 4 description...',
    deepDesc: '',
    directions: ['south','east'],
    connected: ['room3','room2'],
    secret: '',
    objects: {
      objectName: '',
      objectDescription: '',
      addInventory: false,
    }
  }
  /*
  room2: {
    id: 'room2',
    description: '',
    deepDesc: '',
    directions: [],
    connected: [],
    secret: '',
    objects: {
      objectName: '',
      objectDescription: '',
      addInventory: false,
    }
  }
  */
}

/* testing object crawling
for (var key in rooms) {
  //console.log(key.description);
  for (var obj in rooms[key]) {
    console.log(obj);
    if (obj == 'name') {
      console.log(rooms[key].name); //'Study room'
    }
    if (obj == 'directions') {
      console.log(rooms[key].directions); // '(2) ["east", "west"]'
    }
  }
}
*/

/* crude first room map

**4-------**
**|******|**
**|******|**
**3--1--2-**
********|***
********5***

room 1: go east to room 2 or west to room 3
room 2: go east to room 1 or east (turns north) to room 4
room 2: secret door that leads to room 5
room 3: go east to room 1 or north to room 4
room 4: go south to room 3 or east to room 2
room 5: only go north back to room 2
*/

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
            updatedPlayer('west');
            break;
          case 'east':
          case 'e':
            updatedPlayer('east');
            break;
          case 'north':
          case 'n':
            updatedPlayer('north');
            break;
          case 'south':
          case 's':
            updatedPlayer('south');
            break;
          case 'up':
          case 'u':
            updatedPlayer('up');
            break;
          case 'down':
          case 'd':
            updatedPlayer('down');
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

function updatedPlayer(direction,room) {
  //console.log('executing updatedPlayer()');
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
