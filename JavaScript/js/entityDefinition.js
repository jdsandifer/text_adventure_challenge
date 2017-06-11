// J.D.'s working on this...

// This file is for entity object definition.
// Created 2017-06-01 by J.D. Sandifer

// Classes are defined and use custom getter and setter functions to hide
// the internal workings of the objects and allow for easy maintenance.
// Don't access object data directly!


// Parent of all game entities: player, enemies, neutral NPC's, etc.
class Entity extends Asset {
   constructor(name, description, health, strength, inventory) {
      super(name, description)

      const MAX_HEALTH = 100
      const MAX_STRENGTH = 100

      let _health = health || MAX_HEALTH
      let _strength = strength || MAX_STRENGTH
      let _inventory = inventory || []
   

      this.health = () => _health

      // Named it strength instead of attack to noun-ify it and allow for it
      // to represent defensive strength, ability to move heavy items, etc.
      // E.g. if (attacker.strength() > defender.strength()) return "killed it",
      // if (player.strength() > door.strengthToOpen()) return "the door yields"
      this.strength = () => _strength

      // Returns true if this entity *has* the parameter item in inventory
      // and false otherwise
      this.has = itemName => {
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
      drop(itemName) {
            if (this.has(item)) {
            const index = this.inventory.indexOf(item)
            this.inventory.splice(index, 1)
            return true
            }
            else return false
      }
      
      // private helper function to get the item object when given the name
      function itemFromName (itemName) {
            return _items.find(item => item.name() === itemName)
      }
   }
}
