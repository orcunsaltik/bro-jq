import Bro from '../instance';
import _isFn from '../method/public/object/isFn';

Bro.fn.extend({

    wrapAll(html) {

        if (_isFn(html)) {
            return this.each((i, e) => Bro(e).wrapAll(html.call(e, i)));
        }

        const self = this;
        const [el] = self;
        const size = self.length;

        let wrap = Bro(html)[0];

        while (wrap.firstElementChild) {
            wrap = wrap.firstElementChild;
        }

        el.parentNode.insertBefore(wrap, el.previousSibling);
        wrap.appendChild(el);
        
        let i = 1;
        for (; i < size; i += 1) {
            wrap.appendChild(self[i]);
        }

        return self;
    },
    
    wrapInner(html) {
        
        const self = this;
        
        return _isFn(html) 
            ? self.each((i, e) => Bro(e).wrapInner(html.call(e, i)))
            : self.each((i, e) => {
                const elem = Bro(e);
                const cont = elem.contents();
                return cont.length
                    ? cont.wrapAll(html)
                    : elem.append(html);
            }) && self;
    },
    
    wrap(html) {

        const self = this;
        const size = self.length;
        
        let i = 0;
        for (; i < size; i += 1) {

            const elem = self[i];
              let wrap = Bro(html)[0];

            while (wrap.firstElementChild) {
                wrap = wrap.firstElementChild;
            }

            elem.parentNode.insertBefore(wrap, elem.previousSibling);
            wrap.appendChild(elem);
        }

        return self;
    },
    
    unwrap(selector) {
        
        const self = this;                
        self.parent(selector).not('body').each((i, e) => {
            Bro(e).replaceWith(e.childNodes);
        });
        
        return self;
    }
});
