// J.D. will tweak this to match what we discussed during prototyping

// This file is the player object definition.
// Created 2017-06-01 by J.D. Sandifer

// Classes are defined and use custom getter and setter functions to hide
// the internal workings of the objects and allow for easy maintenance.
// Don't access object data directly!


class Player extends Entity {
   constructor(name, descriptions, health, strength, inventory, hunger) {
      super(name, descriptions, health, strength, inventory)

      const MIN_HUNGER = 0
      const HUNGER_INCREMENT = 5
      const MAX_HUNGER = 100
      const FOOD_VALUE = 100

      this.hunger = hunger || MIN_HUNGER
   }

   // Currently food restores hunger fully.
   // May implement partial restoration later.
   hunger() {
      return this.hunger
   }

   eat(food) {
      if (this.has(food))
         this.hunger = Math.max(this.hunger - FOOD_VALUE, MIN_HUNGER)
   }

   makeHungrier(hungerToAdd) {
      var newHunger = this.hunger
      newHunger += hungerToAdd || HUNGER_INCREMENT
      this.hunger = Math.min(newHunger, MAX_HUNGER)
   }

}
