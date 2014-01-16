
var BuilderUI = Backbone.Model.extend({

  defaults: { params: {} },

  initialize: function() {
    hub.on('filters:updated', function(filters) {
      console.log('filters updated ', filters.attributes)
      this.set('embedQuery', { filters: filters.toClientUrl(), ui: this.toClientUrl() })
    }, this)
  },

  fromQuery: function(query) {
    this.set('params', utils.params.deserialize(query.substr(1)).ui || {})
  },

  toClientUrl: function() {
    return this.get('params')
  },

  showPreview: function() {
    console.log('showing preview!')
  },

  toggleShowingCode: function() {
    this.set('showingCode', !this.get('showingCode'))
  }
})
