export default (obj, cbck) => {

    const size = obj.length;
    let found;

    let i = 0;
    for (; i < size; i += 1) {
        if (cbck(obj[i], i) === true) {
            found = obj[i];
            break;
        }
    }

    return found;
};
