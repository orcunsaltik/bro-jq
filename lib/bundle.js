const gulp    = require('gulp');
const gulpif  = require('gulp-if');
const terser  = require('gulp-terser');
const babel   = require('gulp-babel');
const map     = require('gulp-sourcemaps');
const gru2    = require('gulp-rollup-2');
const config  = require('./config/index.js');

module.exports = async (cfg, format, minify) => new Promise(async (resolve) => {

        format = format || 'dev';
        minify = minify || format === 'pro';

        const conf   = cfg || config;
        const file   = conf.files[format];
        const rollup = conf.rollup;
        const enable = conf.enable;
        const destin = conf.dest[format];
        
        rollup.cache         = enable.cache;
        rollup.output.file   = file;
        rollup.output.format = format === 'pro' || format === 'dev'
                                ? 'umd' : format === 'esm'
                                ? 'es'  : format;

        return (await gru2.src(rollup))
            .pipe(gulpif(enable.browserify, babel(conf.babel)))
            .pipe(gulpif(enable.sourcemap, map.init(conf.map.init)))
            .pipe(gulpif(minify, terser(conf.terser)))
            .pipe(gulpif(enable.sourcemap, map.write(conf.map.dest)))
            .pipe(gulp.dest(destin))
            .on('end', resolve);
});
