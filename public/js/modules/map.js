(function() {

  function lat_lng(place) {
    var ll = place.get('location').lng_lat
    return [ ll[1], ll[0] ]
  }
  
  var Map = Backbone.Model.extend({
    
    bind: function() {
      hub.on('results:updated', this.update, this)
      hub.on('activateResult', function(place) {
        this.panTo(place)
      }, this)
    },

    panTo: function(place) {
      this.get('mb').panTo(lat_lng(place))
    },

    update: function(places) {
      this.updateMarkers(places)
      this.focus(places)
    },

    updateMarkers: function(places) {
      var markers = this.get('markers') || (this.attributes.markers = L.layerGroup().addTo(this.get('mb')))
      markers.clearLayers()
      places.forEach(function(place) {
        var marker = L.marker(lat_lng(place), { title: place.get('name') })
        marker.on('click', function(e) {
          hub.trigger('activateResult', place)
        })
        markers.addLayer(marker)
      })
    },

    focus: function(places) {
      this.get('mb').fitBounds(
        places.map(function(place) {
          return lat_lng(place)
        })
      )
    }
  })

  window.Map = Map
})()
