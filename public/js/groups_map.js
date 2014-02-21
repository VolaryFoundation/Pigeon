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

rivets.bind($('#map-widget'), {
  searcher: searcher,
  filters: filters,
  ui: ui,
  map: map,
  noop: _.noop
}) 
