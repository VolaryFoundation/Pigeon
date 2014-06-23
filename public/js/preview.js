
var utils = require('./utils')

setTimeout(function() {
  var query = utils.params.deserialize(location.search.substr(1))
  var url = location.protocol + '//' + location.host + '/' + query.widget + '.html?' + location.search.substr(1)
  document.getElementById('preview').setAttribute('data-src', url)
  var loaderURL = location.protocol + '//' + location.host + "/js/widget_loader.js"
  document.getElementById('loader-script').src = loaderURL
}, 1000)

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
