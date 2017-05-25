

function playerFunctionEat(object) {
  inInventory = inventoryFinder(object);

  if (inInventory) { // if item is in player's inventory
    var edible = false;
    for (i in edibles) { // figure out if object is edible`
      if (edibles[i].id == object && edibles[i].edible == true) {
        edible = true;
        break;
      }
    }

    if (edible) { // if object is edible, eat it, gain health, and remove item from inventory
      var message = 'You eat the ' + object + '. You feel better.';
      player.health += edibles[i].healthBonus;
      $('#playerHealth').text('health:' + player.health);  // ** debugging feature **
      updateInventory('remove',object) // remove object from player's inventory
    } else { // object isn't edible
      var message = object + ' is not edible';
    }
    displayMessage(message,5000); // display message
  } else { // item is not in player's inventory`
    displayMessage(object + ' is not in your inventory',5000);
  }
}
