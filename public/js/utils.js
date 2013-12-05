(function(global) {

var utils = {

  bindArrayToCollection: function(obj, key, arr) {
    obj[key] = new Backbone.Collection(arr)
    obj[key].on('change', function() {
      this.set(key, this[key].filter(function(t) { return t.get('active') }).map(function(t) { return t.get('name') }))
    }, obj)
    obj.on('change', function() {
      this[key].each(function(type) {
        if (_.contains(this.get(key), type.get('name'))) type.set('active', true, { silent: true })
      }, this)
    }, obj)
  },

  setParam: function(url, key, val) {
    if (url.indexOf(key + '=') > -1) {
      return url.replace(new RegExp('(' + key + '=)(.*)'), "$1" + val)
    } else {
      return url + '&' + key + '=' + val
    }
  },

  addHashValue: function(obj, key, newKey, val) {
    var clone = _.clone(obj)
    if (clone[key]) {
      clone[key][newKey] = val
    } else {
      var o = {}
      o[newKey] = val
      clone[key] = o
    }
    return clone
  },

  addArrayValue: function(hash, key, val) {
    var clone = _.clone(hash)
    if (!clone[key]) clone[key] = []
    clone[key].push(val)
    return clone
  },

  params: {

    serialize: function(obj) {
      return $.param(obj)
    },

    deserialize: function(str) {

      return str.split('&').reduce(function(memo, param) {

        var parts = param.split('=')
        var key = decodeURIComponent(parts[0])
        var value = parts[1] ? decodeURIComponent(parts[1]) : undefined
        var hashMatch = key.match(/\[(\w+)\]/)

        if (hashMatch) {
          return utils.addHashValue(memo, key.split('[')[0], hashMatch[1], value)
        } else if (key.match(/\[\]/)) {
          return utils.addArrayValue(memo, key.split('[')[0], value)
        } else if (key && value) {
          memo[key] = value
          return memo
        } else {
          return memo
        }
      }, {})
    }
  }
}

global.utils = utils

})(global || this)
