import { transform } from '../../../var/public/style';
import { gcs, Num }  from '../../../var/private/window';
import _isStr        from '../../public/object/isStr';
import _anifire      from './fire';

export default (el, o, props) => {

    if (_isStr(o) && (o === 'none' || o === '')) {
        o = 'matrix(1, 0, 0, 1, 0, 0)';
    }

    el.style[transform] = props;
    const n = gcs(el, null)[transform];
    el.style[transform] = o;

    const ov = o.split('(')[1].split(')')[0].split(',');
    const nv = n.split('(')[1].split(')')[0].split(',');
    const size = ov.length;
    const a = [];

    let i = 0;
    for (; i < size; i += 1) {

        const b = Num(ov[i]);
        const c = Num(nv[i]);

        let j;
        if (b === c) {
            j = 7;
        } else if (b > c) {
            j = 6;
        } else {
            j = 5;
        }

        a[i]    = [];
        a[i][0] = _anifire[j];
        a[i][1] = b;
        a[i][2] = c;
    }
    return [a, n];
};
