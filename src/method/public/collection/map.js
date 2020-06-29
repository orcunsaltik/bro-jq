import { _keys } from '../../../var/private/window';
import _isArrLike from '../object/isArrLike';

export default (obj, cbck, args) => {

    const elms = [];

    let size;
    let i = 0;
    let v;

    if (_isArrLike(obj)) {
        size = obj.length;
        for (; i < size; i += 1) {
            v = cbck(obj[i], i, args);
            if (v != null) {
                elms.push(v);
            }
        }
    } else {
        const keys = _keys(obj);
              size = keys.length;
        for (; i < size; i += 1) {
                v = cbck(obj[keys[i]], keys[i], args);
            if (v != null) {
                elms.push(v);
            }
        }
    }

    return elms;
};
