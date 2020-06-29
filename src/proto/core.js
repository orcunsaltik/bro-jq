import { _slice, _indexOf, _keys } from '../var/private/window';
import { version }       from '../../package.json';
import addEventListeners from '../method/private/event/addEventListeners';
import _data             from '../method/public/data/data';
import _isElem           from '../method/public/object/isElem';
import _textHtml         from '../method/public/dom/textHtml';
import _isArrLike        from '../method/public/object/isArrLike';
import _isStr            from '../method/public/object/isStr';
import _extend           from '../method/public/collection/extend';
import _merge            from '../method/public/collection/merge';
import _toArr            from '../method/public/collection/toArr';
import Bro               from '../instance';

Bro.prototype = {

    bro: version,

    constructor: Bro,

    length: 0,

    toArray() { return _toArr(this); },

    make(elem) {

        if (!_isArrLike(elem)) {
            elem = [elem];
        }

        const instance = _merge(this.constructor(), elem);

        instance.prevObject = this;

        return instance;
    },

    parseHtml(obj) {

        const self = this;
        const size = self.length;

        let i = 0;
        for (; i < size; i += 1) {

            const elem = self[i];
            const keys = _keys(obj);
            const leng = keys.length;
            let j = 0;

            for (; j < leng; j += 1) {

                const prop = keys[j];
                const ctxt = obj[prop];

                if (prop === 'text' || prop === 'html') {
                    elem.appendChild(_textHtml(ctxt));
                }

                elem.setAttribute(prop, ctxt);
            }
        }

        return obj;
    },

    get(n) {

        const self = this;
        const size = self.length;

        if (n == null) {
            return  _slice.call(self);
        }

        const i = n < 0
                ? n + size
                : n;

        return self[i];
    },

    index(node) {

        const self = this;
        const [el] = self;
        let i;

        if (!node) {
            i = el && el.parentNode
            ? self.eq(0).prevAll().length
            : -1;
        } else if (_isStr(node)) {
            i = _indexOf.call(Bro(node), el);
        } else {
            i = _indexOf.call(this, node.bro ? node[0] : node);
        }

        return i;
    },

    clone(withData, deep) {
        
        const clonedata = (e, c) => {
            const childrenElem = e.childNodes;
            const childrenCopy = c.childNodes;
            const size = childrenElem.length;
            let i = 0;
            let j;
            for (; i < size; i += 1) {
                if (childrenElem[i].nodeType === 1) {
                    const childElem = childrenElem[i];
                    const childCopy = childrenCopy[i];
                    const childData = _data(childElem);
                    if (childData) {
                        const keys = _keys(childData);
                        const leng = keys.length;
                        j = 0;
                        for (; j < leng; j += 1) {
                            _data(childCopy, keys[j], childData[keys[j]]);
                        }
                        const events = _data(childCopy, 'Events');
                        if (events) {
                            addEventListeners(childCopy, events);
                        }
                    }
                    clonedata(childElem, childCopy);
                }
            }
        };

        const self = this;
        const size = self.length;
        const clonedNodes = [];
        
        let i = 0; 
        let j;
        for (; i < size; i += 1) {
            const elem = self[i];
            if (_isElem(elem)) {
                const cloned = elem.cloneNode(true);
                if (withData) {
                    const elData = _data(elem);
                    if (elData) {
                        const keys = _keys(elData);
                        const leng = keys.length;
                        j = 0;
                        for (; j < leng; j += 1) {
                            _data(cloned, keys[j], elData[keys[j]]);
                        }
                        const events = _data(cloned, 'Events');
                        if (events) { addEventListeners(cloned, events); }
                    }
                    if (deep) {
                        clonedata(elem, cloned);
                    }
                } clonedNodes.push(cloned);
            }
        } return self.make(clonedNodes);
    },

    each(cbck) {

        const self = this;
        const size = self.length;

        let i = 0;
        for (; i < size; i += 1) {
            if (cbck.call(self[i], i, self[i]) === false) {
                break;
            }
        }
        
        return self;
    },
    
    size: function size() {      
        return this.length;
    },
    
    extend: _extend
};

Bro.fn = Bro.prototype;
