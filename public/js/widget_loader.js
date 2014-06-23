(function(global) {
  
  function loadJS(file, cb) {
    var script = document.createElement('script')
    script.src = file
    script.addEventListener('load', cb)
    document.body.appendChild(script)
  }

  function loadCSS(file, cb) {
  }

  function createWidget(src) {
    var iframe = document.createElement('iframe')
    iframe.src = src
	var parser = document.createElement('a');
	parser.href = src;
	var data = parser.search.split("&");
    var result = {};
    for(var i=0; i<data.length; i++) {
      var item = data[i].split("=");
      result[item[0]] = item[1];
    }
    if (result.size != null) {
      var width = result.size.split('x')[0];
      var height = result.size.split('x')[1];
    } else {
      var width = 800;
      var height = 600;
    }
    iframe.setAttribute('style', "width: " + width + "px; height: " + height +"px")
    iframe.style.overflow = 'hidden'
    iframe.style.border = "1px solid #bbb"
    return iframe
  }

  function replacePlaceholder(placeholder, iframe) {
    placeholder.parentNode.replaceChild(iframe, placeholder)
    return iframe
  }

  var placeholders = [].slice.call(document.querySelectorAll('.volary-widget'))
  placeholders.forEach(function(placeholder) {
    var src = placeholder.getAttribute('data-src')
    replacePlaceholder(placeholder, createWidget(src))
  })

})(window)

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
