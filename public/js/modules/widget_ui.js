
var WidgetUI = Backbone.Model.extend({

  defaults: {
    showMore: false, 
    showText: 'Show More'
  },

  triggerCloner: function() {
    window.top.postMessage(utils.params.serialize(grn.buildQuery()), '*')
  },

  initialize: function() {
    hub.on('filters:updated', function(filters) {
      this.set('embedCode', grn.buildQuery())
    }, this)
    hub.on('activateResult', function(activeResult) {
      var current = this.get('activeResult')
      if (current) current.set('active', false)
      this.set('activeResult', activeResult)
      activeResult.set('active', true)
    }, this)
  },

  showMore: function(){
    this.set('showMore', !this.get('showMore'))
    this.set('showText', (this.get('showText') == 'Show More')? 'Show Less' : 'Show More')
  }
})
