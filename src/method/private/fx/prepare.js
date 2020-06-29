import { 
    gcs, isNaN, _keys, Num, parseFloat 
} from '../../../var/private/window';
import { transform } from '../../../var/public/style';
import rgbToArray from '../../public/fx/color/rgbToArray';
import hexToRgb   from '../../public/fx/color/hexToRgb';
import _isArr     from '../../public/object/isArr';
import _dashCase  from '../../public/string/dashCase';
import _aniext    from './extension';
import _animatrix from './matrix';
import Fx         from '../../../var/private/fx';

export default (elem, props, easing, specialEasing, fin) => {

    const e = {};                       // ?
    const o = {};                       // old
    const n = [];                       // new
    const c = gcs(elem, null);          // css
    const s = elem.style;               // style
    const v = c.display !== 'none';     // visibility
    let f = false;                      // final
    
    if (props.padding) {
        _aniext(props, Fx.p);
    }
    
    if (props.margin) {
        _aniext(props, Fx.m);
    }
      
    const kProps = _keys(props);
    const sProps = kProps.length;
    let i = 0;
    let j = 0;
    
    for (;j < sProps; j += 1) {
        
        const p = kProps[j];
        
        n[i]    = [];
        o[p]    = !fin || !fin[p] ? c[p] : fin[p];
        n[i][0] = _dashCase(p);
        easing  = specialEasing ? specialEasing[p] : easing;
        
        let O = o[p];     // old property
        let N = props[p]; // new property
        
        if (p === 'transform') {
            
            n[i][0] = _dashCase(transform);
            n[i][1] = 8;
            
            const m = _animatrix(elem, O, N);
            
            [n[i][3], e[n[i][0]]] = m;
            
        } else if (p.toLowerCase().indexOf('color') > -1 || p === 'background') {
            
            e[n[i][0]] = N;
            N = hexToRgb(N) || rgbToArray(N);
            
            if (O === 'transparent' || O === 'rgba(0, 0, 0, 0)') {
                
                n[i][1] = 4;
                n[i][3] = N[0];
                n[i][4] = N[1];
                n[i][5] = N[2];
                n[i][6] = !isNaN(N[3]) ? N[3] : 1;
                
            } else {
                
                O = rgbToArray(O);
                
                n[i][1] = 2;
                n[i][3] = O[0]; 
                n[i][4] = O[1];
                n[i][5] = O[2];
                n[i][6] = N[0]; 
                n[i][7] = N[1];
                n[i][8] = N[2];
                
                if (!isNaN(O[3]) || !isNaN(N[3])) {
                    
                    O[3] = !isNaN(O[3]) ? O[3] : 1;
                    N[3] = !isNaN(N[3]) ? N[3] : O[3];
                    n[i][1]  = 3;
                    n[i][9]  = N[3];
                    n[i][10] = N[3];
                }
            }
        } else {
            
            if (_isArr(N)) {
                easing = N[1] ? N[1] : easing;
                N = N[0];
            }
            
            if (!f && (p === 'width' || p === 'height')) {
                e.overflow = s.overflow;
                s.overflow = 'hidden';
                f = true;
            }

            let Oa = [];
            let Na = [];
            let VO;
            let VN;
            let UO;
            let UN;
            let operator;
            let sign;
            
            switch (N) {

                case 'show':
                case 'hide':
                case 'toggle':

                    if (N === 'hide' || v) {
                        Oa = (`${O}`).match(/^([-\d.]+)([a-z%]*)$/);
                        if (N === 'show') {
                            VN = Num(Oa[1]);
                        } else {
                            if (Oa == null) { Oa = []; Oa[1] = ''; }
                            e.display = 'none';
                            VN = 0;
                        }
                    } else {
                         s.display = 'block';
                             Oa[1] = 0;
                             Oa[2] = c[p].match(/[a-z%]*$/)[0];
                                VN = c[p].replace(Oa[2], '');
                        s[n[i][0]] = 0;
                    }

                    VO = Num(Oa[1]);
                    UO = Oa[2];
                    UN = UO;

                    e[n[i][0]] = '';
                    break;

                default:

                    Oa = (`${O}`).match(/^([-\d.]+)([a-z%]*)$/);
                    Na = (`${N}`).match(/^(([+-]=)?[-\d.]+)([a-z%]*)$/);

                    if (Oa == null) { Oa = []; Oa[1] = ''; }
                    if (Na == null) { Na = []; Na[1] = ''; }

                    VO = Num(Oa[1]);

                    if (undefined !== Na[2]) {
                        operator = Na[2];
                        sign = operator[0];
                        VN = VO + Num(sign + Na[1].replace(operator, ''));
                    } else {
                        VN = Na[1];
                    }

                    UO = Oa[2];
                    UN = Na[3] ? Na[3] : UO;

                    if (UO !== UN) {
                        const Ov = s[p];
                        s[p] = VN + UN;
                        const Nv = c[p];
                        s[p] = Ov;
                        VO /= parseFloat(Nv, 10) / VN;
                    }

                    e[n[i][0]] = VN + UN;
            }
            
            n[i][1] = VN > VO ? 0 : 1;
            n[i][2] = easing;
            n[i][3] = VO;
            n[i][4] = VN;
            n[i][5] = UN;
        }
        
        i += 1;
    }
    
    return [n, e];
};
