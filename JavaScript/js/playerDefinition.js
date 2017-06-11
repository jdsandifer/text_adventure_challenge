// J.D. is working on this

// This file is the player object definition.
// Created 2017-06-01 by J.D. Sandifer

class Player extends Entity {
   constructor(name, description, health, strength, inventory, hunger) {
      super(name, description, health, strength, inventory)

      const MIN_HUNGER = 0
      const HUNGER_INCREMENT = 5
      const MAX_HUNGER = 100
      const FOOD_VALUE = 100

      let _hunger = hunger || MIN_HUNGER

      // Currently food restores hunger fully.
      // May implement partial restoration later.
      this.hunger = () => _hunger

      this.eat = food => {
         if (this.has(food))
            _hunger = Math.max(_hunger - FOOD_VALUE, MIN_HUNGER)
      }

      this.makeHungrier = hungerToAdd => {
         var newHunger = _hunger
         newHunger += hungerToAdd || HUNGER_INCREMENT
         _hunger = Math.min(newHunger, MAX_HUNGER)
      }
   }
}
