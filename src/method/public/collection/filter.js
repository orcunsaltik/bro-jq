 import { _keys }    from '../../../var/private/window';
 import _isArrLike from '../object/isArrLike';
 
 export default (obj, cbck) => {

    const elms = [];

    let size;
    let i = 0;

    if (_isArrLike(obj)) {
        size = obj.length;
        for (; i < size; i += 1) {
            if (cbck(obj[i], i) === true) {
                elms.push(obj[i]);
            }
        }
    } else {
        const keys = _keys(obj);
              size = keys.length;
        for (; i < size; i += 1) {
            if (cbck(obj[keys[i]], keys[i]) === true) {
                elms.push(obj[keys[i]]);
            }
        }
    }

    return elms;
};
