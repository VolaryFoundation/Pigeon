
var utils = require('./utils')

setTimeout(function() {
  var query = utils.params.deserialize(location.search.substr(1))
  var url = location.protocol + '//' + location.host + '/' + query.widget + '.html?' + location.search.substr(1)
  document.getElementById('preview').setAttribute('data-src', url)
  var loaderURL = location.protocol + '//' + location.host + "/js/widget_loader.js"
  document.getElementById('loader-script').src = loaderURL
}, 500)
