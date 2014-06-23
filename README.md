Pigeon (widgets)
================

Widget server for exposing data from API  

Systems being used: Node, Backbone, SASS, Rivets  

Setup:
------
*Clone the code base from git hub*  
    `git clone git@github.com:VolaryFoundation/Pigeon.git`  
    
*Load the node packages:*  
    `npm install`  

*Load the server*  
    `node app.js`  
    
*Notes:*  
The server default URL is: http://localhost:3000/  
There is an example page showing different widgets at /example.html  
The server is pulling from the live site API (Eagle). Internet connection required  


For Development
---------------
*Load SASS compiler watch function*  
    `sass --watch assets/widgets.scss:public/css/widgets.css`   

*Code Standards:*  
* strait html (no haml)  
* Strait javascript (No coffee script (Exception: Testing))  
* indent spacing (2 spaces)    


Testing
---------------

Unit Test: Mocha

Run test: npm test


##License

Pigeon is Copyright 2014 Volary Foundation and Contributors  

Pigeon is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Pigeon is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with Pigeon.  If not, see <http://www.gnu.org/licenses/>.
