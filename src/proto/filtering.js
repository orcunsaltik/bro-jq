import window    from 'window';
import { doc, _slice } from '../var/private/window';
import Bro       from '../instance';
import _contains from '../method/public/dom/contains';
import _isElem   from '../method/public/object/isElem';
import _nodeName from '../method/public/dom/nodeName';
import _sort     from '../method/public/dom/sort';
import _isStr    from '../method/public/object/isStr';
import _isArr    from '../method/public/object/isArr';
import _isFn     from '../method/public/object/isFn';
import _unique   from '../method/public/array/unique';
import _diff     from '../method/public/array/diff';

Bro.fn.extend({

    map(cbck) {

        const self = this;
        const size = self.length;
        const elms = [];
        
        let i = 0;
        for (; i < size; i += 1) {
            const item = self[i];
            const elem = cbck.call(item, i, item);
            if (elem != null) {
                elms.push(elem);
            }
        }

        return self.make(elms);
    },

    filter(cbck) {

        const self = this;
        const size = self.length;
        const elms = [];
        let item;
        
        let i = 0;
        if (_isFn(cbck)) {
            for (; i < size; i += 1) {
                item = self[i];
                if (cbck.call(item, i, item)) {
                    elms.push(item);
                }
            }
        } else {
            for (; i < size; i += 1) {
                item = self[i];
                if (Bro(item).is(cbck)) {
                    elms.push(item);
                }
            }
        }

        return self.make(_unique(elms));
    },

    eq(i) {

        const self = this;
        const size = self.length;
        
        let j = +i + (i < 0 ? size : 0);
        j = j >= 0 && j < size  ? [self[j]] : [];

        return self.make(j);
    },

    first() {
        return this.eq(0);
    },

    last() {
        return this.eq(-1);
    },

    has(selector) {

        const elms = Bro(selector, this);
        const size = elms.length;
        
        let i = 0;
        return elms.filter((j, e) => {
            for (; i < size; i += 1) {
                if (_contains(e, elms[i])) {
                    return true;
                }
            }  return false;
        });
    },

    is(selector) {

        const self = this;
        const [el] = self;
        const size = self.length;
        let i = 0;

        if (_isStr(selector)) {
            return el && el.matches(selector);
        }

        if (selector === window) {
            return el === window;
        }

        if (selector === doc) {
            return el === doc;
        }

        if (selector.nodeType || selector.bro) {

            selector = selector.nodeType
                ? [selector]
                : selector;

            const j = selector.length;           
            for (; i < j; i += 1) {
                if (selector[i] === el) {
                    return true;
                }
            } return false;
        }

        if (_isFn(selector)) {
            for (; i < size; i += 1) {
                if (selector.call(this, i, el[i])) {
                    return true;
                }
            } return false;
        }

        return false;
    },

    not(selector) {

        const self = this;
        const size = self.length;
          let item;
          let elms = [];
          let i = 0;

        if (_isStr(selector)) {
            for (; i < size; i += 1) {
                item = self[i];
                if (!item.matches(selector)) {
                    elms.push(item);
                }
            }
        } else if (_isFn(selector)) {
            for (; i < size; i += 1) {
                item = self[i];
                selector.call(item, i, item);
            } return self;
        } else {
            if (selector.nodeType) {
                selector = [selector];
            } else if (selector.bro) {
                selector = selector.toArray();
            }
            if (_isArr(selector)) {
                elms = _diff(self.toArray(), selector);
            }
        }

        return self.make(_sort(_unique(elms)));
    },

    slice: function slice() {
        return this.make(_slice.apply(this, arguments));
    },

    contains(selector) {
        
        const self = this;
        const [el] = self;
           let has = false;

        if (_isElem(el)) {
            if (selector.bro) {
                selector = selector[0];
            } else if (_isStr(selector)) {
                selector = Bro(selector, Bro(el))[0];
            }
            if (_isElem(selector)) {
                has = el.contains(selector);
            }
        }

        return has;
    },

    isIn(selector) {
        
        const self = this;
        const [nc] = self;
        const elem = Bro(selector);
        const [np] = elem;
        
        return _isElem(np) && _isElem(nc) && np.contains(nc);
    },

    exists() {
        return !!this.length;
    },

    nodeName: function nodeName(name) {
       const self = this;
       const [el] = self;
       return el && _nodeName(el, name);
    }
});
