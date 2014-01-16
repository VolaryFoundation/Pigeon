
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
    changeVersion: 0,
    subject: 'groups'
  },
  initialize: function() {

    // bind a complex collection for the UI with a simple array in .attributes for serialization
    // this MAY need some refactoring in the future, but at least its encapsulated
    utils.bindArrayToCollection(this, 'size', [
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

    utils.bindArrayToCollection(this, 'attendance', [
      { text: '1-10', name: '1-10' },
      { text: '11-25', name: '11-25' },
      { text: '26-50', name: '26-50' },
      { text: '51-100', name: '51-100' },
      { text: '101-250', name: '101-250' },
      { text: '251-500', name: '251-500' },
      { text: '501-1000', name: '501-1000' },
      { text: '1000+', name: '1000+' }
    ])

    utils.bindArrayToCollection(this, 'memberCount', [
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

    this.tags = new Tags([ { name: 'foo' }, { name: 'bar' } ])

    // keep url and form in sync current filter set with URL query
    function update() {
      //if (global.history) global.history.pushState({}, '', '?' + utils.params.serialize(this.forClientUrl()))
      hub.trigger('filters:updated', this)

    }
    this.on('change', update, this)
    this.tags.on('change', update, this)
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
        memo[k] = v
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
      if (!_.contains(blacklist, k) && v) memo[k] = v 
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
    return this.deserialize(query)
  }
})
