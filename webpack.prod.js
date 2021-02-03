const path = require('path');

module.exports = {
    entry: {
        arisensdk_api: './src/arisensdk-api.ts',
        arisensdk_jsonrpc: './src/rpc-web.ts',
        arisensdk_jssig: './src/arisensdk-jssig.ts',
        arisensdk_numeric: './src/arisensdk-numeric.ts',
    },
    mode: 'production',
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
        filename: x => x.chunk.name.replace('_', '-') + '.min.js',
        library: '[name]',
        path: path.resolve(__dirname, 'dist-web'),
    }
};
