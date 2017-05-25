// possible inspiration: http://textadventures.co.uk/games/play/5zyoqrsugeopel3ffhz_vq

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
