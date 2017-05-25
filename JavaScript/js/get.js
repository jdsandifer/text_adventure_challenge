function playerGet(object) {
  var currentRoom = rooms[player.currentRoom]
  for (roomObject in currentRoom.objects) {
    if (roomObject.objectName === object
        && roomObject.canPickup) {
      updatePlayer('pickUpItem', object);
      //currentRoom.object.remove...
      return;
    }
  }
  // otherwise
  displayMessage("Can't get" + object);
}
