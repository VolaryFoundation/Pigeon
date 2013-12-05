var http = require('http')
var url = require('url')
var fs = require('fs')
var PORT = process.env.PORT || 3000

function extractFileName(url) { return url.substr(1) }

function ok(res, data) { 
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(data)
}

function doh(res, data) { 
  res.writeHead(500, { 'Content-Type': 'text/html' })
  res.end(data)
}

function handleRequest(req, res) {

  var fileName = extractFileName(req.url)
  var handleFile = function(err, data) {
    (data) ? ok(res, data) : doh(res, err)
  }

  fs.readFile('./widgets/' + fileName + '.html', handleFile)
}

http
  .createServer(handleRequest)
  .listen(PORT)
