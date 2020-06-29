import { _keys }  from '../var/private/window';
import _isObj     from '../method/public/object/isObj';
import _data      from '../method/public/data/data';
import _camelCase from '../method/public/string/camelCase';
import _dashCase  from '../method/public/string/dashCase';
import dataType   from '../method/public/data/dataType';
import Cache      from '../var/private/cache';
import Bro        from '../instance';

Bro.fn.extend({

    data(key, val) {

        const self = this;
        const size = self.length;
        const [el] = self;
          let curr;
          let i = 0;

        if (undefined === key) {

            const attrs = el.attributes;
               let leng = attrs.length;
                   curr = _data(el);
                   
            // eslint-disable-next-line
            while (leng--) {
                key = attrs[leng].name;
                if (key.indexOf('data-') === 0) {
                    val = el.getAttribute(key);
                    key = _camelCase(key.slice(5));
                    if (!curr[key]) {
                        _data(el, key, dataType(val));
                    }
                }
            }

            return curr;
        }

        if (_isObj(key)) {
            for (; i < size; i += 1) {

                const keys = _keys(key);
                const leng = keys.length;
                let j = 0;

                for (; j < leng; j += 1) {
                    _data(self[i], keys[j], dataType(key[keys[j]]));
                }
            }
        } else if (undefined === val) {
            if (Cache.has(el)) {
                val = Cache.get(el)[key];
            }
            if (val == null && el.nodeType === 1) {
                val = el.getAttribute(`data-${_dashCase(key)}`);
            }

            return dataType(val);

        } else {
            for (; i < size; i += 1) {

                const elem = self[i];

                if (!Cache.has(elem)) {
                    Cache.set(elem, {});
                }

                curr      = Cache.get(elem);
                curr[key] = dataType(val);
                Cache.set(elem, curr);
            }
        }

        return self;
    },

    removeData(key) {

        const self = this;
        const size = self.length;
        let i = 0;

        for (; i < size; i += 1) {
            if (Cache.has(self[i])) {
                if (!key) {
                    Cache.delete(self[i]);
                } else {
                    const data = Cache.get(self[i]);
                    delete data[key];
                    Cache.set(self[i], data);
                }
            }
        }

        return self;
    }
});
