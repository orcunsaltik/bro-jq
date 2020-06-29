export default (obj, add) => {
    const s = +add.length;
    let i = obj.length;
    let j = 0;
    for (; j < s; i += 1, j += 1) {
        obj[i] = add[j];
    }
    obj.length = i;
    return obj;
};
