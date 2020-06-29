import { Num } from '../../../../var/private/window';
import _map from '../../collection/map';

export default (rgb) => {
    rgb = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:,(\d|(?:\.|0\.)\d+))?\)$/i.exec(rgb.replace(/\s/g, ''));
    return rgb !== null
            ? _map(rgb.shift(), Num)
            : false;
};
