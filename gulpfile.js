const gulp = require('gulp'),
      sass = require('gulp-sass'),
      connect = require('gulp-connect'),
      sourcemaps = require('gulp-sourcemaps'),
      uglifycss = require('gulp-uglifycss');



gulp.task('sass', function(){
    return gulp.src('./resources/assets/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({
            "uglyComments": true,
            "expandVars": true
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./public/src/css/'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./resources/assets/sass/*.scss', ['sass']);
});

gulp.task('html', function () {
    gulp.src('./public/src/*.html')
        .pipe(gulp.dest('./public/src/'))
        .pipe(connect.reload());
  });

// gulp 서버
gulp.task('connect',function(){
    connect.server({
        root: './public/src/',
        livereload: true,
        port: 8080
    })
});

gulp.task('watch', function(){
    gulp.watch(['./resources/assets/sass/*.scss'],['sass']);
    gulp.watch(['./public/src/**/*.html'], ['html']); // sass 자동 컴파일
});

gulp.task('default',['connect', 'sass', 'watch']);
