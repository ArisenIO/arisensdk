const path = require('path');

module.exports = {
    entry: {
        arisenjs_api: './src/arisensdk-api.ts',
        arisenjs_jsonrpc: './src/rpc-web.ts',
        arisenjs_jssig: './src/arisensdk-jssig.ts',
        arisenjs_numeric: './src/arisensdk-numeric.ts',
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.web.json'
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: x => x.chunk.name.replace('_', '-') + '.js',
        library: '[name]',
        path: path.resolve(__dirname, 'dist-web'),
    }
};
