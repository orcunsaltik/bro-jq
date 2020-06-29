export default (arr) => arr._sort((a, b) => (a === b 
    ? 0 : a.compareDocumentPosition(b) === 2 
    ? 1 : -1));
