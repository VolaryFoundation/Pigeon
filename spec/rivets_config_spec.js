
var assert = require('assert')
require('../public/js/rivets_config')
var rivets = require('rivets')

describe('formatters', function() {

  describe('.capitalize', function() {
    
    it ('should capitalize a string', function() {
      assert.equal(rivets.formatters.capitalize('foo'), 'Foo')
    })

    it ('should return an empty string if falsy string given', function() {
      assert.equal(rivets.formatters.capitalize(null), '')
    })
  })
})
