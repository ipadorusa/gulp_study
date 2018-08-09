const gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

const paths = {
    styles: {
        src: './resources/assets/sass/',
        dest: './public/src/css/'
    },
    scripts: {
        src: './resources/assets/js/**/',
        dest: './public/src/js/'
    },
    htmls: {
        src: './public/src/'
    },
    root: {
        src: './public/src/'
    }
};

function scripts() {
    return gulp.src(`${paths.scripts.src}*.js`)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(`${paths.scripts.dest}`))
        .pipe(connect.reload());
}

function cssStyle() {
    return gulp.src(`${paths.styles.src}main.scss`)
        .pipe(plumber())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(`${paths.styles.dest}`))
        .pipe(connect.reload());
}

function htmlReload() {
    gulp.src(`${paths.htmls.src}**/*.html`)
        .pipe(plumber())
        .pipe(gulp.dest(`${paths.htmls.src}`))
        .pipe(connect.reload());
}

// gulp 서버
function connectServer() {
    connect.server({
        root: `${paths.root.src}`,
        livereload: true,
        port: 8080
    })
}

function watch() {
    gulp.watch(`${paths.styles.src}*.scss`, cssStyle);
    gulp.watch(`${paths.scripts.src}*.js`,  scripts);
    gulp.watch(`${paths.htmls.src}**/*.html`, htmlReload);
}

const build = gulp.parallel(connectServer, cssStyle, scripts, watch);

gulp.task(build);
gulp.task('default',build);
