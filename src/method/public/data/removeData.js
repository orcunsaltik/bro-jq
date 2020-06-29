import Cache from '../../../var/private/cache';

export default (elem, key) => {
    if (Cache.has(elem)) {
        if (!key) {
            Cache.delete(elem);
        } else {
            const data = Cache.get(elem);
            delete data[key];
            Cache.set(elem, data);
        }
    }
};
