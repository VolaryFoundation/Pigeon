Pigeon (widgets)
================

Widget server for exposing data from API

Systems being used: Node, Backbone, SASS, Rivets

Setup:
------
*Clone the code base from git hub*
    git clone git@github.com:VolaryFoundation/Pigeon.git
    
*Load the node bundles:*
    npm install

*Load the server*
    node app.js
    
*Notes:*
The server default URL is: http://localhost:3000/
There is an example page showing different widgets at /example.html



For Development
---------------
*Load SASS compiler watch function*
    sass --watch assets/widgets.scss:public/css/widgets.css 

*Code Standards:*
* strait html (no haml)
* Strait javascript (No coffee script (Exception: Testing))
* indent spacing (2 spaces)