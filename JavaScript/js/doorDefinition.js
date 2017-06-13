//JD's working on this..

class Door extends Asset {
  constructor(name, description) {
    super(name, description)
    let _connectedRooms

    // connection array like: [{room1, direction1},{room2, direction2}]
    this.connectRooms = (connectingRooms) => {
      _connectedRooms = connectingRooms.map(connection => {
        connection.room.addDoor(connection.direction, this)
        return connection.room
      })
    }

    this.otherRoom = room => {
      if (_connectedRooms.indexOf(room) === 0)
        return _connectedRooms[1]
      else if (_connectedRooms.indexOf(room) === 1)
        return _connectedRooms[0]
      else
        throw new Error("Door.otherRoom(room): This door is not connected to the room you gave.")
    }
  }
}
