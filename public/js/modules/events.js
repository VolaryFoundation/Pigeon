var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')

var Event = Backbone.Model.extend({

  activate: function() {
    hub.trigger('activateResult', this)
  }
})

var Events = Backbone.Collection.extend({

  url: 'http://api.secularconnect.org/events',

  model: Event,

  initialize: function() {

    hub.on('search:events', function(filters) {
      this.fetch({ data: filters })
    }, this)

    this.on('sync', function() {
      hub.trigger('search:done', this.models)
    }, this)
  },
})

module.exports = Events
