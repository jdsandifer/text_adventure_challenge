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
   constructor(name, descriptions) {
      let _id = newId()
      let _name = name || ""
      this.descriptions = descriptions || [ "It's indescribable." ]

      this.id = () =>  _id
      this.name = () =>  _name
   }


   description() {
      // Currently just returns the first description
      // Can be changed to implement more complex implementations
      return this.descriptions[0]
   }
}
