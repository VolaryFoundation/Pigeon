(function(global) {

  var groups = new Groups
  var events = new Events
  var embedder = new Embedder
  var searcher = new Searcher
  var filters = new Filters
  var ui = new UI({ filters: filters })
  var map = new Map

  var grn = {

    processQuery: function(query) {
      var params = utils.params.deserialize(query.substr(1))
      this.viewModel.styles = params.styles || {}
      this.viewModel.title = params.title || ''
      if (params.filters) {
        _.each(params.filters, function(v, k) {
          this.viewModel.filters.set(k, v, { silent: true })
        }, this)
      }
    },

    buildQuery: function() {
      var query = {}
      query.styles = this.viewModel.styles || {}
      query.title = this.viewModel.title || ''
      query.filters = {}
      _.each(this.viewModel.filters.attributes, function(v, k) {
        query.filters[k] = v
      })
      return query
    },

    hub: hub,

    viewModel: {
      searcher: searcher,
      filters: filters,
      embedder: embedder,
      ui: ui,
      map: map,
      noop: function() {}
    }
  }

  global.grn = grn

})(typeof exports === 'undefined' ? this : exports)
