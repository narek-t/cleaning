var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
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
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
	});
});
gulp.task('jade', function() {
	return gulp.src('src/templates/**/*.jade')
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('watch', ['browserSync', 'sass', 'jade'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/templates/**/*.jade', ['jade']);
});
