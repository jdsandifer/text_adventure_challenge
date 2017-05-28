// game object
var game = {
  id: 0,
  name: 'The Game Object',
  description : {},
  rooms: [],
  help: 'Type commands to explore the world and interact with objects. '
      + 'Try "look", "go east", "take ____", "drop ____", etc.'
}


// player object
var player = {
  id: 1,
  name: 'You',
  description : {},
  score: 0,
  health: 100, // is this a percentage?
  hunger: 0,
  inventory: [],
  abilities: [],
  actionHistory: []
}

// room objects
var start = {
  id: 100,
  name: 'Start',
  descriptions: [],
  doors: [],
  entities: [],
  secrets: [],
  objects: []
}

var clearing = {
  id: 110,
  name: 'Clearing',
  descriptions: [],
  doors: [],
  entities: [],
  secrets: [],
  objects: []
}

start.entities.push(player)
game.rooms.push(start)
game.rooms.push(clearing)

// door objects
var shortPath = {
  id: 101,
  name: 'Short Path',
  description: {},
  connectingRooms: [100, 110],  // Seems like rooms should both reference 
                                // the same door object for a shared doorway
                                // instead of having two separate door objects
                                // that we have to keep in sync. This means
                                // they would have at least two connecting
                                // rooms each.
  isLocked: false
}

start.doors.push(shortPath)
clearing.doors.push(shortPath)

// object objects
var flowers = {
  id: 200,
  name: 'Lovely Flowers',
  description : {},
  type: 'weapon',  // :)
  action: () => console.log("Flowers don't have an action yet")
}

start.objects.push(flowers)