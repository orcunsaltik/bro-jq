import _isStr from '../../public/object/isStr';

export default (obj, prop) => {
    
    const f = obj[prop];
    const s = _isStr(f);
    const p = s ? f.split(' ') : f;
    const l = p.length;
    const m = { 
            padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
             margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']
    }[prop];
    
    let i = 0;
    
    if (s) {
        if (l < 2) {
            for (; i < 4; i += 1) {
                [obj[m[i]]] = p;
            }
        } else {
            for (; i < l; i += 1) {
                obj[m[i]] = p[i];
            }
        }
    } else {
        for (; i < 4; i += 1) {
            obj[m[i]] = f;
        }
    }
    
    delete obj[prop];
};
