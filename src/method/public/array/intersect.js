import { _filter } from '../../../var/private/window';

export default function () {
    const args = arguments;
    const size = args.length - 1;
    let i = 0;
    let obj = args[i];
    for (; i < size; i += 1) {
        const next = args[i + 1];
        obj = _filter.call(obj, (e) => next.indexOf(e) > -1);
    }
    return obj;
}
