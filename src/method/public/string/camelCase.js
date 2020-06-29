export default (str) => str.replace(/^-ms-/, 'ms-').replace(/-([a-z])/g, (i, e) => e.toUpperCase());
