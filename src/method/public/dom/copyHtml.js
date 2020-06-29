export default (src, dst) => {
    const clone = dst.ownerDocument !== src.ownerDocument
                  ? dst.ownerDocument.importNode(src, true) :  src.cloneNode(true);
    while (clone.firstChild) {
        dst.appendChild(clone.firstChild);
    }
};
