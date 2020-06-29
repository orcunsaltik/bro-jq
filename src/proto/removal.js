import Bro from '../instance';

Bro.fn.extend({

    remove() {

        const self = this;
        const size = self.length;

        Bro(self).off().removeData();

        let i = 0;
        for (; i < size; i += 1) {
            const elem = self[i].parentNode;
            if (elem) {
                elem.removeChild(self[i]);
            }
        }

        return self;
    },
    
    empty() {

        const self = this;
        const size = self.length;

        let i = 0;
        for (; i < size; i += 1) {
            const elem = self[i];
            while ((elem.firstChild)) {
                elem.removeChild(elem.firstChild);
            }
        }

        return self;
    },
    
    detach() {

        const self = this;
        const size = self.length;

        let i = 0;
        for (; i < size; i += 1) {
            const elem = self[i].parentNode;
            if (elem) {
                elem.removeChild(self[i]);
            }
        }

        return self;
    }
});
