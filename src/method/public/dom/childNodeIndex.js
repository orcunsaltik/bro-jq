import { _indexOf } from '../../../var/private/window';

export default (node) => _indexOf.call(node.parentNode.children, node);
