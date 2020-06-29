import { _keys }  from '../../../var/private/window';
import _isArrLike from '../object/isArrLike';

export default (obj, cbck) => {

    let size;
    let i = 0;

    if (_isArrLike(obj)) {
        size = obj.length;
        for (; i < size; i += 1) {
            if (cbck.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        const keys = _keys(obj);
        size = keys.length;
        for (; i < size; i += 1) {
            if (cbck.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
                break;
            }
        }
    }

    return obj;
};
