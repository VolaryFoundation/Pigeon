
var BuilderUI = Backbone.Model.extend({

  defaults: { params: {} },

  initialize: function(config) {
    this.filters = config.filters
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
