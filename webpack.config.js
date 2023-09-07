module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        library: {
            name: 'BalanceSheet',
            export: 'default',
            type: 'umd',
        },
        filename: "./qrcode.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js',
        ],
    },
};