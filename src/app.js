import window from 'window';
import Bro    from './instance';
import './method';
import './proto';

Bro.fn.init.prototype = Bro.fn;

window.$ = Bro;

export default Bro;
