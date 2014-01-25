
var Searcher = Backbone.Model.extend({

  initialize: function() {

    hub.on('search:done', function(data) {
      /// wtf backbone, wont trigger change usually, because mysteriously already being set somewhere
      this.set('results', '', { silent: true })
      this.set('results', data)
    }, this)

    this.on('change:results', function() { 
      hub.trigger('results:updated', this.get('results'))
    }, this)

    hub.on('filters:updated', this.search, this)
  },

  search: function(filters) {
    hub.trigger('search:' + filters.get('subject'), filters.toApiUrl())
  }
})