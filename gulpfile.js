var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var exec = require('child_process').exec

gulp.task('buildJS', function() {

 gulp.src('public/js/groups_map.js')
   .pipe(browserify({
     insertGlobals : true,
     debug : !gulp.env.production
   }))
   .pipe(gulp.dest('public/js/build'))

 gulp.src('public/js/builder.js')
   .pipe(browserify({
     insertGlobals : true,
     debug : !gulp.env.production
   }))
   .pipe(gulp.dest('public/js/build'))
})

gulp.task('test', function(){
  gulp.run('buildJS')
  exec('NODE_ENV=test mocha spec --colors --recursive --compilers coffee:coffee-script --reporter spec', function(e, stdout, stderr) {
    gutil.log(stdout, stderr) 
  })
  
});

gulp.task('dev', function() {
  gulp.watch('public/js/**/*.js', function(ev){
    gulp.run('buildJS')
  });
})
