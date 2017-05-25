/*
  Go through player's inventory array and confirm that the item is in the player's inventory
  If object is in player's inventory, perform the action or action on object
*/

// status update: this function works but we need to decide on the effect of using an action on the target object

function playerFunctionUse(object,target) {
  inInventory = player.inventory.some(function(v,i) { // figure out if the used object is in player's inventory
    if (object === v) {
      return true;
    }
  });

  if (inInventory) { // if used object is in your inventory, perform the action
    if (object && !target) { // action with object and no target
      displayMessage('You used ' + object);
      // ** effect of action??
    }
    if (object && target) { // take action on target
      // ** check if target is in the room
      displayMessage('You used the ' + object + ' on ' + target);
      // ** effect of action on object??
      // ** example: 'use knife on door' will open a locked dooor and open the room to a new room
    }
  } else {
    displayMessage('Cannot use "' + object + '" as it is not in your inventory.',5000);
  }
}
