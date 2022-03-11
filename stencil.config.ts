import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import json from '@rollup/plugin-json';
import autoprefixer from 'autoprefixer';

export const config: Config = {
    namespace: 'c3r',
    preamble: `Built with Stencil\nCopyright © VFH ${new Date().getFullYear()}`,
    globalStyle: 'src/assets/scss/c3.scss',
    globalScript: 'src/assets/ts/c3.ts',
    taskQueue: 'async',
    hashFileNames: false,
    sourceMap: true,
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null, // comment line to disable service workers
            baseUrl: 'https://www.volunteeringforhope.org/',
            empty: false,
            copy: [
                { src: 'html' }
            ]
        },
    ],
    plugins: [
        postcss({
            plugins: [autoprefixer()]
        }),
        sass({
            includePaths: [
                'node_modules',
                'node_modules/bootstrap/scss',
                'src/components/',
                'src/assets/scss/'
            ],
            injectGlobalPaths: [
                'src/assets/scss/_c3-huddle.scss'
            ],
        }),
        json(),
    ],
    extras: {
        cloneNodeFix: true,
        appendChildSlotFix: true,
    },
    devServer: {
        port: 8080
    }
};
