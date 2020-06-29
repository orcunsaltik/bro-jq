import { gcs, _keys }   from '../var/private/window';
import _isStr     from '../method/public/object/isStr';
import _camelCase from '../method/public/string/camelCase';
import _dashCase  from '../method/public/string/dashCase';
import Bro        from '../instance';

let uiId =  0;

Bro.fn.extend({

    style(prop) {
        
        const self = this;
        const [el] = self; 
        return gcs(el, null)[_camelCase(prop)];
    },

    styles() {
        
        const self = this;
        const [el] = self;  
        return el ? gcs(el, null) : {};
    },
    
/* eslint-disable no-unused-expressions */
    cssUpdate(prop) {
        
        const self = this;
        const [el] = self;
        
        if (el) {
            el[prop ? _camelCase(prop) : 'offsetHeight'];
        } 
        
        return self;
    },
/* eslint-enable no-unused-expressions */

    css(props, value) {

        const self = this;
        const size = self.length;
        let i = 0;

        if (_isStr(props)) {
            if (value != null) {
                for (; i < size; i += 1) {
                    self[i].style[props] = value;
                }
            } else {
                return self.style(props);
            }
        } else {          
            for (; i < size; i += 1) {
                
                const keys = _keys(props);
                const leng = keys.length;
                let j = 0;
                
                for (; j < leng; j += 1) {
                    self[i].style[keys[j]] = props[keys[j]];
                }
            }
        } 
        
        return self;
    },
    
    cssi(props, value, imp) {

        const self = this;
        const size = self.length;
        const sytx = 'important';
        let cimp = imp ? sytx : '';
        let i = 0;

        if (_isStr(props)) {
            if (value != null) {
                for (; i < size; i += 1) {
                    self[i].style.setProperty(_dashCase(props), value, cimp);
                }
            } else {
                return self.style(props);
            }
        } else {          
            
            if (value) { 
                cimp = sytx;
            }
            
            for (; i < size; i += 1) {
                
                const keys = _keys(props);
                const leng = keys.length;
                let j = 0;
                
                for (; j < leng; j += 1) {
                    
                      let v = props[keys[j]];
                      let c = cimp;
                    
                    if (v.toString().indexOf(`!${sytx}`) > 0) {
                        v = v.replace(`!${sytx}`, '');
                        c = sytx;
                    }
                    
                    self[i].style.setProperty(_dashCase(keys[j]), v, c);
                }
            }
        } 
        
        return self;
    },

    uniqueId() {
        return this.each((i, e) => {
            if (!e.id) {
                uiId += 1;
                e.id = `uiId-${uiId}`;
            }
        });
    },

    removeUniqueId() {
        return this.each((i, e) => {
            if (/^ui-id-\d+$/.test(e.id)) {
                Bro(e).removeAttr('id');
            }
        });
    }
});
