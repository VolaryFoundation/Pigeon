
var Group = Backbone.Model.extend({

  getTags: function() {
    var skeptics = ['skeptics', 'skeptic', 'critical thinker', 'critical thinkers']
    var atheists = ['atheists', 'atheist', 'godless', 'heathen', 'heathens']
    var humanists = ['humanists', 'humanist']
    var free_thinkers = ['free thinkers', 'free thinker']
    var unitarians = ['unitarians', 'unitarian']
    var philos = [skeptics, atheists, humanists, free_thinkers, unitarians]
    var data = this.get('name') + ' ' + this.get('description')
    var tags = []
    
    philos.forEach(function(entry) {
      var inter = _.intersection(entry, data.split(' ').map(function(word) { return word.toLowerCase() }))
      if (inter.length) {
        tags.push(entry[0])
      }
    })

    return tags.length ? tags : ['secular']
  },

  sendOn: function(val) {
    window.open(val.currentTarget.attributes.href.value, '_blank')
  },

  activate: function() {
    hub.trigger('activateResult', this)
  }
})

var Groups = Backbone.Collection.extend({
  url: 'http://volary-eagle.herokuapp.com/groups',
  model: Group,
  initialize: function() {

    hub.on('search:groups', function(filters) {
      this.fetch({ data: filters })
    }, this)

    this.on('sync', function() {
      hub.trigger('search:done', this.models)
    }, this)
  },
})
