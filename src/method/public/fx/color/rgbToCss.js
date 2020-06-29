export default (color, opacity) => {
      opacity = opacity !== undefined ? `,${opacity}` : '';
    const rgb = opacity !== '' ? 'rgba' : 'rgb';
    return `${rgb}(${color[0]},${color[1]},${color[2]}${opacity})`;
};
