import { _keys, sto, raf } from '../../../var/private/window';

import easing      from '../../../var/public/easing';
import _data       from '../../public/data/data';
import _removeData from '../../public/data/removeData';
import _noop       from '../../public/function/noop';
import _isFn       from '../../public/object/isFn';
import _isEmpty    from '../../public/object/isEmpty';
import _anifire    from './fire';
import _aniprep    from './prepare';

export default function _animate(elem, qId, props, fin, duration, step, complete) {
    
    const fxQd      = _data(elem, 'fxQd');
    const { fn }    = fxQd[qId];
    const { delay } = fxQd[qId];
       
    if (!fn) {
        
        let rate;
        let prop;
        let strt;
        let prog;
        
        const size  = props.length;
        const styl  = elem.style;
        const frame = (time) => {
            
            if (!strt) {
                strt = time;
            }

            prog = time - strt;
            rate = prog / duration;

            step.call(elem, rate, props);

            let i = 0;
            for (; i < size; i += 1) {
                prop = props[i];
                styl[prop[0]] = _anifire[prop[1]](
                    easing[prop[2]](rate),
                    prop[3], prop[4], prop[5], prop[6],
                    prop[7], prop[8], prop[9], prop[10]
                );
            }

            if (duration > prog) {
                fxQd[qId].raf = raf(frame);
                _data(elem, 'fxQd', fxQd);
            } else {
                
                const finK = _keys(fin);
                const finS = finK.length;
                let j = 0;

                for (; j < finS; j += 1) {
                    styl[finK[j]] = fin[finK[j]];
                }

                if (_isFn(complete)) {
                    complete.call(elem);
                }

                delete fxQd[qId];
                
                const k = _keys(fxQd)[0];
                const next = fxQd[k];

                if (!next) {
                    _removeData(elem, 'fxAn');
                    _removeData(elem, 'fxQd');
                } else if (next.fn) {
                    _animate(elem, next.qId);
                } else {
                    
                    const prep = _aniprep(
                        elem, 
                        next.props,
                        next.easing,
                        next.specialEasing,
                        fin
                    );
            
                    [, fxQd[k].fin] = prep;
                    _data(elem, 'fxQd', fxQd);
                    
                    _animate(
                        elem, 
                        next.qId, 
                        prep[0],
                        prep[1],
                        next.duration,
                        next.step,
                        next.complete
                    );
                }
            }
        };
        
        step = step || _noop;
        sto(() => {
            fxQd[qId].raf = raf(frame);
            _data(elem, 'fxQd', fxQd);
        }, delay);
        
    } else {
        sto(() => {
            fn.call(elem);
            delete fxQd[qId];
            if (_isEmpty(fxQd)) {
                _removeData(elem, 'fxQd');
            } else {
                _data(elem, 'fxQd', fxQd);
            }
        }, delay);
    }
}
