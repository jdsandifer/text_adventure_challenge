# JavaScript Code Style
Because it's super helpful when all of the code looks similar,
here's the JS style guide for this project. It's grouped into sections
based on how many of us have discussed each item so far. Feel free to add ideas
into a section or promote them as appropriate.

The over-arching factors we've used to help settle on one style have been 
whether or not a particular item is a current best practice *and* 
attractive to people who can offer us jobs - neither necessarily being 
more important than the other. (Also, "best practice" is hard to verify so 
there is some openness for being clearly readable, maintainable, etc. code over 
possible best practices.)



### Stuff we all have discussed or agree on



### Stuff two people have agreed on

1. Leave out syntax that can be left out:
   - semi-colons only when necessary
   - curly brackets only when necessary
   
2. ES6 style classes (unless we find a compelling reason otherwise)

3. Classes and functions separated into multiple files based on role in 
the game: objectDeclarations, worldConfig, objectCreation, view, input, parser, 
gameFunctions, etc.
 
4. Clear variable and function names:
   - function names should describe what they do
   - no extraneous words ("player" instead of "playerObject", etc.)
   - getter names do not contain the word "get" (or return, etc.)
   - setter names do contain the word "set" (although these should be rare)
   - camelCase for most items
   - PascalCase for Objects
   

### New ideas from one of us:

1. Function names clearly distinguish type:
   - Pure functions (return a value based on inputs with no side effects):
      - Name describes return value only
      - Verbs almost exclusively for boolean return values: player.has(item), 
      door.isLocked(), entity.can(ability), etc.
      - Never contains words like return, report, calculate, etc.
      - Good examples: player.name(), sum(valueA, valueB) - as a noun, 
      room.doors(), entity.inventoryList(), etc.
   - Procedures (change something and rarely return values other than  
   errors/success)
      - Name describes the side effects (changes effected outside the function)
      - Usually contain a verb
      - Rarely contain "And" - could be a sign of too much in one procedure
      - Good examples: player.setLocation(newRoom), updateDisplay(),  
      displayMessage(message)
