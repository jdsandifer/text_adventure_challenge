'''
Project: Life Adventure

Dungeon file.

.. codeauthor:: Bradley Elenbaas <mr.elenbaas@gmail.com>
'''

# Import Python second-party libraries.
import room

class Dungeon(object):
    '''
    Dungeon class.
    '''
    
    def __init__(self):
        '''
        Pseudo-Constructor.
        '''
        
        # Instantiate (private) class member variables.
        self.__room_grid = []
        
        # Update.
        self.__populate_room_grid(self.__room_grid)
    
    def get_item_text(self, 
                      row, 
                      column):
        '''
        Return the name of the item found in the dungeon room.
        '''
        
        # Instantiate.
        item = self.__room_grid[row][column].item
        
        # Update.
        #self.__room_grid[row][column].remove_item()
        
        # Return.
        return item
    
    def get_room_description_text(self, 
                                  row, 
                                  column):
        '''
        Return the name of the room description found at the row/column position.
        '''
        
        # Return.
        return self.__room_grid[row][column].description
    
    def get_room_item(self, 
                      row, 
                      column):
        '''
        Return the item in the current room.
        '''
        
        # Instantiate.
        item = self.__room_grid[row][column].item
        
        # Update.
        self.__room_grid[row][column].item = 'nothing'
        
        # Return.
        return item
    
    def is_cleared_of_all_items(self):
        '''
        If all rooms contain nothing, then return true.
        Otherwise, return false.
        '''
        
        # Instantiate.
        result = True
        
        # Update.
        for i in range(len(self.__room_grid)):
            for j in range(len(self.__room_grid[i])):
                if self.__room_grid[i][j].item != 'nothing':
                    result = False
        
        # Return.
        return result
    
    def populate_empty_room_grid(self, 
                                 dungeon_room_grid):
        '''
        Populate dungeon_room_grid parameter with a 2D list filled with empty Strings.
        Populate dungeon_room_grid parameter to match private class member variable __room_grid.
        '''
        
        for i in range(len(self.__room_grid)):
            temp_list = []
            for j in range(len(self.__room_grid[i])):
                temp_list.append('')
            dungeon_room_grid.append(temp_list)
    
    def populate_door_list_text(self, 
                                row, 
                                column, 
                                door_list):
        '''
        Populate door_list paramater with directions for which there are doors.
        '''
        
        # Instantiate.
        door_options = ['north', 
                        'south', 
                        'east', 
                        'west']
        
        # Update.
        if row == 0:
            door_options.remove('north')
        if row == len(self.__room_grid) - 1:
            door_options.remove('south')
        if column == 0:
            door_options.remove('west')
        if column == len(self.__room_grid[row]) - 1:
            door_options.remove('east')
        for door in door_options:
            door_list.append(door)
    
    def __populate_room_grid(self, 
                             room_grid, 
                             size = 3):
        '''
        Populate 2-D room grid with rooms.
        '''
        
        # Instantiate.
        room_count = 0
        
        # Update.
        for i in range(size):
            some_list = []
            for j in range(size):
                some_list.append(room.Room())
                room_count += 1
            room_grid.append(some_list)