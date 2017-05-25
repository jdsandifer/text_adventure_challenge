#! /usr/local/bin/python3

'''
Written in Python 3
Run this from the command line with "python kojo_idol_trainee.py"
Enter 'quit' to break the loop and end the game.
'''

# Rooms

rooms = {'entry':['north', 'vocal training'], 'vocal training':['north', 'rap training'], 'rap training':['east', 'dance training'], 'dance training':['south', 'acting training'], 'acting training':['south', 'entry']}

## I may come back to this later. It didn't work as I'd hoped
# class Room():
# 	def __init__(self, door):
# 		self.door = door


# People
class Person():
    def __init__(self, inventory = None, location = None):
        self.inventory = []

    def move(direction):
        self.location = direction
        return result


# Input processing

# Movement

# Help function: I put this on hold
def help():
	'''no input -> str'''
	print("I'm your training guide here at Yin Entertainment")
	print("h: help")
	help ={
		"h": 'help'
	}

# Game loop

## This approach didn't work as I'd hoped.
# entry = Room("north")
# vocal = Room("north")
# rap = Room("east")
# dance = Room("south")
# acting = Room("south")

# initialize the trainee
trainee = Person()
trainee.location = 'entry'
while True:
	direction = input("You are in the {} room and there is a door in the {} wall. Where would you like to go?: ".format(trainee.location.upper(), rooms[trainee.location][0].upper())).lower()
	if direction == rooms[trainee.location][0]:
		trainee.location = rooms[trainee.location][1]
	elif direction == 'quit':
		break
	else:
		print("You walk into a wall. You are in the {} room and there is a door in the {} wall.".format(trainee.location.upper(), rooms[trainee.location][0].upper()))
		# Make the values in the rooms dictionary a LIST of strings, instead of a string
		# Add the destination room to the list of values in the rooms dictionary
		# trainee.location = rooms[trainee.location][1]