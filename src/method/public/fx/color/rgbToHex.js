import { parseInt } from '../../../../var/private/window';

export default (rgb) => {
        
    rgb = /^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:,(?:\d|(?:\.|0\.)\d+))?\)$/i.exec(rgb.replace(/\s/g, ''));
    
    if (rgb !== null) {
        rgb[1] = parseInt(rgb[1], 10).toString(16);
        rgb[2] = parseInt(rgb[2], 10).toString(16);
        rgb[3] = parseInt(rgb[3], 10).toString(16);
        rgb = `#${rgb[1].length === 1 ? `0${rgb[1]}` : rgb[1]}${rgb[2].length === 1 ? `0${rgb[2]}` : rgb[2]}${rgb[3].length === 1 ? `0${rgb[3]}` : rgb[3]}`;
    }
    
    return rgb;
};
