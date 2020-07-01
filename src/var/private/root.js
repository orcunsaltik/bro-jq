
const self   = self;
const global = global;
const window = !!self && self.self === self 
        ? self : !!global && global.global === global
        ? global : new Function('return this')() || {};

export default window;

