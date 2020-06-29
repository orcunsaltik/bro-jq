import { _keys } from '../../../var/private/window';
import _isStr    from '../object/isStr';
import _isArr    from '../object/isArr';
import _type     from '../object/type';

export default (obj, contentType) => {

    if (obj === null || _isStr(obj) || _type(obj) === 'FormData') {
         return obj;
    }

    if (_isArr(obj) || (contentType && /application\/json/i.test(contentType))) {
        return JSON.stringify(obj);
    }

    const enco = [];
    const keys = _keys(obj);
    const size = keys.length;

    let i = 0;
    for (; i < size; i += 1) {
        const v = obj[keys[i]];
        enco.push(`${encodeURIComponent(v)}=${encodeURIComponent(v)}`);
    }

    return enco.join('&').replace(/%20/g, '+');
};
