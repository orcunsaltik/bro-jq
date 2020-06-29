import Bro       from '../instance';
import _sort     from '../method/public/dom/sort';
import _textHtml from '../method/public/dom/textHtml';
import _isArr    from '../method/public/object/isArr';
import _isStr    from '../method/public/object/isStr';
import _isNum    from '../method/public/object/isNum';

Bro.fn.extend({

    before() {

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
                    self[i].parentNode.insertBefore(
                        _textHtml(selector),
                        self[i]
                    );
                }
            } else if (selector.nodeType) {
                if (
                       selector.nodeType === 1
                    || selector.nodeType === 11
                    || selector.nodeType === 9
                ) {
                    for (; i < size; i += 1) {
                        if (!self[i].parentNode) {
                            continue;
                        }
                        const child = size - 1 > i
                            ? Bro(selector).clone(true)[0]
                            : selector;
                        self[i].parentNode.insertBefore(child, self[i]);
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

    insertBefore(target) {

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
                    if (!target[j].parentNode) {
                        continue;
                    }
                    const child = leng - 1 > i
                        ? Bro(elem).clone(true)[0]
                        : elem;
                    target[j].parentNode.insertBefore(child, target[j]);
                    prev.push(child);
                }
            }
        }

        return self.make(prev);
    },

    after() {

        const self = this;
        const size = self.length;
        const args = arguments;
        const hand = function hand(selector) {
            let i = 0;
            if (selector.bro || _isArr(selector)) {
                const j = selector.length;
                for (; i < j; i += 1) {
                    hand(selector[i]);
                }
            } else if (_isStr(selector) || _isNum(selector)) {
                for (; i < size; i += 1) {
                    self[i].parentNode.insertBefore(
                        _textHtml(selector),
                        self[i].nextSibling
                    );
                }
            } else if (selector.nodeType) {
                if (
                       selector.nodeType === 1
                    || selector.nodeType === 11
                    || selector.nodeType === 9
                ) {
                    for (; i < size; i += 1) {
                        if (!self[i].parentNode) {
                            continue;
                        }
                        const child = size - 1 > i
                            ? Bro(selector).clone(true)[0]
                            : selector;
                        self[i].parentNode.insertBefore(
                            child,
                            self[i].nextSibling
                        );
                    }
                }
            }
        };

        let leng = args.length;
        // eslint-disable-next-line
        while (leng--) {
            hand(args[leng]);
        }

        return self;
    },

    insertAfter(target) {

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
                    if (!target[i].parentNode) {
                        continue;
                    }
                    const child = leng - 1 > i
                        ? Bro(elem).clone(true)[0]
                        : elem;
                    target[i].parentNode.insertBefore(child, target[i].nextSibling);
                    prev.push(child);
                }
            }
        }

        return self.make(_sort(prev));
    }
});
