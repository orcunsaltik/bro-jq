import _copyHtml from './copyHtml';

export default (src, dst) => {
    while (dst.firstChild) {
        dst.removeChild(dst.firstChild);
    } _copyHtml(src, dst);
};
