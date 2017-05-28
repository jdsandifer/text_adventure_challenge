QUnit.test( "Qunit test", function( assert ) {
  assert.equal( 1, "1", "Number one should equal character one in basic equals." )
})

QUnit.module( 
    'Object Manipulation',
    {
      setup: () => {
        player.inventory = []
      }
    })
QUnit.test( 'inventoryFinder.js', function( assert ) {

  assert.equal( 
      inventoryFinder(flowers),
      false, 
      "Return false when player doesn't have object." )

  player.inventory.push(flowers)
  assert.equal( 
      inventoryFinder(flowers), 
      true, 
      "Return true when player has object." )

  assert.equal( 
      inventoryFinder(null), 
      false, 
      "Return false when null is received as object." )
})

QUnit.module( 'Movement' )