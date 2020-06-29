import _isStr from '../method/public/object/isStr';
import Bro  from '../instance';

Bro.fn.extend({

    hasClass(className) {
        
        const self = this;
        const [el] = self; 
        return el && !!el.classList.contains(className);
    },

    addClass(classes) {

        const self = this;
        const size = self.length;
        let i = 0;

        if (_isStr(classes) && (classes = classes.trim()) !== '') {
            classes = classes.split(' ');
            for (; i < classes.length; i += 1) {
                let j = 0;
                for (; j < size; j += 1) {
                    const elem = self[j];
                    if (elem) {
                        elem.classList.add(classes[i]);
                    }
                }
            }
        }

        return self;
    },

    removeClass(classes) {

        const self = this;
        const size = self.length;
        let i = 0;

        switch (typeof classes) {
            case 'string':
                if ((classes = classes.trim()) !== '') {
                    classes = classes.split(' ');
                    for (; i < classes.length; i += 1) {
                        let j = 0;
                        for (; j < size; j += 1) {
                            const elem = self[j];
                            if (elem) {
                                elem.classList.remove(classes[i]);
                            }
                        }
                    }
                }
                break;
            case 'undefined':
                self.removeClass(self.attr('class'));
                break;

                // no default
        }

        return self;
    },

    toggleClass(classes) {

        const self = this;
        const size = self.length;
        let i = 0;

        if (_isStr(classes) && (classes = classes.trim()) !== '') {
            classes = classes.split(' ');
            for (; i < classes.length; i += 1) {
                let j = 0;
                for (; j < size; j += 1) {
                    const elem = self[j];
                    if (elem) {
                        elem.classList.toggle(classes[i]);
                    }
                }
            }
        }

        return self;
    }
});

// Alias
Bro.fn.remClass = Bro.fn.removeClass;
Bro.fn.togClass = Bro.fn.toggleClass;
