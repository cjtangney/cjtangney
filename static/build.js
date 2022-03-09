/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable import/no-relative-packages */

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { renderToString } from './dist/hydrate/index.js';

const _MASTER_ = fs.readFileSync(path.resolve('./src/index.html'), 'utf-8'); // master layout
const _HTML_PATH_ = './src/html';
const _BUILD_PATH_ = path.resolve('./www'); // output directory

/**
 * Utilizes the Stencil prerendering module ejected by the
 * build to emit hydrated markup.
 *
 * @param {String} srcHtml
 * File path containing index.html to be prerendered
 * by the Stencil dist bundle
 *
 * @returns {HTMLMockDocument}
 */
async function renderHtml(srcHtml) {
    const results = await renderToString(srcHtml, {
        prettyHtml: true,
        removeHtmlComments: true,
    });

    return results.html;
}

/**
 * Utilizes a readable stream to read raw HTML
 * markup from a given file.
 *
 * @param {String} htmlPath
 * File path to read the HTML markup from (filename inclusive)
 *
 * @param {*} callback
 * Callback function to be run on stream read
 */
async function getHtml(htmlPath, callback) {
    const stream = fs.createReadStream(path.resolve(`${htmlPath}`));
    stream.on('data', callback);
}

/**
 * Given a file path, returns the full contents
 * of the directory (folders / files) in string
 * format
 *
 * @param {String} path
 * Directory
 *
 * @returns {Array<String>}
 */
async function ls(path) {
    const dir = await fs.promises.opendir(path);
    const children = [];

    for await (const child of dir) {
        children.push(child.name);
    }

    return children;
}

/**
 * 1. Locates all `index.html` files contained under the
 * `currentPath` directory string (recursive)
 * 2. Injects the HTML markup from the located `index.html` file
 * to the Master Layout `_LAYOUT_`
 *
 * @param {String} currentPath
 * Directory
 *
 * @param {HTMLMockDocument} _LAYOUT_
 * Master layout
 */
async function renderIndexes(currentPath, _LAYOUT_) {
    ls(currentPath).then((children) => {
        children.forEach(async (child) => {
            const pathTest = `${currentPath}/${child}`;
            const stat = await fs.promises.stat(pathTest);

            if (stat.isDirectory()) {
                if (!fs.existsSync(
                    path.resolve(
                        `${_BUILD_PATH_}${currentPath.replace(_HTML_PATH_, '')}/${child}`
                    )
                )) {
                    fs.mkdirSync(path.resolve(
                        `${_BUILD_PATH_}${currentPath.replace(_HTML_PATH_, '')}/${child}`
                    ));
                }

                ls(`${currentPath}/${child}`).then(() => {
                    renderIndexes(pathTest, _LAYOUT_);
                });
            }

            let outputPath = currentPath.replace(`${_HTML_PATH_}`, '');
            outputPath = `${_BUILD_PATH_}${outputPath}`;

            // Generate the index.html file for the web server
            if (child.match(/index.html/)) {
                getHtml(path.resolve(`${currentPath}/${child}`), (markup) => {
                    const layout = new JSDOM(_LAYOUT_);
                    layout.window.document.querySelector('app-root').outerHTML = `
                        <app-root class="c3-component">
                            <main class="page-root">
                                ${markup.toString()}
                            </main>
                        </app-root>
                    `;

                    fs.writeFile(`${outputPath}/index.html`, layout.serialize(), (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
        });
    });
}

/**
 * Produce a build of the project which can be served from
 * a web server.
 *
 * @param {String} currentPath
 * Directory to build
 */
async function main(currentPath) {
    if (!fs.existsSync(_BUILD_PATH_)) {
        /* eslint-disable-next-line */
        console.log('✅    Creating HTML Output Directory');
        fs.mkdirSync(_BUILD_PATH_);
    } else {
        /* eslint-disable-next-line */
        console.log('👍    HTML Output Directory Found');
    }

    /* eslint-disable-next-line */
    console.log('🚀    Generating HTML Output');
    renderHtml(_MASTER_).then((_LAYOUT_) => {
        renderIndexes(currentPath, _LAYOUT_);
    });
}

main(_HTML_PATH_);
