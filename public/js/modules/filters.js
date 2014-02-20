
var utils = require('../utils')
var hub = require('../hub')
var Backbone = require('backbone')
var $ = require('jquery')
var _ = require('lodash')

var Tag = Backbone.Model.extend({ 
  defaults: { status: 0 },
  toggle: function() { 
    var newStatus = this.get('status') + 1
    var safeNewStatus = newStatus > 2 ? 0 : newStatus
    this.set('status', safeNewStatus)
  }
})
var Tags = Backbone.Collection.extend({ model: Tag })

var Filters = Backbone.Model.extend({

  defaults: {
    activeTags: []
  },

  initialize: function() {

    // bind a complex collection for the UI with a simple array in .attributes for serialization
    // this MAY need some refactoring in the future, but at least its encapsulated
    utils.bindArrayToCollection(this, 'ranges', [
      { text: 'local', name: 'local' },
      { text: 'regional', name: 'regional' },
      { text: 'national', name: 'national' },
      { text: 'international', name: 'international' }
    ])

    utils.bindArrayToCollection(this, 'prices', [
      { text: '$', name: '$' },
      { text: '$$', name: '$$' },
      { text: '$$$', name: '$$$' },
      { text: '$$$$', name: '$$$$' }
    ])

    utils.bindArrayToCollection(this, 'attendances', [
      { text: '1-10', name: '1-10' },
      { text: '11-25', name: '11-25' },
      { text: '26-50', name: '26-50' },
      { text: '51-100', name: '51-100' },
      { text: '101-250', name: '101-250' },
      { text: '251-500', name: '251-500' },
      { text: '501-1000', name: '501-1000' },
      { text: '1000+', name: '1000+' }
    ])

    utils.bindArrayToCollection(this, 'memberCounts', [
      { text: 'No membership', name: 'none' },
      { text: '1-10 Members', name: '1-10' },
      { text: '11-25 Members', name: '11-25' },
      { text: '26-50 Members', name: '26-50' },
      { text: '51-100 Members', name: '51-100' },
      { text: '101-250 Members', name: '101-250' },
      { text: '251-500 Members', name: '251-500' },
      { text: '501-1000 Members', name: '501-1000' },
      { text: '1000+ Members', name: '1000+' }
    ])

    this.tags = new Tags([])

    // keep url and form in sync current filter set with URL query
    function update() {
      hub.trigger('filters:updated', this)
    }

    this.on('change', update, this)
    this.tags.on('change:status', update, this)

    this.on('change:location-city', function() {
      this.attributes.keys = this.attributes.keys || {}
      var city = this.get('location-city')
      if (city) this.attributes.keys['location.city'] = city
      else delete this.attributes.keys['location.city']
    }, this)
    this.on('change:location-state', function() {
      this.attributes.keys = this.attributes.keys || {}
      var state = this.get('location-state')
      if (state) this.attributes.keys['location.state'] = state
      else delete this.attributes.keys['location.state']
    }, this)
    this.on('change:location-country', function() {
      this.attributes.keys = this.attributes.keys || {}
      var country = this.get('location-country')
      if (country) this.attributes.keys['location.country'] = country
      else delete this.attributes.keys['location.country']
    }, this)

    this.updateTags()
  },

  updateTags: function() {
    $.get('http://api.secularconnect.org/groups/tags', function(tags) {
      var existing = this.tags
      var filtered = (tags || [])
        .filter(function(tag) { return tag })
        .map(function(tag) { return { name: tag, status: (existing.find(function(e) { return e.get('name') == tag && e.get('status') }) ? 1 : 0) } })
      this.tags.reset(filtered)
    }.bind(this))

  },

  serialize: function(blacklist) {
    return _.extend(this.serializeObject(this.attributes, blacklist), {
      tags: this.serializeTags(this.tags.models)
    })
  },

  // DIRTY
  deserialize: function(obj) {
    return _.reduce(obj, function(memo, v, k) {
      if (k === 'tags') {
        this.tags.reset(this.deserializeTags(v))
      } else {
        if (k === 'keys') {
          _.extend(memo, _.reduce(v, function(memo, v, k) {
            memo[k.replace(/\./g, '-')] = v
            return memo
          }, {}))
        } else {
          memo[k] = v
        }
      }
      return memo
    }.bind(this), {})
  },

  serializeTags: function(tags) {
    return tags.filter(function(tag) {
      return tag.get('status')
    }).reduce(function(memo, tag) {
      memo[tag.get('name')] = tag.get('status')
      return memo
    }, {})
  },

  serializeObject: function(obj, blacklist) {
    return _.reduce(obj, function(memo, v, k) {
      if (!_.contains(blacklist, k) && v) {
        if (k.indexOf('-') === -1) {
          if (v) {
            if (_.isObject(v)) {
              if (_.values(v)[0]) {
                memo[k] = v 
              }
            } else {
              memo[k] = v 
            }
          }
        }
      }
      return memo
    }, {})
  },

  deserializeTags: function(tags) {
    return _.map(tags, function(status, name) { 
      return new Tag({ name: name, status: status })
    })
  },

  toApiUrl: function() {
    return this.serialize([ 'subject' ])
  },

  toClientUrl: function() {
    return this.serialize([])
  },

  // DIRTY
  fromQuery: function(query) {
    var data = this.deserialize(utils.params.deserialize(query.substr(1)).filters)
    this.set(data)
    return data
  }
})

module.exports = Filters
