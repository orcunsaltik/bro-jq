export default (str) => str.replace(/([A-Z])/g, (i, e) => `-${e.toLowerCase()}`);
