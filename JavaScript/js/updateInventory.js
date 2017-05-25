// Update player inventory
// Add item to end of inventory
// remove item from inventory

function updateInventory(action,item) {
  // ** add item to inventory
  if (action == 'add') {

  }
  if (action == 'remove') { // remove item from inventory
    inInventory = player.inventory.some(function(v,i) { // figure out if the removed item is in player's inventory
      if (item === v) {
        return true;
      }
    });

    if (inInventory) { // remove item from player's inventory
      var index = player.inventory.indexOf(item);
      if (index > -1) {
        player.inventory.splice(index, 1);
      }
    }
  }
}
