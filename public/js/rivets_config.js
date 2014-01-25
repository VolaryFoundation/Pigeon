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

rivets.formatters.toJSON = function(val) {
  return JSON.stringify(val)
}

rivets.binders.map = function(el, mapModel) {
  mapModel.set('mb', L.mapbox.map(el, 'volary.gn97f0pd'))
  mapModel.bind()
}

rivets.binders.autoscroll = function(el, target) {
  if (!target) return
  var id = target.get('_id')
  $('#' + id).scrollintoview()
}

rivets.formatters.toUpperCase = function(val) {
  if (val) return val.toUpperCase();
}

rivets.formatters.eq = function(a, b) {
  return a == b
}

rivets.formatters.selectFirst = function(val) {
	return val[0];
}

rivets.formatters.selectNumber = function(val, number) {
	return val[0];
}

rivets.formatters.selectNumber = function(val, number) {
	return val[0];
}

rivets.formatters.toURLString = function(val) {
	if (typeof val != 'undefined') return utils.params.serialize(val)
}

rivets.binders.autohighlight = function(el, showing) {
  if (showing) {
    el.focus()
    el.select()
  }
}

rivets.formatters.count = function(val) {
  if (!val || !val.length) return 0
  return val.length;
}

rivets.formatters.toMockingBird = function(id) {
  return "http://volary-mockingbird.herokuapp.com/groups/" + id
}

rivets.formatters.capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

rivets.formatters.asList = function(arr, cap) {
  cap = cap || Infinity
  var leftover = false
  if (!arr) return ''

  var list = arr.reduce(function(memo, item) {
    var next = item + ', '
    if (memo.length + next.length < cap) return memo + item + ', '
    else if (cap < Infinity && !leftover) {
      leftover = true
      return memo.replace(/, $/, '...')
    }
    return memo
  }, '')

  return list.replace(/, $/, (leftover ? '...' : ''))
}

rivets.formatters.humanize = function(val) {
	return val.charAt(0).toUpperCase() + val.slice(1);
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
