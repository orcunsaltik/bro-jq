import { docEl, parseFloat } from '../var/private/window';
import Bro from '../instance';

Bro.fn.extend({

    isHidden() {
        return this.style('display') === 'none';
    },

    hiddenClone(cbck) {
    
        const self = this;
        const clon = self.clone()
            .insertBefore(this)
            .cssi({
                   display: 'block',
                visibility: 'hidden',
                    height: 'auto'
            }, true);
            
        const gets = cbck.apply(clon);
        clon.remove();
        return gets;
    },

    absStyles() { 
        return this.hiddenClone(function _() { return this.styles(); });
    },

    absOuterHeight(margin) {
        return this.hiddenClone(function _() { return this.outerHeight(margin); });
    },

    absOuterWidth(margin) {
        return this.hiddenClone(function _() { return this.outerWidth(margin); });
    },

    coords(top, right, bottom, left) {
        
        const self = this;
        const [el] = self;

        top    = parseFloat(top)    || 0;
        right  = parseFloat(right)  || 0;
        bottom = parseFloat(bottom) || 0;
        left   = parseFloat(left)   || 0;

        const cw = docEl.clientWidth;
        const ch = docEl.clientHeight;
        const cr = el.getBoundingClientRect();

        const t = cr.top - top;
        const l = cr.left - left;
        const r = cr.right + right;
        const b = cr.bottom - bottom;

        return Bro({
                     top: t,
                    left: l,
                   right: cw - r,
                  bottom: ch - b,
                  height: cr.height + top + bottom,
                   width: cr.width + right + left,
               offsetTop: el.offsetTop - top,
              offsetLeft: el.offsetLeft - left,
             clientWidth: cw,
            clientHeight: ch,
                  _right: r,
                 _bottom: b
        });
    },

    isInView() {
        
        const self = this;
        const [el] = self;
        return    el.left <  el.clientWidth
               && el.left > -el.width
               && el.top  <  el.clientHeight
               && el.top  > -el.height;
    },

    isInSight() {
        
        const self = this;
        const [el] = self;
        return el.top       >= 0
               && el.bottom >= 0
               && el.right  >= 0
               && el.left   >= 0;
    },

    hasScroll() {
        
        const self = this;
        const [el] = self; 
        return el.offsetHeight < el.scrollHeight 
            || el.offsetWidth  < el.scrollWidth;
    },

    hasScrollX() {
        
        const self = this;
        const [el] = self; 
        return el.offsetWidth < el.scrollWidth;
    },

    hasScrollY() {
        
        const self = this;
        const [el] = self;
        return el.offsetHeight < el.scrollHeight;
    },

    setPosX(direction, width, synch) {

        const self = this;
        const [el] = self;
        
        synch = synch || false;
        if (synch && !el.h) {
            return el;
        }

        el.v = false;

        if (direction === 'left') {
            if (width >= el.left) {
                el.v = true;
                if (el.left <= el.right) {
                    direction = 'right';
                    el.v = el.v && width >= el.right;
                }
            }
        } else if (width >= el.right) {
            el.v = true;
            if (el.right <= el.left) {
                direction = 'left';
                el.v = el.v && width >= el.left;
            }
        }
        
        el.x = direction;
        
        return el;
    },

    setPosY(direction, height, synch) {

        const self = this;
        const [el] = self;

        synch = synch || false;
        if (synch && !el.v) {
            return el;
        }

        el.h = false;

        if (direction === 'top') {
            if (height >= el.top) {
                el.h = true;
                if (el.top <= el.bottom) {
                    direction = 'bottom';
                    el.h = el.h && height >= el.bottom;
                }
            }
        } else if (height >= el.bottom) {
            el.h = true;
            if (el.bottom <= el.top) {
                direction = 'top';
                el.h = el.h && height >= el.top;
            }
        }

        el.y = direction;
        
        return el;
    }
});
