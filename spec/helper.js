var jsdom = require('jsdom')
var jquery = require( 'jquery' )

global.window = jsdom().createWindow()
global.document = window.document
global.$ = global.jQuery = jquery( window )
