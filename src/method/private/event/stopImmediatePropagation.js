export default function () {
    const oe = this.originalEvent;
    if (!this.immediatePropagationStopped) {
        this.immediatePropagationStopped = true;
        oe.stopImmediatePropagation();
    } this.stopPropagation();
}
