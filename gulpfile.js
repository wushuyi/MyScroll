/**
 * Created by shuyi.wu on 2015/4/1.
 */
'use strict';
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    webpack = require('gulp-webpack');


gulp.task('compileES6', function () {
    return gulp.src('src/test.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
                ]
            }
        }))
        .pipe(rename('easyScroll.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-compileES6', function () {
    return gulp.src('src/test.js')
        .pipe(webpack({
            watch: true,
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
                ]
            }
        }))
        .pipe(rename('easyScroll.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('min', ['compileES6'], function () {
    return gulp.src('./dist/easyScroll.js')
        .pipe(uglify())
        .pipe(rename('easyScroll.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function (cb) {
    del('./dist/*', cb);
});

gulp.task('default', ['clean', 'min']);