import { doc } from './window';

const styleObj = doc.createElement('div').style;
const styleFix = ['Webkit', 'Moz', 'Ms'];

export { styleObj, styleFix };
