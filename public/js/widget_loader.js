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
    return iframe
  }

  function replacePlaceholder(placeholder, iframe) {
    placeholder.parentNode.replaceChild(iframe, placeholder)
    return iframe
  }

  var placeholders = [].slice.call(document.querySelectorAll('.volary-widget'))
  placeholders.forEach(function(placeholder) {
    var src = location.protocol + "//" + location.host + placeholder.getAttribute('data-src')
    replacePlaceholder(placeholder, createWidget(src))
  })

})(window)
