
var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')

var WidgetUI = Backbone.Model.extend({

  defaults: {
    showMore: false, 
    showText: 'Show More',
    showingFilters: false,
    promptingForEmail: false
  },

  triggerCloner: function() {
    //window.top.postMessage(utils.params.serialize(grn.buildQuery()), '*')
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
