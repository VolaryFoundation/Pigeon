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

  window.onmessage = function(e) {
    var cloner = createWidget('http://localhost:3000/builder.html?' + e.data)
    cloner.setAttribute('style', "z-index:100; position: absolute; left: 50%; top: 50%; width: 600px; height: 300px; margin-top: -150px; margin-left: -300px;")
    var backdrop = document.createElement('div')
    backdrop.setAttribute('style', "z-index: 99; position:absolute;left:0;right:0;top:0;bottom:0;opacity:.4;background:#000;")
    document.body.appendChild(backdrop)
    document.body.appendChild(cloner)
  }

})(window)
