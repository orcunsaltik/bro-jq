const gulp = require('gulp');
const gAmd = require('./lib/task/js/amd.js');
const gEsm = require('./lib/task/js/esm.js');
const gDev = require('./lib/task/js/dev.js');
const gPro = require('./lib/task/js/pro.js');
const gDel = require('./lib/task/js/del.js');
const gEye = require('./lib/task/js/eye.js');

gulp.task('clean:dev', async () => gDel('dev'));
gulp.task('clean:pro', async () => gDel('pro'));
gulp.task('clean:amd', async () => gDel('amd'));
gulp.task('clean:esm', async () => gDel('esm'));

gulp.task('build:amd', gAmd);
gulp.task('build:dev', gDev);
gulp.task('build:esm', gEsm);
gulp.task('build:pro', gPro);
gulp.task('build',     gulp.series('build:dev', 'build:pro', 'build:amd', 'build:esm'));
gulp.task('clean',     gulp.series('clean:dev', 'clean:pro', 'clean:amd', 'clean:esm'));
gulp.task('watch',     gEye);
