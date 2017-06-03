// Update player inventory
// Add item to end of inventory
// remove item from inventory

function updateInventory(action,item) {
  // ** add item to inventory
  if (action == 'add') {

  }
  if (action == 'remove') { // remove item from inventory
    inInventory = inventoryFinder(item);

    if (inInventory) { // remove item from player's inventory
      var index = player.inventory.indexOf(item);
      if (index > -1) {
        player.inventory.splice(index, 1);
      }
    }
  }
}
