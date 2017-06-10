// This file is for asset object definition and supporting functions.
// Created 2017-06-01 by J.D. Sandifer

// Classes are defined and use custom getter and setter functions to hide
// the internal workings of the objects and allow for easy maintenance.
// Don't access object data directly!


// Setup for auto ID distribution
// There's probably a better way to handle the variable - feel free to tweak.
let nextId = 1

// Returns an incrementally unique ID (integer) each time it's called.
// Relies on global variable nextId
function newId() {
   return nextId++
}


// Parent of all game assets: rooms, doors, entities, items, etc.
// Not for game functionality classes: messenger, etc.
class Asset {
   constructor(name, description) {
      let _id = newId()
      let _name = name || ""
      let _description = description || "It's indescribable."

      this.id = () => _id
      this.name = () => _name
      // Currently description is just a string
      // Can be changed to implement more complex descriptions
      // with a informational object if needed later
      this.description = () => _description
   }
}
