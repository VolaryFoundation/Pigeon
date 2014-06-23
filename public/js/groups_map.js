window.jQuery = window.$ = require('jquery')
var Backbone = require('backbone')
Backbone.$ = $
var rivets = require('rivets')
var _ = require('lodash')

var hub = require('./hub')
var utils = require('./utils')
var Groups = require('./modules/groups')
var WidgetUI = require('./modules/widget_ui')
var Map = require('./modules/map')
var Searcher = require('./modules/searcher')
var Events = require('./modules/events')
var Filters = require('./modules/filters')

require('./rivets_config')
require('./vendor/jquery.scrollintoview')

var groups = new Groups
var events = new Events
var searcher = new Searcher
var filters = new Filters
var ui = new WidgetUI({ filters: filters, searcher: searcher })
var map = new Map

filters.fromQuery(window.location.search)

var styles = utils.params.deserialize(window.location.search).styles

rivets.bind(document.body, {
  searcher: searcher,
  filters: filters,
  ui: ui,
  styles: styles,
  map: map,
  noop: _.noop
})



console.log (styles)

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
