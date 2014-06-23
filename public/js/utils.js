var Backbone = require('backbone')
var _ = require('lodash')
var $ = require('jquery')

var utils = {

  bindArrayToCollection: function(obj, key, arr) {
    obj.set(key, [])
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

    deserialize: function(p) {

      var params = {};
      var pairs = p.split('&');
      for (var i=0; i<pairs.length; i++) {
          var pair = pairs[i].split('=');
          var accessors = [];
          var name = decodeURIComponent(pair[0]), value = decodeURIComponent(pair[1]);
          if (value === 'undefined') continue;

          var name = name.replace(/\[([^\]]*)\]/g, function(k, acc) { accessors.push(acc); return ""; });
          accessors.unshift(name);
          var o = params;

          for (var j=0; j<accessors.length-1; j++) {
              var acc = accessors[j];
              var nextAcc = accessors[j+1];
              if (!o[acc]) {
                  if ((nextAcc == "") || (/^[0-9]+$/.test(nextAcc)))
                      o[acc] = [];
                  else
                      o[acc] = {};
              }
              o = o[acc];
          }
          acc = accessors[accessors.length-1];
          if (acc == "")
              o.push(value);
          else
              o[acc] = value;
      }
      return params;
    }
  }
}

module.exports = utils

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
