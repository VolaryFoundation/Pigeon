require('newrelic');
var http = require('http')
var PORT = process.env.PORT || 3001
var static = require('node-static');
var assetTypes = [ 'css', 'js', 'img', 'png' ]
var assets = new static.Server('./public', { cache: false })
var widgets = new static.Server('./widgets', { cache: false })
var lookingForAsset = function(req) {
  return assetTypes.filter(function(t) { return req.url.indexOf(t) > -1 }).length
}

http.createServer(function(req, res) {
  req.addListener('end', function () {
    if (lookingForAsset(req)) {
      assets.serve(req, res)
    } else {
      widgets.serve(req, res)
    }
  }).resume()
}).listen(PORT)
