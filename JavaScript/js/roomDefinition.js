//JD's working on this..

class Room extends Asset {
  constructor(name, description, doors, items, entities) {
    super(name, description)
    let _doors = doors || {}
    let _items = items || []
    let _entities = entities || []

    this.hasDoor = direction => direction in _doors
    // canGo() will check for locked doors eventually, just checks for door now
    this.canGo = direction => this.hasDoor(direction)
    // returns undefined if there's no door in that direction
    // (check for it first!)
    this.connectedRoom = direction => _doors[direction].otherRoom(this)
    // addDoor() is required for game building (I think)
    this.addDoor = (direction, door) => { _doors[direction] = door }

    this.addItem = item => _items.push(item)
    this.hasItems = () => _items.length > 0
    // TODO: The code to turn the list into readable text should probably
    // go somewhere else and this should just return a list of item names.
    this.listOfItems = () => {
      let numberOfItems = _items.length
      if (numberOfItems === 0)
        return ''
      else {
        let list = "There's " + 'a ' + _items[0].name()
        if (numberOfItems > 2) {
          for (let i = 1; i <= numberOfItems-2; i++) {
            list += ', ' + 'a ' + _items[i].name()
          }
        }
        if (numberOfItems > 1)
          list += ', and ' + 'a ' + _items[_items.length-1].name()
        list += ' here.'
        return list
      }
    }
    
    this.hasItem = itemName => {
      if (itemFromName(itemName))
        return true
      else
        return false
    }

    this.examineItem = itemName => {
      if (this.hasItem(itemName))
        return itemFromName(itemName).description()
      else
        return "You don't see that."
    }

    this.removeItem = itemName => {
      let itemToRemove = itemFromName(itemName)
      let indexToRemove = _items.indexOf(itemToRemove)
      _items.splice(indexToRemove, 1)
    }

    // private helper function to get the item object when given the name
    function itemFromName (itemName) {
      return _items.find(item => item.name() === itemName)
    }
  }
}
