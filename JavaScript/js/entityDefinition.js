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

      // Adds an item to the entity's inventory
      this.take = item => { _inventory.push(item) }

      // TODO: The code to turn the list into a sentence should probably
      // go somewhere else and this should just return a list of item names.
      this.inventory = () => {
         let numberOfItems = _inventory.length
         if (numberOfItems === 0)
            return ''
         else {
            let list = "You have " + 'a ' + _inventory[0].name()
            if (numberOfItems > 2) {
               for (let i = 1; i <= numberOfItems-2; i++) {
                  list += ', ' + 'a ' + _inventory[i].name()
               }
            }
         if (numberOfItems > 1)
            list += ', and ' + 'a ' + _inventory[_inventory.length-1].name()
            list += '.'
            return list
         }
      }

      // Returns true if this entity has the parameter item in inventory
      // and false otherwise (no need to add item to the name, that's the only
      // thing entities can have so it's redundant)
      this.has = itemName => _inventory.some(item => item.name() === itemName)

      // Removes an item from the entity's inventory and returns the item
      // Check for the item before using!
      this.drop = itemName => {
         let itemToDrop = itemFromName(itemName)
         let indexToRemove = _inventory.indexOf(itemToDrop)
         _inventory.splice(indexToRemove, 1)
         return itemToDrop
      }
      
      // private helper function to get the item object when given the name
      function itemFromName (itemName) {
            return _inventory.find(item => item.name() === itemName)
      }
   }
}
