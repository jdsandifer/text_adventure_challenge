'''
Project: Life Adventure

GameController file.

.. codeauthor:: Bradley Elenbaas <mr.elenbaas@gmail.com>
'''

# Import Python first-party libraries.
import sys
import time

class GameController(object):
    '''
    GameController class.
    
    This class is a safe space for the Character objects to interact with Dungeon objects.
    
    The character & dungeon classes should refrain from handing out mutable objects.
    - Strings are okay. Character & Dungeon methods may return a String directly.
    - Lists of Strings are okay. Character & Dungeon methods may accept a list as an in/out parameter, and then append Strings to that list.
    '''
    
    def __init__(self, 
                 delay = 0.1):
        '''
        Pseudo-Constructor.
        '''
        
        # Instantiate(pseudo-private) class member variables.
        self.__delay = delay
    
    def check_for_end_of_game(self, 
                              character, 
                              dungeon):
        '''
        If game is complete, return true.
        Otherwise, return false.
        
        This is a simple wrapper that routes the call to dungeon.
        '''
        
        # Instantiate.
        result = dungeon.is_cleared_of_all_items()
        
        # Update.
        if result == True:
            self.print_game_complete_message(character, 
                                             dungeon)
        
        # Return.
        return result
    
    def print_available_options(self, 
                                character, 
                                dungeon):
        '''
        Print all of the options available to the character.
        
        There are two groups of objects to compare.
        - The standard set of actions available to a character.
        - The available nouns in a dungeon room.
        '''
        
        # Instantiate.
        item = dungeon.get_item_text(character.row, 
                                     character.column)
        door_list = []
        dungeon.populate_door_list_text(character.row, 
                                        character.column, 
                                        door_list)
        
        # Update.
        self.__print('')
        self.__print('Available Options')
        self.__print('-----------------')
        for i in range(len(door_list)):
            self.__print('{}. Move {}?'.format(i + 1, 
                                               door_list[i]))
        self.__print('{}. Pick Up {}?'.format(len(door_list) + 1, 
                                              item))
        self.__print('{}. Look through backpack.'.format(len(door_list) + 2))
        self.__print('')
        self.__print('Settings')
        self.__print('--------')
        self.__print('0. Quit')
    
    def print_bar_end(self):
        '''
        Print the bar to indicate the end of a turn.
        '''
        
        # Update.
        self.__print('')
        self.__print('================================================')
    
    def print_bar_start(self):
        '''
        Print the bar to indicate the start of a turn.
        '''
        
        # Update.
        self.__print('================================================')
        self.__print('================================================')
    
    def print_game_complete_message(self, 
                                    character, 
                                    dungeon):
        '''
        Print message when the game is complete.
        '''
        
        # Update.
        self.__print('You possess everything in your reach.')
        self.__print('The dungeon remains, and you within it.')
    
    def print_inventory(self, 
                        character, 
                        dungeon):
        '''
        Print character inventory.
        '''
        
        # Instantiate.
        description = dungeon.get_room_description_text(character.row, 
                                                        character.column)
        inventory_list = []
        character.populate_inventory_list(inventory_list)
        
        # Update.
        temp_text = ''
        for item in inventory_list:
            temp_text = '{}, {}'.format(temp_text, 
                                        item)
        temp_text = temp_text.lstrip(', ')
        self.__print('You open your backpack. The {} are all highlighted with the {} atmosphere of the room.'.format(temp_text, 
                                                                                                              description))

    
    def print_map(self, 
                  character, 
                  dungeon, 
                  symbol_room_with_character = '[X]', 
                  symbol_room_without_character = '[ ]'):
        '''
        Print dungeon map with character represented.
        '''
        
        # Instantiate.
        dungeon_room_grid = []
        dungeon.populate_empty_room_grid(dungeon_room_grid)
        
        # Update.
        print('Map')
        print('---')
        for i in range(len(dungeon_room_grid)):
            temp_text = ''
            for j in range(len(dungeon_room_grid[i])):
                temp_symbol = symbol_room_without_character
                if (i == character.row) and (j == character.column):
                    temp_symbol = symbol_room_with_character
                temp_text = '{}{}'.format(temp_text, 
                                          temp_symbol)
            self.__print(temp_text)
    
    def print_pick_up_message(self, 
                              character, 
                              dungeon, 
                              item):
        '''
        Print message when character picks up an item from the dungeon.
        '''
        
        # Instantiate.
        description = dungeon.get_room_description_text(character.row, 
                                                        character.column)
        
        # Update.
        self.__print('The {} has been placed in your backpack.'.format(item))
    
    def print_pick_up_message_failure(self, 
                                      character, 
                                      dungeon):
        '''
        Print message when character tries to pick up nothing.
        '''
        
        # Instantiate.
        description = dungeon.get_room_description_text(character.row, 
                                                        character.column)
        
        # Update.
        self.__print('There is nothing is this room for you.')
        self.__print('The room remains {}.'.format(description))
    
    def print_room_description(self, 
                               character, 
                               dungeon):
        '''
        Print the description of the room that the character is in.
        '''
        
        # Instantiate.
        description = dungeon.get_room_description_text(character.row, 
                                                        character.column)
        item = dungeon.get_item_text(character.row, 
                                     character.column)
        
        # Update.
        self.__print('')
        self.__print('Room Description')
        self.__print('----------------')
        self.__print('You look around.')
        self.__print('The room is {}.'.format(description))
        self.__print('You see a {}.'.format(item))
    
    def route_user_input(self, 
                         character, 
                         dungeon, 
                         user_input):
        '''
        Route user input so that it affects both the dungeon and character appropriatly.
        '''
        
        # Instantiate.
        door_list = []
        dungeon.populate_door_list_text(character.row, 
                                        character.column, 
                                        door_list)
                
        # Update.
        if user_input == 0:
            self.__print('We all quit eventually.')
            self.__print('Our face so smooth without the tired wear.')
            sys.exit()
        elif user_input < len(door_list) + 1:
            if door_list[user_input - 1] == 'north':
                character.move_north()
            elif door_list[user_input - 1] == 'south':
                character.move_south()
            elif door_list[user_input - 1] == 'east':
                character.move_east()
            elif door_list[user_input - 1] == 'west':
                character.move_west()
        elif user_input == len(door_list) + 1:
            item = dungeon.get_room_item(character.row, 
                                         character.column)
            if item == 'nothing':
                self.print_pick_up_message_failure(character, 
                                                   dungeon)
            else:
                self.print_pick_up_message(character, 
                                           dungeon, 
                                           item)
                character.add_to_inventory(item)
        elif user_input == len(door_list) + 2:
            self.print_inventory(character, 
                                 dungeon)
    
    def __print(self, 
                text):
        '''
        Print text to console, and add delay.
        '''
        
        print(text)
        time.sleep(self.__delay)