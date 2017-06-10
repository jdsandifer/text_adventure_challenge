//JD's working on this..

class Room extends Asset {
  constructor(name, descriptions, doors, items, entities) {
    super(name, descriptions)
    let _doors = doors || {}
    let _items = items || []

    this.hasDoor = direction => direction in _doors

    this.addItem = item => _items.push(item)
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

    // helper function to get the item object when given the name
    function itemFromName (itemName) {
      return _items.find(item => item.name() === itemName)
    }
  }
}
