import Bro     from '../instance';
import _contains from '../method/public/dom/contains';
import _sort     from '../method/public/dom/sort';
import _isStr    from '../method/public/object/isStr';
import _reverse  from '../method/public/array/reverse';
import _unique   from '../method/public/array/unique';

Bro.fn.extend({

    children(selector) {

        const self = this;
        const size = self.length;
        const elms = [];

        let i = 0;
        for (; i < size; i += 1) {

            const elem = self[i].childNodes;
            const leng = elem.length;

            let j = 0;
            for (; j < leng; j += 1) {
                const el = elem[j];
                if (el.nodeType === 1) {
                    if (!selector || Bro(el).is(selector)) {
                        elms.push(el);
                    }
                }
            }
        }

        return self.make(_sort(_unique(elms)));
    },

    closest(selector, ctxt) {

        const elms = [];
        const self = this;
        const size = self.length;

        let i = 0;
        for (; i < size; i += 1) {
            
            let elem;
            
            if (!ctxt) {
                const clst = self[i].closest(selector);
                      elem = clst && [clst];
            } else {
                ctxt = ctxt.bro ? ctxt[0] : ctxt;
                elem = ctxt.querySelectorAll(selector);
            }
            
            const leng = elem.length;
            
            if (leng) {
                let j = 0;
                for (; j < leng; j += 1) {
                    elms.push(elem[j]);
                }
            }
        }

        return self.make(elms);
    },

    find(selector) {

        const self = this;
        const size = self.length;
        const elms = [];
        let i = 0;

        if (!_isStr(selector)) {
            return self.make(Bro(selector).filter(
                    () => {
                        for (; i < size; i += 1) {
                            return _contains(self[i], self);
                        } return false;
                    }
                ));
        }

        for (; i < size; i += 1) {

            const sall = self[i].querySelectorAll(selector);
            const leng = sall.length;           
            let j = 0;
            
            for (; j < leng; j += 1) {
                elms.push(sall[j]);
            }
        }

        return self.make(elms);
    },

    parent(selector) {

        const self = this;
        const size = self.length;
        const elms = [];
        
        let i = 0;
        for (; i < size; i += 1) {
            const root = self[i].parentNode;
            if (root !== null) {
                elms.push(
                    selector
                    ? Bro(root).is(selector) && root
                    : root
                );
            }
        }

        return self.make(_sort(_unique(elms)));
    },

    parents(selector) {

        const self = this;
        const size = self.length;
        const elms = [];
        
        let i = 0;
        for (; i < size; i += 1) {
            let elem = self[i].parentNode;
            while (elem) {
                if (elem.nodeType !== 9 && (!selector || Bro(elem).is(selector))) {
                    elms.push(elem);
                }   elem = elem.parentNode;
            }
        }

        return self.make(_sort(_unique(elms)));
    },

    prev(selector) {

        const self = this;
        const size = self.length;
        const prev = [];
        
        let i = 0;
        for (; i < size; i += 1) {
            const elem = self[i].previousElementSibling;            
            if (elem) {
                if (!selector || Bro(elem).is(selector)) {
                    prev.push(elem);
                }
            }
        }

        return self.make(_sort(_unique(prev)));
    },

    prevAll(selector) {

        const self = this;
        const size = self.length;
        const prev = [];
        
        let i = 0;
        for (; i < size; i += 1) {
                let elem = self[i];
            while ((elem = elem.previousElementSibling)) {
                if (!selector || Bro(elem).is(selector)) {
                    prev.push(elem);
                }
            }
        }

        return self.make(_sort(_unique(prev)));
    },

    next(selector) {
        
        const self = this;
        const size = self.length;
        const next = [];
        
        let i = 0;
        for (; i < size; i += 1) {
            const elem = self[i].nextElementSibling;
            if (elem) {
                if (!selector || Bro(elem).is(selector)) {
                    next.push(elem);
                }
            }
        }

        return self.make(_sort(_unique(next)));
    },

    nextAll(selector) {

        const self = this;
        const size = self.length;
        const next = [];
        
        let i = 0;
        for (; i < size; i += 1) {
                let elem = self[i];
            while ((elem = elem.nextElementSibling)) {
                if (!selector || Bro(elem).is(selector)) {
                    next.push(elem);
                }
            }
        }

        return self.make(_sort(_unique(next)));
    },

    siblings(selector) {

        const self = this;
        const size = self.length;
        let elms = [];
        let elem;
        
        let i = 0;
        for (; i < size; i += 1) {

            const prev = []; 
            const next = [];

            elem = self[i];
            while ((elem = elem.previousElementSibling)) {
                if (!selector || Bro(elem).is(selector)) {
                    prev.push(elem);
                }
            }

            elem = self[i];
            while ((elem = elem.nextElementSibling)) {
                if (!selector || Bro(elem).is(selector)) {
                    next.push(elem);
                }
            }

            elms = elms.concat(_reverse(prev).concat(next));
        }

        return self.make(_sort(_unique(elms)));
    }
});
