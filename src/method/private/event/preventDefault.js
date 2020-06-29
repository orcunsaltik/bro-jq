export default function () {
    const oe = this.originalEvent;
    if (!oe.defaultPrevented) {
        this.defaultPrevented = true;
        oe.preventDefault();
    }
}
