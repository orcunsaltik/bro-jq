import { gcs, parseFloat } from '../var/private/window';
import _isNum from '../method/public/object/isNum';
import Bro    from '../instance';

Bro.fn.extend({

    width(w) {

        const self = this;
        const [el] = self;

        if (w) {
            w += _isNum(w) ? 'px' : '';
            el.style.width = w;
            return self;
        }

        return parseFloat(gcs(el, null).width);
    },

    height(h) {

        const self = this;
        const [el] = self;

        if (h) {
            h += _isNum(h) ? 'px' : '';
            el.style.width = h;
            return self;
        }

        return parseFloat(gcs(el, null).height);
    },

    innerWidth() {

        const self = this;
        const [el] = self;
        return el && el.clientWidth;
    },

    innerHeight() {

        const self = this;
        const [el] = self;
        return el && el.clientHeight;
    },

    outerWidth(m) {

        const self = this;
        const [el] = self;
        let w = null;

        if (el) {
            m = m
                ? parseFloat(self.style('margin-left'))
                + parseFloat(self.style('margin-right'))
                : 0;
            w = el.offsetWidth + m;
        }

        return w;
    },

    outerHeight(m) {

        const self = this;
        const [el] = self;
        let h = null;

        if (el) {
            m = m
                ? parseFloat(self.style('margin-top'))
                + parseFloat(self.style('margin-bottom'))
                : 0;
            h = el.offsetHeight + m;
        }

        return h;
    }
});
