import dataType  from './dataType';
import _dashCase from '../string/dashCase';
import Cache     from '../../../var/private/cache';

export default (elem, key, val) => {
        
    if (!elem) {
        return false;
    }

    if (key && val === undefined) {
        if (Cache.has(elem)) {
            val = Cache.get(elem)[key];
            if (val == null && elem.nodeType === 1) {
                val = dataType(elem.getAttribute(`data-${_dashCase(key)}`));
            }
        } return val;
    }

    if (!Cache.has(elem)) {
        Cache.set(elem, {});
    }

    const data = Cache.get(elem);

    if (!key) {
        return data;
    }

    data[key] = dataType(val);
    Cache.set(elem, data);

    return data;
};
