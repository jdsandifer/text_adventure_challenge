'''
Project: Life Adventure.

Room file.

.. codeauthor:: Bradley Elenbaas <mr.elenbaas@gmail.com>
'''

# Import Python second-party libraries.
import config
import random

class Room(object):
    '''
    Room class.
    '''
    
    def __init__(self):
        '''
        Pseudo-Constructor.
        '''
        
        # Instantiate (private) class member variables.
        self.__config = config.Config()
        
        # Instantiate (private) class member variables.
        self.__description = self.__get_random('description')
        self.__item = self.__get_random('item')
        self.__name = self.__get_random('name')
    
    @property
    def description(self):
        '''
        Get room description.
        '''
        
        # Return.
        return self.__description
    
    @property
    def item(self):
        '''
        Get room item.
        '''
        
        # Return.
        return self.__item
    
    @item.setter
    def item(self, 
             value):
        '''
        Set room item to value parameter.
        '''
        
        # Update.
        self.__item = value
    
    @property
    def name(self):
        '''
        Get room name.
        '''
        
        # Return.
        return self.__name
    
    def __get_random(self, 
                     option, 
                     delimiter = ',', 
                     section = 'room'):
        '''
        Get a random option from the set of options.
        '''
        
        # Instantiate.
        result = None
        
        # Update.
        result = config.Config().get(section, 
                                     option)
        result = result.split(delimiter)
        result = result[random.randrange(0, 
                                         len(result))]
        
        # Return.
        return result