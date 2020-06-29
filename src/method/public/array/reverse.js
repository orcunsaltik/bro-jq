export default (obj) => {
    const s = obj.length;
    let k;
    let j = s - 1;
    let i = 0;
    for (; i < s / 2; i += 1, j -= 1) {
        k = obj[i];
        obj[i] = obj[j];
        obj[j] = k;
    } return obj;
};
