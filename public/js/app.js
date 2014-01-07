(function(global) {

  var hub = _.extend({}, Backbone.Events)

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

  var Group = Backbone.Model.extend({

    getTags: function() {

      var philos = ['skeptics', 'skeptic','humanists', 'humanist','atheist', 'atheists', 'unitarian', 'free thinker', 'free thinkers']
      var data = this.get('last').data.name + ' ' + this.get('last').data.description
      
      var inter = _.intersection(philos, data.split(' ').map(function(word) { return word.toLowerCase() }))

      return inter.length ? inter : ['secular']
    },

    activate: function() {
      hub.trigger('activateResult', this)
    }
  })

  var Groups = Backbone.Collection.extend({
    url: 'http://volary-eagle.herokuapp.com/groups',
    model: Group,
    initialize: function() {

      hub.on('search:groups', function(filters) {
        this.fetch({ data: filters })
      }, this)

      this.on('sync', function() {
        hub.trigger('search:done', this.models)
      }, this)
    },
  })

  var Embedder = Backbone.Model.extend({

    defaults: {
      showing: false
    },

    toggle: function() {
      this.set('showing', !this.get('showing'))
    }
  })

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

      this.tags = new Tags([ { name: 'foo' } ])

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

    forApiUrl: function() {
      return this.serialize([ 'subject' ])
    },

    forClientUrl: function() {
      return this.serialize([])
    },

    // DIRTY
    fromClientUrl: function(query) {
      return this.deserialize(query)
    }
  })

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
      hub.trigger('search:' + filters.get('subject'), filters.forApiUrl())
    }
  })

  var UI = Backbone.Model.extend({

    defaults: {
      showMore: false, 
      showText: 'Show More'
    },

    triggerCloner: function() {
      window.top.postMessage(utils.params.serialize(grn.buildQuery()), '*')
    },

    initialize: function() {
      hub.on('activateResult', function(activeResult) {
        var current = this.get('activeResult')
        if (current) current.set('active', false)
        this.set('activeResult', activeResult)
        activeResult.set('active', true)
      }, this)
    },

    showMore: function(){
      this.set('showMore', !this.get('showMore'))
      this.set('showText', (this.get('showText') == 'Show More')? 'Show Less' : 'Show More')
    }
  })

  function lat_lng(place) {
    var ll = place.get('last').data.location.lng_lat
    return [ ll[1], ll[0] ]
  }
  
  var Map = Backbone.Model.extend({
    
    bind: function() {
      hub.on('results:updated', this.update, this)
      hub.on('activateResult', function(place) {
        this.panTo(place)
      }, this)
    },

    panTo: function(place) {
      this.get('mb').panTo(lat_lng(place))
    },

    update: function(places) {
      this.updateMarkers(places)
      this.focus(places)
    },

    updateMarkers: function(places) {
      var markers = this.get('markers') || (this.attributes.markers = L.layerGroup().addTo(this.get('mb')))
      markers.clearLayers()
      places.forEach(function(place) {
        var last = place.get('last')
        var marker = L.marker(lat_lng(place), { title: last.data.name })
        marker.on('click', function(e) {
          hub.trigger('activateResult', place)
        })
        markers.addLayer(marker)
      })
    },

    focus: function(places) {
      this.get('mb').fitBounds(
        places.map(function(place) {
          return lat_lng(place)
        })
      )
    }
  })

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
