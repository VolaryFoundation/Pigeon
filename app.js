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

//=========================================================================//
// This file is part of Pigeon.                                            //
//                                                                         //
// Pigeon is Copyright 2014 Volary Foundation and Contributors             //
//                                                                         //
// Pigeon is free software: you can redistribute it and/or modify it       //
// under the terms of the GNU Affero General Public License as published   //
// by the Free Software Foundation, either version 3 of the License, or    //
// at your option) any later version.                                      //
//                                                                         //
// Pigeon is distributed in the hope that it will be useful, but           //
// WITHOUT ANY WARRANTY; without even the implied warranty of              //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU       //
// Affero General Public License for more details.                         //
//                                                                         //
// You should have received a copy of the GNU Affero General Public        //
// License along with Pigeon.  If not, see                                 //
// <http://www.gnu.org/licenses/>.                                         //
//=========================================================================//
