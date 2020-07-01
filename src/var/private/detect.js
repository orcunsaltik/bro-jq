import { doc, createElement } from './window';

const styleObj = createElement('div').style;
const styleFix = ['Webkit', 'Moz', 'Ms'];

export { styleObj, styleFix };
