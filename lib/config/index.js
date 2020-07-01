const padZero  = function (date) { return (`0${date + 1}`).slice(-2); };
const date     = new Date();
const hour     = date.getHours();
const minute   = date.getMinutes();
const day      = padZero(date.getDate());
const month    = padZero(date.getMonth());
const year     = date.getFullYear();
const resolve  = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const json     = require('@rollup/plugin-json');
const {
    version, description, email,
    homepage, license, author
} = require('../../package.json');

const config = {
        src: './src/app.js',
       name: 'Bro',
       dest: {
            pro: "dist",
            amd: "dist/amd",
            dev: "dist/umd",
            esm: "dist/esm"          
       },
    version,
     files: {
        dev: 'bro.js',
        pro: 'bro.min.js',
        amd: 'bro.amd.js',
        esm: 'bro.esm.js'
    },
    enable: {
            minify: true,
         sourcemap: true,
        browserify: true,
             cache: true
    },
    terser: { ecma: 5 },
       map: { init: { loadMaps: true }, dest: '.' },
     babel: {  
            retainLines: true,
                presets: [['@babel/preset-env', { 
                           modules: false,
                           loose: true
                       }]]
            },
    banner: `
/**
 * Bro
 * ${description}
 * @version   ${version}
 * @date      ${month}/${day}/${year}, ${hour}:${minute}
 * @link      ${homepage}
 * @license   ${license}.
 * @author    ${author}
 * @copyright 2018-${year} ${author}
 */\n`
};

const rollup = {
       input: config.src,
     plugins: [resolve(), commonjs(), json()],
      output: {
             name: config.name,
          interop: false,
        sourcemap: true,
              amd: { 
                  id: 'Bro'
              },
        noConflict: true,
            banner: config.banner
    }
};

config.rollup  = rollup;
module.exports = config;
