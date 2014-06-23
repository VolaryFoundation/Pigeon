(function(global) {

  var groups = new Groups
  var events = new Events
  var searcher = new Searcher
  var filters = new Filters
  var ui = new WidgetUI({ filters: filters })
  var map = new Map

  var grn = {

    processQuery: function(query) {
      var params = utils.params.deserialize(query.substr(1))
      this.viewModel.styles = params.styles || {}
      this.viewModel.title = params.title || ''
      if (params.filters) {
        _.each(params.filters, function(v, k) {
          this.viewModel.filters.set(k, v, { silent: true })
        }, this)
      }
    },

    buildQuery: function() {
      var query = {}
      query.styles = this.viewModel.styles || {}
      query.title = this.viewModel.title || ''
      query.filters = {}
      _.each(this.viewModel.filters.attributes, function(v, k) {
        query.filters[k] = v
      })
      return query
    },

    hub: hub,

    viewModel: {
      searcher: searcher,
      filters: filters,
      ui: ui,
      map: map,
      noop: function() {}
    }
  }

  global.grn = grn

})(typeof exports === 'undefined' ? this : exports)

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
