import Bro     from '../instance';
import _nodeName from '../method/public/dom/nodeName';
import _sort     from '../method/public/dom/sort';
import _isArr    from '../method/public/object/isArr';
import _isStr    from '../method/public/object/isStr';
import _merge    from '../method/public/collection/merge';
import _reverse  from '../method/public/array/reverse';
import _unique   from '../method/public/array/unique';

Bro.fn.extend({

    add(selector, context) {

        const self = this;
          let elms;

        if (_isStr(selector)) {
            elms = Bro(selector, context).toArray();
        } else if (selector.nodeType || selector.bro || _isArr(selector)) {

            selector = selector.nodeType
            ? [selector]
            :  selector;

            elms = [];

            let i = 0;
            for (; i < selector.length; i += 1) {
                elms.push(selector[i]);
            }
        }

        return self.make(_sort(_unique(self.toArray().concat(elms))));
    },

    addBack(selector) {

        const self = this;
        return self.add(
                selector == null
                ? self.prevObject
                : self.prevObject.filter(selector)
        );
    },

    contents() {

        const self = this;
        const [el] = self;
        return Bro(_nodeName(el, 'iframe')
                ? el.contentDocument || el.contentWindow.document
                : _merge([], el.childNodes));
    },

    end() {
        const self = this;
        return self.prevObject || self.constructor();
    },

    reverse: function reverse() {
        const self = this;
        return self.make(_reverse(self.toArray()));
    }
});
