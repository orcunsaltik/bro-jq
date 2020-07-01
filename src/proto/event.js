import window from '../var/private/root';
import {
 animation, transition, animationDuration, transitionDuration, animationEnd, transitionEnd 
} from '../var/public/style';
import { doc, parseFloat, _keys } from '../var/private/window';
import _each      from '../method/public/collection/each';
import _isArrLike from '../method/public/object/isArrLike';
import _isBool    from '../method/public/object/isBool';
import _isEmpty   from '../method/public/object/isEmpty';
import _isFn      from '../method/public/object/isFn';
import _isStr     from '../method/public/object/isStr';
import _isObj     from '../method/public/object/isObj';
import _contains  from '../method/public/dom/contains';
import _data      from '../method/public/data/data';
import addEvents  from '../method/private/event/addEvents';
import Bro        from '../instance';
import U          from '../var/private/unique';

Bro.fn.extend({

    on() {

        const self = this;
        const size = self.length;
        const args = arguments;
        const leng = args.length;

        let delegateTarget;
        let eventData;
        let listener;
        let capture;

        const [eventType] = args;

        if (leng === 2) {
            [, listener] = args;
        } else if (_isBool(args[leng - 1])) {
            capture = args[leng - 1];
            listener = args[leng - 2];
        } else {
            [,, eventData] = args;
            listener = args[leng - 1];
            if (_isStr(args[1])) {
                [, delegateTarget] = args;
            } else {
                [, eventData] = args;
            }
        }

        const eventsForFix = {
              mouseenter: 'mouseover',
              mouseleave: 'mouseout',
            pointerenter: 'pointerover',
            pointerleave: 'pointerout'
        };

        const eventDelegatedHandler = function eventDelegatedHandler(e) {

            const target  =        e.target || this.target;
            const current = e.currentTarget || this.currentTarget;
            const related = e.relatedTarget;
            const matches = this.delegateTargets;
            const matleng = matches.length;

            let matched  = false;
            let delegate = null;
                   let i = 0;

            if (!matleng) { return; }

            if (this.fixed) {
                for (; i < matleng; i += 1) {
                    if (
                            _contains(matches[i], target)
                        && !_contains(matches[i], related)
                    ) {
                         matched = true;
                        delegate = matches[i];
                        break;
                    }
                }
            } else {
                for (; i < matleng; i += 1) {
                    if (_contains(matches[i], target)) {
                         matched = true;
                        delegate = matches[i];
                        break;
                    }
                }
            }

            if (!matched) { return; }

            eventData = eventData || e.detail;
            eventData = _isArrLike(eventData) || _isObj(eventData)
                        ? eventData
                        : undefined;

            const event = addEvents(e);

            event.type           = this.type;
            event.currentTarget  = current;
            event.delegateTarget = delegate || target;
            event.bro            = this.id;
            event.data           = eventData;
            event.listener       = listener;
            event.proxyListener  = eventDelegatedHandler;
            event.capture        = !!capture;

            listener.call(delegate || target, event);
        };

        const eventHandler = function eventHandler(e) {

            const target     =        e.target || this.target;
            const currTarget = e.currentTarget || this.currentTarget;

            eventData = eventData || e.detail;
            eventData = _isArrLike(eventData) || _isObj(eventData)
                        ? eventData
                        : undefined;

            const event = addEvents(e);

            event.target        = target;
            event.currentTarget = currTarget;
            event.bro           = this.id;
            event.data          = eventData;
            event.listener      = listener;
            event.proxyListener = eventHandler;
            event.capture       = !!capture;

            listener.call(currTarget, event);
        };

        const events = eventType.split(' ');
        const evsize = events.length;

        let i = 0;
        for (; i < evsize; i += 1) {

            const event  = events[i].split('.');
            const [type] = event;

            if (!type) { continue; }

            event.shift();

            U.evId += 1;

            const ns = event.join('.') || 'bro';
            const id = U.evId;
            const handler = {
                    id,
                    ns
                };

            let fixed = type;
            let j = 0;
            for (; j < size; j += 1) {

                const elem = self[j];
                  let data = _data(elem, 'Events');
                  let proxyListener;

                handler.currentTarget = elem;
                handler.target        = elem;
                handler.type          = type;

                if (delegateTarget) {
                    if ((fixed = eventsForFix[type])) {
                        handler.fixed = true;
                    } else {
                        fixed = type;
                    }
                    handler.delegateTargets = Bro(elem).find(delegateTarget);
                    proxyListener = eventDelegatedHandler.bind(handler);
                } else {
                    proxyListener = eventHandler.bind(handler);
                }

                data               = !data           ? {} : data;
                data[type]         = !data[type]     ? {} : data[type];
                data[type][ns]     = !data[type][ns] ? {} : data[type][ns];
                data[type][ns][id] = {
                             type,
                            fixed,
                         listener,
                    proxyListener,
                          capture: !!capture,
                             data: eventData
                };

                _data(elem, 'Events', data);

                elem.addEventListener(
                    fixed,
                    proxyListener,
                    !!capture
                );
            }
        }

        return self;
    },

    off(events, handler) {

        const remove = (elem, data, type, name) => {

            const keys = _keys(data[type]);
            const size = keys.length;

            let j;
            let i = 0;
            for (; i < size; i += 1) {

                const ns = keys[i];
                const dn = data[type][ns];

                if (
                       name === ''
                    || name === ns
                    || ns.indexOf(`${name}.`) === 0
                ) {

                    const idK = _keys(dn);
                    const idS = idK.length;

                    j = 0;
                    for (; j < idS; j += 1) {

                        const id = idK[j];
                        const ev = dn[id];

                        if (!ev || (handler && handler !== ev.listener)) {
                            continue;
                        }

                        elem.removeEventListener(
                                ev.fixed,
                                ev.proxyListener,
                                ev.capture
                        );

                        delete data[type][ns][id];
                    }

                    if (_isEmpty(dn)) {
                        delete data[type][ns];
                    }
                }
            }
        };
        
        const self = this;
        const size = self.length;        
        const e = {
            type: [],
            name: []
        };

        let event;
        let type;
        let name;
        let keys;
        let leng;
        let keyl;
        let i;
        let j;
        let k;
        let z;

        if (_isStr(events)) {

            events = events.split(' ');
              leng = events.length;

            i = 0;
            for (; i < leng; i += 1) {

                event = events[i].split('.');
                type  = event[0]; event.shift();
                name  = event.join('.');

                if (!type && !name) {
                    continue;
                }

                e.type.push(type);
                e.name.push(name);

                e.length = i + 1;
            }
        }

        i = 0;
        for (; i < size; i += 1) {

            const elem = self[i];
            const data = _data(elem, 'Events');

            if (!data) {
                continue;
            }

            leng = e.length;

            if (leng) {

                j = 0;
                for (; j < leng; j += 1) {

                    type = e.type[j];
                    name = e.name[j];

                    if (type === '') {

                        keys = _keys(data);
                        keyl = keys.length;

                        k = 0;
                        for (; k < keyl; k += 1) {
                            remove(elem, data, keys[k], name);
                        }

                    } else {
                        remove(elem, data, type, name);
                    }
                }

                _data(elem, 'Events', data);

            } else {

                keys = _keys(data);
                leng = keys.length;

                j = 0;
                for (; j < leng; j += 1) {

                    const typ = data[keys[j]];
                    const nsK = _keys(typ);
                    const nsS = nsK.length;

                    k = 0;
                    for (; k < nsS; k += 1) {

                        const ns  = typ[nsK[k]];
                        const idK = _keys(ns);
                        const idS = idK.length;

                        z = 0;
                        for (; z < idS; z += 1) {

                            event = ns[idK[z]];

                            if (event) {
                                elem.removeEventListener(
                                    event.fixed,
                                    event.proxyListener,
                                    event.capture
                                );
                            }
                        }
                    }
                }

                _data(elem, 'Events', {});
            }
        }

        return this;
    },

    trigger(events, eventsData) {

        if (!events || !_isStr(events)) {
            return false;
        }

        events = events.split(' ');

        const self = this;
        const size = self.length;
        const leng = events.length;
        let i = 0;

        for (; i < size; i += 1) {

            const elem = self[i];

            if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                continue;
            }

            const data = _data(elem, 'Events');
            let j = 0;

            for (; j < leng; j += 1) {

                const event  = events[j].split('.');
                const [type] = event; event.shift();

                if (!type) {
                    continue;
                }

                const name = event.join('.');
                let customEvent;

                try {
                    customEvent = new window.CustomEvent(type, {
                            detail: eventsData,
                           bubbles: true,
                        cancelable: true
                    });
                } catch (e) {
                    customEvent = doc.createEvent('Event');
                    customEvent.initEvent(type, true, true);
                    customEvent.detail = eventsData;
                }

                if (data) {

                    const keys = _keys(data[type]);
                    const typS = keys.length;
                    let k = 0;

                    for (; k < typS; k += 1) {

                        const ns = keys[k];
                        const dn = data[type][ns];

                        if (name === '' || name === ns) {

                            const idK = _keys(dn);
                            const idS = idK.length;
                            let z = 0;

                            for (; z < idS; z += 1) {
                                if (dn[idK[z]]) {
                                    elem.dispatchEvent(customEvent);
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    elem.dispatchEvent(customEvent);
                }
            }
        }

        return self;
    },

    hasEvent(event) {

        let has = false;

        if (_isStr(event) && event !== '') {

            const Events = this.data('Events');

            if (undefined !== Events) {

                const events = event.split('.');
                     [event] = events; events.shift();

                const ns = events.join('.');
                has = Events[event];
                has = _isObj(ns !== '' ? event[ns] : event);
            }
        }

        return has;
    },

    hasAnimating() {
        return parseFloat(this.style(animationDuration) || '0') > 0;
    },

    hasTransitioning() {
        return parseFloat(this.style(transitionDuration) || '0') > 0;
    },

    ready(cbck) {

        if (doc.readyState === 'complete') {

            Bro.isReady = true;

            return _isFn(cbck)
                ? cbck.call(this)
                : false;
        }

        const handler = function handler() {

            Bro.isReady = true;

            doc.removeEventListener(
                'DOMContentLoaded',
                handler,
                false
            );

            cbck.call(this, Bro);
        };

        return doc.addEventListener(
            'DOMContentLoaded',
            handler,
            false
        );
    }
});

_each([
    ['onAnimationEnd',   animation,  animationDuration, animationEnd],
    ['onTransitionEnd', transition, transitionDuration, transitionEnd]
],

(index, css) => {

        const [name, Prop, Duration, End] = css;
        const end = function end(event) {

            event.stopPropagation();

            const self = this;
            const { target, data } = event;
            const { cbck, duration, prop } = data;
            const elem = self;
            const $elm = Bro(self);
            const time = parseFloat(event.elapsedTime).toPrecision(3);
            const oepn = event.originalEvent.propertyName;

            if ((self === target && time >= duration) || prop === oepn) {
                $elm.off(End, end);
                cbck.call($elm, event, elem);
            }
        };
        
        Bro.fn[name] = function _(cbck, prop) {

            const self = this;
            const size = self.length;

            let i = 0;
            for (; i < size; i += 1) {

                const elem = self[i];
                const $elm = Bro(elem);
                const dura = $elm.style(Duration);

                if (!Prop || !dura) {
                    cbck.call($elm, elem);
                    continue;
                }

                const durations = dura.split(',');
                const duraleng  = durations.length;
                let duration = 0;

                let j = 0;
                for (; j < duraleng; j += 1) {
                    const d = durations[j].replace(/s|\s/g, '');
                    duration = d > duration ? d : duration;
                }

                if (duration === 0) {
                    cbck.call($elm, elem);
                    continue;
                }

                $elm.on(End, { cbck, duration, prop }, end);
            }

            return self;
        };
    });

_each(['blur', 'focus', 'change'], (index, name) => {
    Bro.fn[name] = function _(data, cbck) {
        const self = this;
        if (!arguments.length) {
            self.trigger(name);
        } else if (typeof cbck === 'undefined') {
            self.on(name, data);
        } else {
            self.on(name, data, cbck);
        }
        return self;
    };
});
