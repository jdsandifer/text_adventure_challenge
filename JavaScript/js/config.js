// possible inspiration: http://textadventures.co.uk/games/play/5zyoqrsugeopel3ffhz_vq

var array = ['go','look','examine','get','eat','attack','run','flee','use','ctrl+alt+del','inventory'];
// player attributes
var player = {
  health: 100,
  hunger: 0,
  inventory: ['knife','snack'],
  currentRoom: 'room1',
  moves: 0,
}

var edibles = {
  cheese: {
    id: 'cheese',
    description: 'A chunk of yellow cheese (maybe cheddar?).',
    edible: true,
    healthBonus: 50,
  },
  snack: {
    id: 'snack',
    description: 'A health fruit and grain snack bar.',
    edible: true,
    healthBonus: 75,
  },
  knife: {
    id: 'knife',
    description: 'A small pocket knife',
    edible: false,
    healthBonus: 0,
  }
}

var rooms = {
  room1: {
    id: 'room1',
    name: 'Study room',
    description: 'Large study with lots dusty old of books. To the east, you see an open door and to the west an hallway.',
    deepDesc: 'deeper description of room 1.',
    directions: ['east','west'],
    connected: ['room2', 'room3'],
    inventory: ['book'],
    secret: 'none',
    objects: [
      {
        objectName: 'book',
        objectDescription: 'An dusty old cook book that looks like its from the 1950s.',
        canPickup: true,
      }
    ]
  },
  room2: {
    id: 'room2',
    name: 'Kitchen',
    description: 'Messy kitchen with mold growing the dark corners.',
    deepDesc: 'deeper description of room 2.',
    directions: ['north','south'],
    connected: ['room1', 'room4', 'room5'],
    inventory: ['toy'],
    secret: 'none',
    objects: [
      {
        objectId: 'mushroom',
        objectName: 'smelly brown mushroom',
        objectDescription: 'Nasty smelling mushroom that looks uninteresting.',
        canPickup: false,
      },
      {
        objectId: 'toy',
        objectName: 'wooden snake toy',
        objectDescription: 'Nasty smelling mushroom that looks uninteresting.',
        canPickup: true,
      }
    ]
  },
  room3: {
    id: 'room3',
    description: '...room 3 description...',
    deepDesc: 'deeper description of room 3.',
    directions: ['east','north','west'],
    connected: ['room1', 'room4','room6'],
    inventory: [],
    secret: '',
    objects: [ ]
  },
  room4: {
    id: 'room4',
    description: '...room 4 description...',
    deepDesc: 'deeper description of room 4',
    directions: ['south','east'],
    connected: ['room3','room2'],
    inventory: [],
    secret: '',
    objects: [ ]
  },
  room5: {
    id: 'room5',
    description: '...room 5 description... This room is a trap. Player loses the knife and the room picks it up.',
    deepDesc: 'deeper description of room 5',
    directions: ['north'],
    connected: ['room2'],
    inventory: [],
    secret: '',
    objects: [ ]
  },
  room6: {
    id: 'room6',
    description: '...room 6 description...',
    deepDesc: 'deeper description of room 6',
    directions: ['east'],
    connected: ['room3'],
    inventory: [],
    secret: '',
    objects: [ ]
  }
}

/* crude first room map

****4-------**
****|******|**
****|******|**
*6--3--1--2-**
**********|***
**********5***

room 1: go east to room 2 or west to room 3
room 2: go east to room 1 or east (turns north) to room 4
room 2: secret door that leads to room 5
room 3: go east to room 1 or north to room 4
room 4: go south to room 3 or east to room 2
room 5: only go north back to room 2
*/
