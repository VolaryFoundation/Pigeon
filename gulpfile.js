var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var exec = require('child_process').exec

gulp.task('buildJS', function() {

 gulp.src('public/js/groups_map.js')
   .pipe(browserify())
   .pipe(gulp.dest('public/js/build'))

 gulp.src('public/js/builder.js')
   .pipe(browserify({
     insertGlobals : true,
     debug : !gulp.env.production
   }))
   .pipe(gulp.dest('public/js/build'))

 gulp.src('public/js/preview.js')
   .pipe(browserify({
     insertGlobals : true,
     debug : !gulp.env.production
   }))
   .pipe(gulp.dest('public/js/build'))
})

gulp.task('test', function(){
  exec('NODE_ENV=test mocha spec --colors --recursive --compilers coffee:coffee-script --reporter spec', function(e, stdout, stderr) {
    gutil.log(stdout, stderr) 
  })
});

gulp.task('dev', function() {
  gulp.watch([ 'public/js/**/*.js', '!public/js/build/*.js' ], [ 'buildJS' ])
})


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
