const gulp   = require('gulp'); 

module.exports = async () => gulp.watch(['./src/*.js', './src/**/*.js'], gulp.series('build'));
