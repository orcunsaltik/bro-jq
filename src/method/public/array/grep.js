 export default (obj, cbck, invert) => {
    
    invert = !!invert;

    const elms = [];
    const size = obj.length;
           
    let i = 0;
    for (; i < size; i += 1) {
        const cb = !!cbck.call(obj[i], obj[i], i);
        if (cb !== invert) {
            elms.push(obj[i]);
        }
    }

    return elms;
};
