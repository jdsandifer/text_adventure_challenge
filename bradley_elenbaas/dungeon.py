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
        
        # Debug (print each room name in readable format).
        for i in range(len(self.__room_grid)):
            text = ''
            for j in range(len(self.__room_grid[i])):
                if j is 0:
                    text = self.__room_grid[i][j].name
                else:
                    text = '{},{}'.format(text, self.__room_grid[i][j].name)
            #print(text)
    
    def describe_room(self, 
                      character):
        '''
        Describe the room that the character is in.
        '''
        
        #print(type(character))
        #print(character.row)
        print('You look around.')
        print('The room is ' + self.__room_grid[character.row][character.column].description)
    
    def __populate_room_grid(self, 
                             room_grid, 
                             size = 2):
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