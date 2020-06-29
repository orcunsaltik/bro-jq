export default function () {
    const oe = this.originalEvent;
    if (!this.propagationStopped) {
        this.propagationStopped = true;
        oe.stopPropagation();
    }
}
