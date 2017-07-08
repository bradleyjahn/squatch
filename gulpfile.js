var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var input = './assets/scss/**/*.scss';
var output = './src/css';

var jsFiles = 'assets/js/**/*.js',
    jsDest = './src/js';


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


gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('squatch.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('squatch.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
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

gulp.task('default', ['sass', 'watch', 'scripts'/*, possible other tasks... */]);

gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
});