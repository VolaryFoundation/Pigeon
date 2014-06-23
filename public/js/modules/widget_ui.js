
var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')
var _ = require('lodash')

var WidgetUI = Backbone.Model.extend({

  defaults: {
    showMore: false,
    showMenu: false,
    showMenuText: "Menu +",
    showText: 'Show More',
    showingFilters: false,
    promptingForEmail: false,
    activeTags: [],
    loading: true
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

    hub.on('search:done', function() {
      this.set('loading', false)
    }, this)

    hub.on('search:started', function() {
      this.set('loading', true)
    }, this)
  },

  showMore: function(){
    this.set('showMore', !this.get('showMore'))
    this.set('showText', (this.get('showText') == 'Show More')? 'Show Less' : 'Show More')
  },

  toggleShowAsList: function(){
    this.set('showAsList', !this.get('showAsList'))
  },

    toggleShowAsDark: function(){
    this.set('showAsDark', !this.get('showAsDark'))
  },

  toggleShowFilters: function() {
    this.set('showingFilters', !this.get('showingFilters'))
  },

  toggleShowMenu: function() {
    this.set('showMenu', !this.get('showMenu'))
    if (this.get('showMenu') == true) {
      this.set('showMenuText', "Menu -")
    }else{
      this.set('showMenuText', "Menu +")
    }
  }

})

module.exports = WidgetUI

//=========================================================================//
// This file is part of Pigeon.                                            //
//                                                                         //
// Pigeon is Copyright 2014 Volary Foundation and Contributors             //
//                                                                         //
// Pigeon is free software: you can redistribute it and/or modify it       //
// under the terms of the GNU Affero General Public License as published   //
// by the Free Software Foundation, either version 3 of the License, or    //
// at your option) any later version.                                      //
//                                                                         //
// Pigeon is distributed in the hope that it will be useful, but           //
// WITHOUT ANY WARRANTY; without even the implied warranty of              //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU       //
// Affero General Public License for more details.                         //
//                                                                         //
// You should have received a copy of the GNU Affero General Public        //
// License along with Pigeon.  If not, see                                 //
// <http://www.gnu.org/licenses/>.                                         //
//=========================================================================//
