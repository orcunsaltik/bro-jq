import { doc } from '../../../var/private/window';

export default (str) => {
    let txt;
    if (/^<[a-z][\s\S]*>$/.test(str)) {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(str, 'text/html');
        txt = parsed.querySelector('body').firstChild;
    } else {
        txt = doc.createTextNode(str);
    } return txt;
};
