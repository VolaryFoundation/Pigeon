var $ = require('jquery')
var moment = require('moment')
var _ = require('lodash')
var Backbone = require('backbone')
var rivets = require('rivets')
var hub = require('./hub')
var utils = require('./utils')

var Filters = require('./modules/filters')
var BuilderUI = require('./modules/builder_ui')

require('./rivets_config')

var filters = new Filters
var ui = new BuilderUI({ filters: filters })

filters.fromQuery(window.location.search)
ui.fromQuery(window.location.search)

rivets.bind($('#wrapper'), {
  filters: filters,
  ui: ui,
  noop: _.noop
}) 

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
