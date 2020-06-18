//Initialize Modules
const {src,dest,watch,series,parallel}= require('gulp');
const autoprefixer= require('autoprefixer');
const cssnano= require('cssnano');
const concat= require('gulp-concat');
const postcss= require('gulp-postcss');
const replace= require('gulp-replace');
const sass= require('gulp-sass');
const sourcemaps= require('gulp-sourcemaps');
const uglify= require('gulp-uglify');
var browserify = require('browserify');
//File path variables
const files={
    scssPath:'app/scss/**/*.scss',
    jsPath:'app/js/**/*.js'
}

//Sass tasks
function sassTask(){
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

//JS tasks
function jsTask(){
    return src(files.jsPath)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist'))
}

//Cachebursting
const cbstring=new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
    .pipe(replace(/cb=\d+/g,'cb='+ cbstring)) 
    .pipe(dest('.'))
}


//watch tasks
function watchTask(){
    watch([files.scssPath,files.jsPath],
        parallel(sassTask,jsTask))
}

//Default task
exports.default=series(parallel(sassTask,jsTask),cacheBustTask,watchTask)