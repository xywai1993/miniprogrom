module.exports = (code) => code;

module.exports.pitch = function (a) {
    console.log('pitch2222');
    const { resourcePath } = this;
    return `import style from 'css-loader!demo-loader!${resourcePath}?vue&style&index=0'`;
};
