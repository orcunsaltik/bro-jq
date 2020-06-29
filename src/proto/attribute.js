import { _keys } from '../var/private/window';
import _isStr from '../method/public/object/isStr';
import _isArr from '../method/public/object/isArr';
import Bro    from '../instance';

Bro.fn.extend({

    attr(prop, value) {

        const self = this;
        const [el] = self;
        const size = self.length;
        let attribute;
        let i = 0;

        if (value === undefined) {
            if (_isStr(prop)) {
                if (!el || (attribute = el.getAttribute(prop)) == null) {
                    attribute = undefined;
                } return attribute;
            } 
            for (; i < size; i += 1) {
                const keys = _keys(prop);
                const leng = keys.length;
                let j = 0;
                for (; j < leng; j += 1) {
                    self[i].setAttribute(keys[j], prop[keys[j]]);
                }
            }                
        } else {
            for (; i < size; i += 1) {
                self[i].setAttribute(prop, value);
            }
        }        

        return self;
    },

    prop(p, value) {

        const self = this;
        const size = self.length;
        let i = 0;

        if (value === undefined) {
            if (_isStr(p)) {
                return self[0][p];
            }
            for (; i < size; i += 1) {
                const keys = _keys(p);
                const leng = keys.length;
                let j = 0;
                for (; j < leng; j += 1) {
                    self[i][keys[j]] = p[keys[j]];
                }
            }
        } else {
            for (; i < size; i += 1) {
                self[i][p] = value;
            }
        }

        return self;
    },

    removeAttr(attr) {

        const self = this;
        const size = self.length;
        let i = 0;
        
        for (; i < size; i += 1) {
            self[i].removeAttribute(attr);
        }

        return self;
    },

    removeProp(prop) {

        const self = this;
        const size = self.length;
        let i = 0;
        
        for (; i < size; i += 1) {
            delete self[i][prop];
        }

        return self;
    },

    val(str) {
        
        const self = this;
        const [el] = self;
        
        if (typeof str !== 'undefined') {
            el.value = str;
        } else {
            return el.value;
        }

        return self;
    },

    attrs(prop, value, prefix, suffix, regex) {

        const self = this;        
        self.each((i, e) => {
            let
                v = _isArr(value) ? value[i] : value;
                v = typeof regex !== 'undefined' ? v.replace(regex, '') : v;
                v = (prefix || '') + v + (suffix || '');

            Bro(e).attr(prop, v);
        });

        return self;
    },

    getAttr(prop) {
        
        const attrs = [];        
        this.each((i, e) => attrs.push(Bro(e).attr(prop)));
        
        return attrs;
    }
});
