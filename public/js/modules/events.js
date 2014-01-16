
var Event = Backbone.Model.extend({

  activate: function() {
    hub.trigger('activateResult', this)
  }
})

var Events = Backbone.Collection.extend({

  url: 'http://volary-eagle.herokuapp.com/events',

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
