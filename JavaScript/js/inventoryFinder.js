// Helper function
function inventoryFinder(object) {
  var temp = player.inventory.some(function(v,i) { // figure out if the removed item is in player's inventory
    if (object === v) {
      return true;
    }
  });
  return temp;
}
