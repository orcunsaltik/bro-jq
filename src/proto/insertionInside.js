import Bro       from '../instance';
import _sort     from '../method/public/dom/sort';
import _textHtml from '../method/public/dom/textHtml';
import _isArr    from '../method/public/object/isArr';
import _isStr    from '../method/public/object/isStr';
import _isNum    from '../method/public/object/isNum';

Bro.fn.extend({

    append() {

        const self = this;
        const size = self.length;
        const args = arguments;
        const leng = args.length;
        const hand = function hand(selector) {
            let i = 0;
            if (selector.bro || _isArr(selector)) {
                const j = selector.length;
                for (; i < j; i += 1) {
                    hand(selector[i]);
                }
            } else if (_isStr(selector) || _isNum(selector)) {
                for (; i < size; i += 1) {
                    self[i].appendChild(_textHtml(selector));
                }
            } else if (selector.nodeType) {
                if (
                       selector.nodeType === 1
                    || selector.nodeType === 11
                    || selector.nodeType === 9
                ) {
                    for (; i < size; i += 1) {
                        const child = size - 1 > i
                            ? Bro(selector).clone(true)[0]
                            : selector;
                        self[i].appendChild(child);
                    }
                }
            }
        };

        let i = 0;
        for (; i < leng; i += 1) {
            hand(args[i]);
        }

        return self;
    },

    appendTo(target) {

        target = Bro(target);

        const self = this;
        const size = self.length;
        const leng = target.length;
        const prev = [];
        let i = 0;

        for (; i < size; i += 1) {

            const elem = self[i];

            if (
                   elem.nodeType === 1
                || elem.nodeType === 11
                || elem.nodeType === 9
            ) {
                let j = 0;
                for (; j < leng; j += 1) {
                    const child = leng - 1 > j
                        ? Bro(elem).clone(true)[0]
                        : elem;
                    target[j].appendChild(child);
                    prev.push(child);
                }
            }
        }

        return self.make(prev);
    },

    prepend() {

        const self = this;
        const size = self.length;
        const args = arguments;
        const leng = args.length;
        const hand = function hand(selector) {

            let i = 0;

            if (selector.bro || _isArr(selector)) {
                const j = selector.length;
                for (; i < j; i += 1) {
                    hand(selector[i]);
                }
            } else if (_isStr(selector) || _isNum(selector)) {
                for (; i < size; i += 1) {
                    self[i].insertBefore(_textHtml(selector), self[i].firstChild);
                }
            } else if (selector.nodeType) {
                if (
                       selector.nodeType === 1
                    || selector.nodeType === 11
                    || selector.nodeType === 9
                ) {
                    for (; i < size; i += 1) {
                        const child = size - 1 > i
                            ? Bro(selector).clone(true)[0]
                            : selector;
                        self[i].insertBefore(child, self[i].firstChild);
                    }
                }
            }
        };

        let i = 0;
        for (; i < leng; i += 1) {
            hand(args[i]);
        }

        return self;
    },

    prependTo(target) {

        target = Bro(target);

        const self = this;
        const leng = target.length;
        const prev = [];
        let size = self.length;
        
        // eslint-disable-next-line
        while (size--) {
            const elem = self[size];
            
            if (
                   elem.nodeType === 1
                || elem.nodeType === 11
                || elem.nodeType === 9
            ) {
                let i = 0;
                for (; i < leng; i += 1) {
                    const child = leng - 1 > size
                        ? Bro(elem).clone(true)[0]
                        : elem;
                    target[i].insertBefore(child, target[i].firstChild);
                    prev.push(child);
                }
            }
        }

        return self.make(_sort(prev));
    },

    html(str) {

        const self = this;
        const size = self.length;
        let i = 0;

        if (str === undefined) {
            return self[i].innerHTML;
        }

        for (; i < size; i += 1) {
            self[i].innerHTML = str;
        }

        return self;
    },

    text(str) {

        const self = this;
        const size = self.length;
        const [el] = self;

        if (typeof str === 'undefined') {
            return el
            ? el.text || el.textContent
            : '';
        }

        let i = 0;
        for (; i < size; i += 1) {
            const item = self[i];
            if (item) {
                item.textContent = str;
            }
        }

        return self;
    }
});
