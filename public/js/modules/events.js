var hub = require('../hub')
var utils = require('../utils')
var Backbone = require('backbone')

var Event = Backbone.Model.extend({

  activate: function() {
    hub.trigger('activateResult', this)
  }
})

var Events = Backbone.Collection.extend({

  url: 'http://api.secularconnect.org/events',

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

module.exports = Events

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
