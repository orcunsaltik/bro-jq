const del = require('del');
const sep = require('path').sep;
const cfg = require('../../config/index.js');

module.exports = async (format) => del(`${cfg.dest[format]}${sep}*`);
