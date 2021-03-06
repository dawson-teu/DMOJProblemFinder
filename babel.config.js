module.exports = {
    sourceMaps: 'both',
    plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-transform-instanceof',
    ],
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: '3.6',
            },
        ],
    ],
};
