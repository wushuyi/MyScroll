/**
 * Created by shuyi.wu on 2015/4/1.
 */
'use strict';
var gulp = require('gulp');
var webpack = require('gulp-webpack');
gulp.task('webpack', function() {
    return gulp.src('src/index.js')
        .pipe(webpack({
            output:{
                filename: 'build.js'
            },
            module:{
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
                ]
            }
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev', function() {
    return gulp.src('src/index.js')
        .pipe(webpack({
            watch: true,
            output:{
                filename: 'build.js'
            },
            module:{
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
                ]
            }
        }))
        .pipe(gulp.dest('dist/'));
});