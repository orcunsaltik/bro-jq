export default (str) => /^-?(?:(?=\.)\.\d+|(?:(?:[1-9]\d*)|0)(?:\.(?=\d+)\d+)?)$/.test(str);
