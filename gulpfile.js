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

//sass
gulp.task('sass', function() {
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
			browsers: ['> 0%'],
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
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/templates/**/*.jade', ['jade']);
	gulp.watch('src/scripts/**/*.js', ['uglify']);
});