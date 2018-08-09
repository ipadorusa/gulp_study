const gulp = require('gulp'),
      sass = require('gulp-sass'),
      connect = require('gulp-connect'),
      sourcemaps = require('gulp-sourcemaps'),
      plumber = require('gulp-plumber'),
      autoprefixer = require('gulp-autoprefixer');


function cssStyle() {
    return gulp.src('./resources/assets/sass/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./public/src/css/'));
}

function htmlReload() {
    gulp.src('./public/src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./public/src/'))
        .pipe(connect.reload());
}

// gulp 서버
function connectServer() {
    connect.server({
        root: './public/src/',
        livereload: true,
        port: 8080
    })
}

function watch() {
    gulp.watch('./resources/assets/sass/*.scss',cssStyle);
    gulp.watch('./public/src/**/*.html', htmlReload); // sass 자동 컴파일
}

const build = gulp.parallel(connectServer, cssStyle, watch);

gulp.task(build);
gulp.task('default',build);


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
