import { _keys, Num, caf } from '../var/private/window';
import _data       from '../method/public/data/data';
import _removeData from '../method/public/data/removeData';
import _noop       from '../method/public/function/noop';
import _each       from '../method/public/collection/each';
import _isEmpty    from '../method/public/object/isEmpty';
import _isFn       from '../method/public/object/isFn';
import _isObj      from '../method/public/object/isObj';
import _aniprep    from '../method/private/fx/prepare';
import _animate    from '../method/private/fx/animate';
import Bro         from '../instance';
import Fx          from '../var/private/fx';
import U           from '../var/private/unique';

Bro.fn.extend({

    animate() {

        const self = this;
        const args = arguments;
        const leng = args.length;

        let specialEasing;
        let complete;
        let duration;
        let easing;
        let step;
        let opts;
        let { queue } = Fx;
        let i = 0;

        const [props] = args;

        switch (leng) {
            case 2:
                if (_isFn(args[1])) {
                    [, complete] = args;
                } else if (_isObj(args[1])) {
                    [, opts] = args;
                } else {
                    [, duration] = args;
                }
                break;
            case 3:
                if (_isFn(args[2])) {
                    [, duration, complete] = args;
                } else {
                    [, duration, easing] = args;
                }
                break;
            case 4:
                [, duration, easing, complete] = args;
                break;

            // no default
        }

        if (undefined === duration) {
            ({ duration } = Fx);
        }

        if (undefined === easing) {
            ({ easing } = Fx);
        }

        if (undefined === complete) {
            complete = _noop;
        }

        if (opts) {
                    queue = opts.queue    || queue;
                 duration = opts.duration || duration;
                   easing = opts.easing   || easing;
            specialEasing = opts.specialEasing;
                     step = opts.step;
                 complete = opts.complete;
        }

        U.fxId += 1;

        for (; i < self.length; i += 1) {

            const elem  = self[i];
            const qId   = U.fxId + i;
            const data  = _data(elem, 'fxQd');
            const delay = _data(elem, 'fxDelay') || 0;

            let QD = {
                        props,
                     duration,
                       easing,
                specialEasing,
                         step,
                     complete,
                        delay
            };

            _data(elem, 'fxDelay', 0);

            QD.qId = qId;

            if (!data) {
                const
                    datA = {};
                    datA[qId] = QD;
                                QD = datA;
            } else {
                data[qId] = QD;
                       QD = data;
            }

            if (!queue || !data) {

                const prep = _aniprep(elem, props, easing, specialEasing);

                                [, QD[qId].fin] = prep;
                _data(elem, 'fxQd', QD);

                _animate(elem, qId, prep[0], prep[1], duration, step, complete);
            }

            _data(elem, 'fxAn', true);
            _data(elem, 'fxQd', QD);
        }

        return self;
    },

    stop(clearQueue, jumpToEnd) {

        const self = this;
        const [el] = self;
        const data = _data(el, 'fxQd');

        let fin;

        if (data) {

            let key = _keys(data)[0];
                fin = data[key].fin;

            if (!fin) {
                return false;
            }

            caf(data[key].raf);

            if (jumpToEnd) {

                const keys = _keys(fin);
                const size = keys.length;
                let i = 0;

                for (; i < size; i += 1) {
                    el.style[keys[i]] = fin[keys[i]];
                }
            }

            delete data[key];

            if (_isEmpty(data) || clearQueue) {
                _removeData(el, 'fxAn');
                _removeData(el, 'fxQd');
            } else {

                _data(el, 'fxQd', data);
                _data(el, 'fxAn', true);

                    key = _keys(data)[0];
                const q = data[key];
                const p = _aniprep(
                    el,
                    q.props,
                    q.easing,
                    q.specialEasing,
                    fin
                );

                _animate(
                    el,
                    q.qId,
                    p[0],
                    p[1],
                    q.duration,
                    q.step,
                    q.complete
                );
            }
        }

        return self;
    },

    delay(time) {

        const self = this;
        const delay = self.data('fxDelay') || 0;
                      self.data('fxDelay', delay + time);
        return self;
    },

    queue(cbck) {

        U.fxId += 1;

        const self  = this;
        const size  = self.length;
        const data  = self.data('fxQd');
        const delay = self.data('fxDelay') || 0;

        let QD = {
            fn: cbck,
            delay
        };

        self.data('fxDelay', 0);

        let i = 0;
        for (; i < size; i += 1) {

            const elem = self[i];
            const qId  = U.fxId + i;

            QD.qId = qId;

            if (!data) {

                const datB      = {};
                      datB[qId] = QD;
                             QD = datB;

                _data(elem, 'fxQd', QD);
                _animate(elem, qId, QD);

            } else {

                data[qId] = QD;
                            QD = data;
                _data(elem, 'fxQd', QD);
            }
        }

        return self;
    },

    dequeue() {

        const self = this;
        const size = self.length;
        const fxQd = self.data('fxQd');

        if (fxQd) {

            const k = Num(_keys(fxQd)[0]);

            let elem;
            let q = fxQd[k];
            let i = 0;

            if (q) {
                if (q.fn) {
                    for (; i < size; i += 1) {
                        elem = self[i];
                        _animate(elem, k + i);
                    }
                } else {
                    for (; i < size; i += 1) {

                              elem = self[i];
                        const  qId = k + i;
                                 q = fxQd[qId];
                        const prep = _aniprep(elem, q.props, q.easing, q.specialEasing);

                        [, q.fin] = prep;

                        _data(elem, 'fxQd', fxQd);

                        _animate(
                            elem,
                            qId,
                            prep[0],
                            prep[1],
                            q.duration,
                            q.step,
                            q.complete
                        );
                    }
                }
            }
        }

        return self;
    },

    clearQueue() {

        this.removeData('fxQd');
        this.removeData('fxAn');

        return this;
    },

    finish() {

        const self = this;
        const size = self.length;
        const fxQd = self.data('fxQd');

        if (fxQd) {

            const k = Num(_keys(fxQd)[0]);
            const q = fxQd[k];

            if (q) {

                let i = 0;
                for (; i < size; i += 1) {

                    const elem = self[i];
                    const data = _data(elem, 'fxQd');
                    const next = data[k + i];
                    const { fn }  = next;
                    const { fin } = next;

                    if (fn) {
                        fn.call(elem);
                    } else {

                        const kf = _keys(fin);
                        const sf = kf.length;
                        let j = 0;

                        for (; j < sf; j += 1) {
                            const fk = kf[j];
                            elem.style[fk] = next.fin[fk];
                        }
                    }
                }
            }

            self.removeData('fxQd');
            self.removeData('fxAn');
        }
    },

    fadeTo() {

        const self = this;
        const args = arguments;
        const [a, b, c, d] = args;

        return  self.animate({ opacity: b }, a, c, d);
    }
});

