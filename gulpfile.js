var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
var sass = require('gulp-ruby-sass');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var livereload = require('gulp-livereload');
var cache = require('gulp-cache');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');



/**
 * Sass / CSS
**/
gulp.task('clean:css', function() {
	return del([
		'web/a/css'
	]);
});

gulp.task('sass', [ 'clean:css' ], function() {
	return sass('assets/scss/main.scss')
		.pipe( autoprefixer( {
			browsers: ['last 2 version']
		} ) )
		.on('error', sass.logError)
		.pipe( rename( { basename: 'main' } ) )
		.pipe( gulp.dest('web/a/css/') );
});

gulp.task('nanocss', [ 'sass' ], function() {
	gulp.src('web/a/css/main.css')
		.pipe( nano() )
		.pipe( gulp.dest('web/a/css/') );
});

gulp.task('css', [  ], function() {
	livereload.listen();
	gulp.watch( 'assets/scss/**/*.scss', [ 'sass' ] );
});



/**
 * JavaScript
**/
gulp.task('clean:js', function() {
	return del([
		'web/a/js'
	]);
});

gulp.task('webpack', [ 'clean:js' ], function( uglify ) {
	return gulp.src('assets/js/**/*')
		.pipe(webpack( require('./configs/webpack.config.js') ))
		.pipe(gulp.dest('web/a/js/'));
});


// These are the bundles of tasks we require for development
gulp.task('js', [ 'webpack' ], function() {
	gulp.watch( [ 'assets/js/**/*' ], [ 'webpack' ] );
});

gulp.task( 'dev', [ 'css', 'js' ] );

gulp.task( 'deploy', [ 'nanocss', 'uglifyjs', 'svg', 'images' ] );


gulp.task('default', function() {
	console.log('\n\n No Default Task set up, try either: \n * gulp dev \n * gulp css \n * gulp js \n * gulp img \n\n');
});
