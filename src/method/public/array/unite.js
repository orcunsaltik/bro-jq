import { _concat } from '../../../var/private/window';
import unique from './unique';

export default function () { return unique(_concat.apply([], arguments)); } 
