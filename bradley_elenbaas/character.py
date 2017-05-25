'''
Project: Life Adventure

Character file.

.. codeauthor:: Bradley Elenbaas <mr.elenbaas@gmail.com>
'''

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
        
        pass
    
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