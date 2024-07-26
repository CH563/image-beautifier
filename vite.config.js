import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

import pkg from './package.json' assert {type: 'json'};

const resolve = (url) => path.resolve(__dirname, url);


// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@components': resolve('./src/components'),
            '@assets': resolve('./src/assets'),
            '@style': resolve('./src/style'),
            '@stores': resolve('./src/stores/index.js'),
            '@utils': resolve('./src/utils'),
            '@hooks': resolve('./src/hooks'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 省略扩展名
    },
    plugins: [react()]
});
