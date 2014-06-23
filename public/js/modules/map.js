
var hub = require('../hub')
var _ = require('lodash')
var Backbone = require('backbone')

function lat_lng(place) {
  if (!place.get('location')) return
  var ll = place.get('location').lng_lat
  return ll ? [ ll[1], ll[0] ] : null
}

var Map = Backbone.Model.extend({
  
  bind: function() {
    hub.on('results:updated', this.update, this)
    hub.on('activateResult', function(place) {
      this.panTo(place)
      var marker = this.getMarker(place.get('name'))
      if (!marker) return
      marker.openPopup()
    }, this)
  },

  panTo: function(place) {
    var ll = lat_lng(place)
    if (!ll) return
    this.get('mb').panTo(ll)
  },

  update: function(places) {
    if (!places.length) return
    this.updateMarkers(places)
    this.focus(places)
  },

  getMarker: function(name) {
    return _.find(this.get('markers').getLayers(), function(marker) { return marker.options.title == name })
  },

  updateMarkers: function(places) {
    var markers = this.get('markers') || (this.attributes.markers = L.layerGroup().addTo(this.get('mb')))
    markers.clearLayers()
    places.forEach(function(place) {
      var ll = lat_lng(place)
      if (!ll) return
      var marker = L.marker(ll, { title: place.get('name') })
      marker.bindPopup("<p style='margin: 10px 0 5px;'>" + place.get('name') + "</p>")
      marker.on('click', function(e) {
        hub.trigger('activateResult', place)
      })
      markers.addLayer(marker)
    })
  },

  focus: function(places) {
    var lls = _.compact(places.map(function(place) {
      return lat_lng(place)
    }))
    if (lls.length == 0) return
    this.get('mb').fitBounds(lls)
  }
})

module.exports = Map

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
