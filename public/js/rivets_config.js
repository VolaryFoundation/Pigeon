rivets.adapters[':'] = {
  subscribe: function(obj, keypath, callback) {
    obj.on('change:' + keypath, callback)
  },
  unsubscribe: function(obj, keypath, callback) {
    obj.off('change:' + keypath, callback)
  },
  read: function(obj, keypath) {
    return obj.get(keypath)
  },
  publish: function(obj, keypath, value) {
    obj.set(keypath, value)
  }
}

rivets.binders.map = function(el, mapModel) {
  mapModel.set('mb', L.mapbox.map(el, 'volary.gn97f0pd'))
  mapModel.bind()
}

rivets.binders.autoscroll = function(el, target) {
  if (!target) return
  var id = target.get('_id')
  var $target = $('#' + id)
  $(el).animate({ scrollTop: $target.offset().top })
}

rivets.formatters.eq = function(a, b) {
  return a == b
}

rivets.formatters.tagFinder = function(value) {
	if (value != null) {
		var possiblePhilosphies = ['skeptics', 'skeptic','humanists', 'humanist','atheist', 'atheists', 'unitarian', 'free thinker', 'free thinkers']
		var words = value.toLowerCase().split(" ")
		var array = _.uniq(words.filter(function(word) { 
			return _.contains(possiblePhilosphies, word) 
		}))
		if (array.length > 0) {
			return array[0].charAt(0).toUpperCase() + array[0].slice(1);
		}
		else {
			return "Secular"
		}
		
	}
	else {
		return "Secular"
	}
}

rivets.formatters.preventDefault = function(fn) {
  return function(e) {
    e.preventDefault()
    fn.apply(this, arguments)
  }
}

rivets.formatters.tagValue = function(raw, tagName) {
	var tagNameWithSpaces = tagName.replace(/_/g, ' ')
	return arrayOfTags = raw.filter(function(tag) {
		return tag.split('.')[0] === tagNameWithSpaces
	}).map(function(tag) {
		var parts = tag.split('.')
		return parts[parts.length - 1]
	})
}

rivets.formatters.htmlSafe = function(value, length) {
	if (value != null) {
		return value.text()
	}
	else {
		return value
	}
	
}

rivets.formatters.ellise = function(value, length) {
	if (value != null) {
		return value.substr(0, length) + "..."
	}
	else {
		return "No description avaliable"
	}
}

rivets.formatters.date = function(value){
  return moment(value).format('MMM DD, YYYY')
}

rivets.formatters.checkImg = function(value){
	if (value == null)
	  {
	  return "http://placehold.it/200x150.png";
	  }
	else
	  {
	  return value;
	  }
}

rivets.formatters.checkUrl = function(value){
	if (value == null)
	  {
	  return "http://meetup.com";
	  }
	else
	  {
	  return value;
	  }
}


rivets.formatters.addMemberText = function(value){
	if (value == 'No Membership'){
	 	return value;
	}
	else if (value == null){
		return ''
	}
	else {
	 	return value + " Members";
	}
}

rivets.formatters.asJSON = function(data) {
  return JSON.stringify(data)
}

rivets.formatters.paginate = function(data) {
  return JSON.stringify(data)
}

rivets.configure({
  handler: function(target, event, binding) {
    this.call(binding.model, event, target)
  }
})
