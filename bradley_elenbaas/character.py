'''
Project: Life Adventure

Character file.

.. codeauthor:: Bradley Elenbaas <mr.elenbaas@gmail.com>
'''

# Import Python first-party libraries.
import copy

class Character(object):
    '''
    Character class.
    '''
    
    def __init__(self):
        '''
        Pseudo-Constuctor.
        '''
        
        # Instantiate (private) class member variables.
        self.__column = 0
        self.__row = 0
        self.__inventory_list = []
    
    def add_to_inventory(self, 
                         item):
        '''
        Add item parameter to pseudo-private __inventory_list class member variable.
        '''
        
        # Update.
        self.__inventory_list.append(item)
    
    @property
    def column(self):
        '''
        Get character column position.
        '''
        
        # Return.
        return self.__column
    
    @property
    def row(self):
        '''
        Get character row position.
        '''
        
        # Return.
        return self.__row
    
    def move_east(self):
        '''
        Move character east.
        '''
        
        # Update.
        self.__column += 1
    
    def move_north(self):
        '''
        Move character north.
        '''
        
        # Update.
        self.__row -= 1
    
    def move_south(self):
        '''
        Move character south.
        '''
        
        # Update.
        self.__row += 1
    
    def move_west(self):
        '''
        Move character west.
        '''
        
        # Update.
        self.__column -= 1
    
    def populate_inventory_list(self, 
                                inventory_list_to_populate):
        '''
        Copy the pseudo-private __inventory_list class member variable to the inventory_list_to_populate in/out parameter.
        '''
        
        for item in self.__inventory_list:
            inventory_list_to_populate.append(copy.deepcopy(item))
