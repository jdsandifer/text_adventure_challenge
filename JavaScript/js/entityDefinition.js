// This file is for entity object definition.
// Created 2017-06-01 by J.D. Sandifer

// Classes are defined and use custom getter and setter functions to hide
// the internal workings of the objects and allow for easy maintenance.
// Don't access object data directly!


// Parent of all game entities: player, enemies, neutral NPC's, etc.
class Entity extends Asset {
   constructor(name, descriptions, health, strength, inventory) {
      super(name, descriptions)

      const MAX_HEALTH = 100
      const MAX_STRENGTH = 100

      this.health = health || MAX_HEALTH
      this.strength = strength || MAX_STRENGTH
      this.inventory = inventory || []
   }

   health() {
      return this.health
   }

   // Named it strength instead of attack to noun-ify it and allow for it
   // to represent defensive strength, ability to move heavy items, etc.
   // E.g. if (attacker.strength() > defender.strength()) return "killed it",
   // if (player.strength() > door.strengthToOpen()) return "the door yields"
   strength() {
      return this.strength
   }

   // Returns true if this entity *has* the parameter item in inventory
   // and false otherwise
   has(itemToCheckFor) {
      return this.inventory.some(
            function(item) {
               return item === itemToCheckFor
            })
   }

   // Adds an item to the entity's inventory
   take(item) {
      this.inventory.push(item)
   }

   // Removes an item from the entity's inventory if it's there
   // Returns true if successful, false if not
   drop(item) {
      if (this.has(item)) {
         const index = this.inventory.indexOf(item)
         this.inventory.splice(index, 1)
         return true
      }
      else return false
   }
}
