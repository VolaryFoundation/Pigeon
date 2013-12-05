global._ = require('lodash')
global.Backbone = require('backbone')
global.rivets = require('rivets')
global.utils = require('../public/js/utils')
global.rivets = require('rivets')
var grn = require('../public/js/app').grn
var assert = require('assert')

describe('app', function() {

  describe('searcher', function() {

    describe('#search', function() {

      it ('should use given filters to get subject', function() {
        var filters = { get: function() { return 'foo' }, forApiUrl: function() { '/a/url' } }
        //grn.hub.on('search:foo')
        //grn.searcher.search(filters)
      })
    })
    
  })

  describe('filters', function() {
    
  })

  describe('embedder', function() {

    describe('#toggle', function() {

      it ('should toggle true/false the "showing" property', function() {
        assert(grn.embedder.get('showing') == false)
        grn.embedder.toggle()
        assert(grn.embedder.get('showing') == true)
      })
    })
  })

  describe('hub', function() {
    
    it ('should be event interface', function() {
      assert(grn.hub.on)
      assert(grn.hub.off)
      assert(grn.hub.trigger)
    })
  })

  describe('noop', function() {

    it ('should be a noop', function() {
      assert(undefined == grn.noop())
    })
  })
})


