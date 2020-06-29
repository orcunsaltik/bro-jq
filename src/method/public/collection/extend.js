import { _keys } from '../../../var/private/window';
import _isArr from '../object/isArr';
import _isFn  from '../object/isFn';
import _isObj from '../object/isObj';

export default function _extend() {

    const args = arguments;
    const size = args.length;
    
    let root = args[0] || {};    
    let deep = false;
    let rsrc;
    let clon;
    let coia;
    let copy;
    let prop;
    let opts;
    let i = 1;

    if (typeof root === 'boolean') {
        deep = root;
        root = args[i] || {};
        i += 1;
    }

    if (typeof root !== 'object' && !_isFn(root)) {
        root = {};
    }

    if (i === size) {
        root = this;
        i -= 1;
    }

    for (; i < size; i += 1) {
        if ((opts = args[i]) != null) {
            
            const keys = _keys(opts);
            const leng = keys.length;
            let j = 0;
            
            for (; j < leng; j += 1) {
                
                prop = keys[j];                
                rsrc = root[prop];
                copy = opts[prop];
                
                if (root === copy) {
                    continue;
                }
                
                if (deep && copy && (_isObj(copy) || (coia = _isArr(copy)))) {
                    if (coia) {
                        coia = false;
                        clon = rsrc && _isArr(rsrc) ? rsrc : [];
                    } else {
                        clon = rsrc && _isObj(rsrc) ? rsrc : {};
                    }
                    root[prop] = _extend(deep, clon, copy);
                } else if (copy !== undefined) {
                    root[prop] = copy;
                }
            }
        }
    }

    return root;
}
