import _isElem from '../object/isElem';

export default (context, element) => {
    
    const parent = !!context && context.bro ? context[0] : context;
    const  child = !!element && element.bro ? element[0] : element;
    
    return _isElem(parent) && _isElem(child)
        ? parent._contains(child)
        : false;    
};
