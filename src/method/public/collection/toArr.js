import { _keys } from '../../../var/private/window';

export default (obj) => {

    if (!obj) {
        return [];
    }

    let _arr = [];
    let size = obj.length;
    let i = 0;

    if (!size) {
        const keys = _keys(obj);
              size = keys.length;
              _arr = Array(size);
        for (; i < size; i += 1) {
            _arr[i] = obj[keys[i]];
        }
    } else {
        _arr = Array(size);
        for (; i < size; i += 1) {
            _arr[i] = obj[i];
        }
    }
    
    return _arr;
};
