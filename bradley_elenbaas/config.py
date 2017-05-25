'''
Project: Life Adventure

Config file.

.. codeauthor:: Bradley Elenbaas <mr.elenbaas@gmail.com>
'''

# Import Python first-party libraries.
import configparser

# Instantiate file-scope pseudo-constants.
CONFIG_FILENAME = 'config.ini'

class Config(configparser.ConfigParser, object):
    '''
    Config class.
    '''
    
    def __init__(self):
        '''
        Pseudo-Constructor.
        '''
        
        # Inheritance.
        super(Config, self).__init__()
        
        # Update.
        self.read(CONFIG_FILENAME)