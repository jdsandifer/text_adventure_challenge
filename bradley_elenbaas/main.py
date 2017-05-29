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
import game_controller

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
        self.__game_controller = game_controller.GameController()
        
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
            self.__game_controller.print_bar_start()
            self.__game_controller.print_map(self.__character, 
                                             self.__dungeon)
            self.__game_controller.print_room_description(self.__character, 
                                                          self.__dungeon)
            self.__game_controller.print_available_options(self.__character, 
                                                           self.__dungeon)

            # Route user input.
            self.__game_controller.print_bar_end()
            user_input = self.__get_user_input()
            self.__game_controller.route_user_input(self.__character, 
                                                    self.__dungeon, 
                                                    user_input)
            if self.__game_controller.check_for_end_of_game(self.__character, 
                                                            self.__dungeon):
                state = False
            else:
                pass
        else:
            sys.exit()
    
    def __get_user_input(self):
        '''
        If user input is a valid int, then return user input.
        Otherwise, return None.
        '''
        
        # Instantiate.
        user_input = None
        
        # Update.
        try:
            user_input = int(input('Choose option...'))
            print('')
        except:
            user_input = 555
            print('ERROR: try again')
        
        # Return.
        return user_input

if __name__ == '__main__':
    '''
    Main function.
    '''
    
    # Instantiate (local) variables.
    main = Main()