#Text adventure for Code-Bytes PDX

print("You're a junior science officer from Deep Space 9 backpacking in the beautiful mountains on Bajor. \nAs you walk through the forst, black clouds gather in the sky and fat raindrops begin to fall. You spot a crack in the mountain side, and run to take shelter. It's actually long tunnel going down into the mountain, and in the distance there is a faint light.  \nExploration is your business, you move toward the light.  At the end of the tunnel you emerge into a cave with an altar bearing an orb to your left and an Iconian gateway to your right.\n")
choiceA = input("Do you a) approach the orb, b) approach the gateway, or c) leave the cave: ")
leaveCave = "\nYou leave the cave, contact the station to report the discovery of a new orb and a gateway. They will send the chief science officer and an away team to investigate, and you are recalled to the station to report. You receive a commendation from Starfleet and the Vedek Assembly holds a formal reception to honor your discovery, but you missed your opportunity for adventure. Game over."
approachOrb = "\nAs you walk toward the orb, it emits swirls of light that envelop you.  You have an orb vision -- you're in a library, an archive, surrounded by artifacts, scrolls, books, works of art, data chips, outdated technology.  Outside, you can hear the sounds of a fierce battle -- phaser fire, explosions, battle cries and screams of pain.  \nPeople are hastily packing crates.  One woman takes an artifact out of a glass case, and dismantles it, handing one piece and a scroll each to three archivists.  'Run, go, hide these on your home planets.  When the time is right, they will be reunited to aid the Emissary.' The three archivists flee. You recognize one as a Vulcan, but the other two are species you've never seen before. The light brightens to blinding white, then fades, and you are back in the cave standing before the orb. Behind you, the gateway is now fixed -- it's showing you the ceremonial grounds on Vulcan. \nDo you a) walk through the gateway to Vulcan, or b) leave the cave: "
gameError = "To navigate this game, you will need to type a single lowercase letter in response to the prompts. Please play again!"
inventory = {'water': 3, 'rations': 3, 'camping gear': True}
if choiceA == 'c':
    print(leaveCave)
elif choiceA == 'b':
    choiceB = input("\nThe gateway is shifting every few seconds from place to place - you recognize the Temple of Boreth, the capital on Cardassia Prime, the pyramids of Giza, a beach on Risa, the sands of Tyree…  \nDo you: a) Walk into the gateway, not being able to control where you end up, b) Turn around and approach the orb, or c) leave the cave: ")
    if choiceB == 'c':
        print(leaveCave)
    elif choiceB == 'a':
        print("\nYou walk through the gateway just as it changes to San Francisco. You find yourself on the grounds of Starfleet Headquarters. A guard sees you appear and calls for security. After explaining who you are and how you got there, you are debriefed and put on the next ship headed for Bajoran space. By the time you return, the Chief Science Officer has begun a thorough investigation of the cave's orb and gateway. You get to assist with her research, but only peripherally. Game over.")
    elif choiceB == 'b':
        choiceC = input(approachOrb)
        if choiceC == 'b':
            print(leaveCave)
        elif choiceC == 'a':
            #Adventure begins
            print('adventure begins')
        else:
            print(gameError)
    else:
        print(gameError)
elif choiceA == 'a':
    choiceD = input(approachOrb)
    if choiceD == 'b':
        print(leaveCave)
    elif choiceD == 'a':
        print('adventure begins')
    else:
        print(gameError)
else:
    print(gameError)
