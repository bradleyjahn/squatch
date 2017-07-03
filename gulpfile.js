var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

var input = './assets/scss/**/*.scss';
var output = './assets/css';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};


gulp.task('sass', function () {
    return gulp
    // Find all `.scss` files from the `stylesheets/` folder
        .src(input)
        // Run Sass on those files
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(output));
});

gulp.task('sassdoc', function () {
    return gulp
        .src(input)
        .pipe(sassdoc())
        .resume();
});

gulp.task('watch', function() {
    return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
        .watch(input, ['sass'])
        // When there is a change,
        // log a message in the console
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);

gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
});