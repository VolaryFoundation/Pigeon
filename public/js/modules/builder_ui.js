var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')
var _ = require('lodash')

var BuilderUI = Backbone.Model.extend({

  defaults: { params: {}  
            },

  initialize: function(config) {
    this.filters = config.filters
  
    this.filters.tags.on('reset', function() {
      var actives = this.filters.tags.filter(function(tag) { return tag.get('status') })
      this.set('activeTags', _.invoke(actives, 'get', 'name'))
      hub.trigger('updateChosen')
    }, this)
    this.on('change:activeTags', function() {
      var actives = this.get('activeTags') || []
      config.filters.tags.each(function(tag) {
        if (actives.indexOf(tag.get('name')) > -1) tag.set('status', 1)
        else tag.set('status', 0)
      })
    }, this)
  
    this.set('currentHost', location.host)
    hub.on('filters:updated', function(filters) {
      this.set('embedQuery', this.toClientUrl())
    }, this)
    this.on('change:size change:colorScheme change:viewMode', function() {
      hub.trigger('filters:updated', this.filters)
    })
  },

  fromQuery: function(query) {
    this.set('params', utils.params.deserialize(query.substr(1)).ui || {})
  },

  toClientUrl: function() {
    return { filters: this.filters.toClientUrl(), ui: this.get('params'), size: this.get('size'), colorScheme: this.get('colorScheme'), viewMode: this.get('viewMode')}
  },

  showPreview: function(e) {
    var query = this.toClientUrl()
    query.widget = 'groups-map'
    e.target.href = location.protocol + '//' + location.host + '/preview.html?' + utils.params.serialize(query)
  },

  toggleShowingCode: function() {
    this.set('showingCode', !this.get('showingCode'))
  }
})

module.exports = BuilderUI
