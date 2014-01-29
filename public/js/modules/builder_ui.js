var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')

var BuilderUI = Backbone.Model.extend({

  defaults: { params: {} },

  initialize: function(config) {
    this.filters = config.filters
    this.set('currentHost', location.host)
    hub.on('filters:updated', function(filters) {
      this.set('embedQuery', this.toClientUrl())
    }, this)
  },

  fromQuery: function(query) {
    this.set('params', utils.params.deserialize(query.substr(1)).ui || {})
  },

  toClientUrl: function() {
    return { filters: this.filters.toClientUrl(), ui: this.get('params') }
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
