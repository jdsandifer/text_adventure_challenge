'''
Project: Life Adventure

Main file.

.. codeauthor:: Bradley Elenbaas <mr.elenbaas@gmail.com>
'''

# Import Python first-party libraries.
import sys
# Import Python second-party libraries.
import character
import dungeon

class Main(object):
    '''
    Main class.
    '''
    
    def __init__(self):
        '''
        Pseudo-Constructor.
        '''
        
        # Instantiate (private) class member variables.
        self.__character = character.Character()
        self.__dungeon = dungeon.Dungeon()
        
        self.__dungeon.describe_room(self.__character)
        
        # Update.
        self.__loop()
    
    def __loop(self):
        '''
        Main loop.
        '''
        
        # Instantiate.
        state = True
        
        # Update.
        while(state):
            state = False
        else:
            sys.exit()

if __name__ == '__main__':
    '''
    Main function.
    '''
    
    # Instantiate (local) variables.
    main = Main()
    
    # Update.
    print('complete')