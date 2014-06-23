
var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')
var _ = require('lodash')

var Group = Backbone.Model.extend({

  getTags: function() {
    var skeptics = ['skeptics', 'skeptic', 'critical thinker', 'critical thinkers']
    var atheists = ['atheists', 'atheist', 'godless', 'heathen', 'heathens']
    var humanists = ['humanists', 'humanist']
    var free_thinkers = ['free thinkers', 'free thinker']
    var unitarians = ['unitarians', 'unitarian']
    var philos = [skeptics, atheists, humanists, free_thinkers, unitarians]
    var data = this.get('name') + ' ' + this.get('description')
    var tags = []
    
    philos.forEach(function(entry) {
      var inter = _.intersection(entry, data.split(' ').map(function(word) { return word.toLowerCase() }))
      if (inter.length) {
        tags.push(entry[0])
      }
    })

    return tags.length ? tags : ['secular']
  },

  sendOn: function(val) {
    window.open(val.currentTarget.attributes.href.value, '_blank')
  },

  activate: function() {
    hub.trigger('activateResult', this)
  }
})

var Groups = Backbone.Collection.extend({
  url: function() {
    return 'http://volary-eagle' + (location.href.indexOf('localhost') > -1 ? '-staging' : '') + '.herokuapp.com/cache?type=group'
  },
  model: Group,
  initialize: function() {

    hub.on('search:groups', function(filters) {
      if (filters.tags && _.isEmpty(filters.tags)) {
        delete filters.tags
      }
      this.fetch({ data: _.extend({ q: filters }, { fields: { location: true, name: true, tags: true, _refs: true, _entityId: true } }) })
    }, this)

    this.on('sync', function() {
      hub.trigger('search:done', this.models)
    }, this)
  },
})

module.exports = Groups

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
