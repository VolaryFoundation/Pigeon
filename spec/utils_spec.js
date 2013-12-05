global._ = require('lodash')
require('../public/js/utils')
var utils = global.utils
var assert = require('assert')

describe('utils', function() {

  describe('.setParam', function() {

    describe('an existing param', function() {

      it ('should replace it', function() {
        var url = '?a=1'
        var newUrl = utils.setParam(url, 'a', 2)
        assert.ok(newUrl === '?a=2')
      })
    })

    describe('a new param', function() {

      it ('should add it to end of url', function() {
        var url = '?a=1'
        var newUrl = utils.setParam(url, 'b', 2)
        assert.ok(newUrl === '?a=1&b=2')
      })
    })
  })

  describe('.addHashValue', function() {
    
    describe('existing hash', function() {
      
      it ('should add as a new key/value to existing hash', function() {
        var hash = { a: {} }
        var newHash = utils.addHashValue(hash, 'a', 'b', 2)
        assert.ok(newHash.a.b === 2)
      })
    }) 

    describe('no existing hash', function() {

      it ('should add a new hash at given key', function() {
        var hash = { a: {} }
        var newHash = utils.addHashValue(hash, 'b', 'c', 1)
        assert.ok(newHash.b.c === 1)
      })
    })
  })

  describe('.addArrayValue', function() {
    
    describe('existing array', function() {
      
      it ('should just push to existing array', function() {
        var hash = { a: [] }
        var newHash = utils.addArrayValue(hash, 'a', 1)
        assert.ok(newHash.a[0] === 1)
      })
    })

    describe('no existing array', function() {
      
      it ('should create new array with first element as given', function() {
        var hash = { a: [] }
        var newHash = utils.addArrayValue(hash, 'b', 1)
        assert.ok(newHash.b[0] === 1)
      })
    })
  })

  describe('.params.deserialize', function() {
    
    describe('empty params', function() {
      
      it ('should return an empty hash', function() {
        assert.deepEqual(utils.params.deserialize(''), {})
      })
    })

    describe('a flag', function() {
      it ('should ignore it!', function() {
        var query = 'a&b&c=1'
        assert.deepEqual(utils.params.deserialize(query), { c: 1 })
      })
    })

    describe('simple params', function() {

      it ('should return a hash with key/values', function() {
        var query = 'a=1&b=2'
        assert.deepEqual(utils.params.deserialize(query), { a: 1, b: 2 })
      })
    })

    describe('array params', function() {

      it ('should return a hash with array of values', function() {
        var query = 'a[]=1&a[]=2'
        assert.deepEqual(utils.params.deserialize(query), { a: [ 1, 2 ] })
      })
    })

    describe('hash params', function() {

      it ('should return a hash of hashes', function() {
        var query = 'a[b]=1&a[c]=2'
        assert.deepEqual(utils.params.deserialize(query), { a: { b: 1, c: 2 } })
      })
    })
  })
})
