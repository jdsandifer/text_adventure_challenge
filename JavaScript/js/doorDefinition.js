//JD's working on this..

class Door extends Asset {
  constructor(name, description) {
    super(name, description)
    let _connectedRooms

    this.connectRooms = (rooms) => {
      console.log(rooms)
      _connectedRooms = [rooms[0].room, rooms[1].room]
      _connectedRooms.forEach((room, i) => {
        room.addDoor(rooms[i].direction, this)
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
