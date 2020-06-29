import window   from 'window';
import { doc }  from '../var/private/window';
import Bro      from '../instance';
import _isArr   from '../method/public/object/isArr';
import _isFn    from '../method/public/object/isFn';
import _isObj   from '../method/public/object/isObj';
import _isStr   from '../method/public/object/isStr';
import _unique  from '../method/public/array/unique';

Bro.fn.init = function init(selector, context) {   
    if (selector) {        
        let elem = null;
        let parsed;        
        if (_isStr(selector)) {
            this.selector = selector;
            if (/^<[a-z][\s\S]*>$/.test(selector)) {
                if (/^<[a-z]+\s*\/?>$/.test(selector)) {
                    elem = doc.createElement(selector.replace(/[\s<>/]/g, ''));
                } else {
                    const parser = new DOMParser();
                          parsed = parser.parseFromString(selector, 'text/html');
                            elem = parsed.querySelector('body').firstChild;
                }
            } else if (/^#[^,\s]+$/.test(selector)) {
                elem = doc.getElementById(selector.substring(1));
            } else if (!context) {
                return Bro(doc).find(selector);
            } else if (context.bro) {
                return context.find(selector);
            } else {
                return this.constructor(context).find(selector);
            }
        } else if (selector.bro) {
            return selector;
        } else if (_isArr(selector)) {
            return this.make(_unique(selector));
        } else if (selector.nodeType || selector === window || _isObj(selector)) {
            elem = selector;
        } else if (_isFn(selector)) {
            return Bro.isReady === undefined
                ? Bro(doc).ready(selector)
                : selector(Bro);
        }
                
        if (elem) {            
                  this[0] = elem;
              this.length = 1;              
            if (!!context && _isObj(context) && !parsed) {
                this.parseHtml(context);
            }
        }        
    } 
    
    return this;
};