_each([
    'fadeIn',
    'fadeOut',
    'fadeToggle',
    'slideDown',
    'slideUp',
    'slideToggle',
    'show',
    'hide',
    'toggle'
], (i, name) => {

    const j = i % 3 ? i % 3 : 0;
    let k = 0;
    if (i > 5) {
        k = 2;
    } else if (i > 2) {
        k = 1;
    }

    (function (obj) {
        Bro.fn[name] = function () {

            const self = this;
            const size = self.length;
            const args = arguments;
            const [a, b, c] = args;
            let elem;

            let z = 0;
            for (; z < size; z += 1) {
                elem = Bro(self[z]);
                if (_isObj(a)) {
                    elem.animate(obj, a);
                } else {
                    elem.animate(obj, a, b, c);
                }
            }
        };
    }(((obj, value) => {
        const keys = _keys(obj);
        const size = keys.length;
        let l = 0;
        for (; l < size; l += 1) {
            obj[keys[l]] = value;
        } return obj;
    })([
        {
            opacity: ''
        },
        {
            height: '',
            margin: '',
            padding: '',
            opacity: ''
        },
        {
            height: '',
            margin: '',
            padding: '',
            opacity: '',
            width: ''
        }
    ][k], ['show', 'hide', 'toggle'][j])));
});
