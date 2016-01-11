var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');

//del removed or renamed files
var delDest;
gulp.task('del', function(cb) {
	return del(delDest, cb);
});

//sass
gulp.task('sass', function() {
	delDest = 'dist/css';
	return gulp.src('src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(csso())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//browserSync
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
	});
});
//jade
gulp.task('jade', function() {
	delDest = 'dist/*.html';
	return gulp.src('src/templates/**/!(_)*.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//scripts
gulp.task('uglify', function() {
	delDest = 'dist/js/*.js';
	return gulp.src('src/scripts/**/*.js')
		.pipe(plumber())
		.pipe(gulp.dest('dist/js'))
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['browserSync', 'sass', 'jade', 'uglify'], function() {
	gulp.watch('src/scss/**/*.scss', ['del', 'sass']);
	gulp.watch('src/templates/**/*.jade', ['del', 'jade']);
	gulp.watch('src/scripts/**/*.js', ['del', 'uglify']);
});