var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')

var Searcher = Backbone.Model.extend({

  initialize: function() {

    hub.on('search:done', function(data) {
      /// wtf backbone, wont trigger change usually, because mysteriously already being set somewhere
      this.set('results', '', { silent: true })
      this.set('results', data)
    }, this)

    this.on('change:results', function() { 
      hub.trigger('results:updated', this.get('results'))
      if (this.get('results').length) hub.trigger('activateResult', this.get('results')[0])
    }, this)

    hub.on('filters:updated', this.search, this)
  },

  search: function(filters) {
    hub.trigger('search:started')
    hub.trigger('search:' + filters.get('subject'), filters.toApiUrl())
  }
})

module.exports = Searcher

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
