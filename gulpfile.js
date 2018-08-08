const gulp = require('gulp'),
      sass = require('gulp-sass'),
      connect = require('gulp-connect'),
      sourcemaps = require('gulp-sourcemaps'),
      uglifycss = require('gulp-uglifycss'),
      plumber = require('gulp-plumber'),
      autoprefixer = require('gulp-autoprefixer');
      //inquirer = require('inquirer');


const errorHandler = function (error) {
    console.error(error.message);
    this.emit('end');
};

const plumberOption = {
    errorHandler: errorHandler
}

gulp.task('sass', function(){
    return gulp.src('./resources/assets/sass/main.scss')
        .pipe(plumber(plumberOption))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(uglifycss({
        //     "uglyComments": true,
        //     "expandVars": true
        // }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./public/src/css/'));
});

gulp.task('sass:watch', function(){
    gulp.watch('./resources/assets/sass/*.scss', ['sass']);
});

gulp.task('html', function () {
    gulp.src('./public/src/*.html')
        .pipe(plumber(plumberOption))
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
// gulp.task('default', function (done) {
// 	inquirer.prompt([
// 		{
// 			type: 'list',
// 			name: 'task',
// 			message: '어떤 작업을 수행하시겠습니까?',
// 			choices: [
// 				{ name: 'JavaScript 빌드', value: 'connect' },
// 				{ name: 'CSS 빌드', value: 'sass' },
// 				{ name: 'HTML 빌드', value: 'minifyhtml' },
// 				new inquirer.Separator(),
// 				{ name: '전체 빌드', value: 'build' }
// 			]
// 		}
// 	]).then(function (answers) {
// 		runSequence(answers.task, done);
// 	});
// });
