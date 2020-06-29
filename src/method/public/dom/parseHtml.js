import { _keys } from '../../../var/private/window';
import _textHtml from './textHtml';

export default (elem, obj) => {
    
    const keys = _keys(obj);
    const size = keys.length;
    let i = 0;
    
    for (; i < size; i += 1) {
        
        const prop = keys[i];
        const text = obj[prop];
    
        if (prop === 'text' || prop === 'html') {
            elem.appendChild(_textHtml(text));
        }   elem.attr(prop, text);
    } 
    
    return obj;
};
