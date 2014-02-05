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
