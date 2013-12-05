var http = require('http')
var url = require('url')
var fs = require('fs')

function extractFileName(url) { return url.substr(1) }

http.createServer(function(req, res) {
  var fileName = extractFileName(req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  fs.readFile('./widgets/' + fileName + '.html', function(err, data) {
    res.end(data)
  })
}).listen(3000)
