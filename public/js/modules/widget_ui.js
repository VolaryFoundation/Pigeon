
var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')
var _ = require('lodash')

var WidgetUI = Backbone.Model.extend({

  defaults: {
    showMore: false, 
    showText: 'Show More',
    showingFilters: false,
    promptingForEmail: false,
    activeTags: []
  },

  nextItem: function() {
    var active = this.get('activeResult')
    var results = this.searcher.get('results')
    var index = _.findIndex(results, function(res) {
      return res.get('_id') == active.get('_id')
    })
    var next = results[index + 1]
    if (next) hub.trigger('activateResult', next)
  },

  prevItem: function() {
    var active = this.get('activeResult')
    var results = this.searcher.get('results')
    var index = _.findIndex(results, function(res) {
      return res.get('_id') == active.get('_id')
    })
    var prev = results[index - 1]
    if (prev) hub.trigger('activateResult', prev)

  },

  triggerCloner: function() {
    window.open(location.protocol + '//' + location.host + '/builder.html?' + utils.params.serialize({ filters: this.filters.toClientUrl() }), 'WidgetCloner')
  },

  toggleEmailPrompt: function() {
    this.set('promptingForEmail', !this.get('promptingForEmail'))
  },

  saveEmail: function() {
    this.toggleEmailPrompt()
    setTimeout(function() {
      this.set('message', 'Email address saved.')
      setTimeout(function() {
        this.set('message', '')
      }.bind(this), 2000)
    }.bind(this), 500)
  },

  initialize: function(config) {
    this.filters = config.filters
    this.searcher = config.searcher
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
  },

  toggleShowFilters: function() {
    this.set('showingFilters', !this.get('showingFilters'))
  }
})

module.exports = WidgetUI
