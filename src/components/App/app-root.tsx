import { Component, h } from '@stencil/core';
import { ImageLoader } from 'utils';

declare global {
    interface Window { imageLoader: any; }
}

@Component({
    tag: 'app-root',
    shadow: false
})
export class AppRoot {
    componentWillLoad() {
        globalThis.imageLoader = new ImageLoader();
    }

    componentDidLoad() {
        globalThis.imageLoader.initialize();
    }

    componentDidRender() {
        setTimeout(() => {
            const { hash } = window.location;
            if (hash) {
                const elem = document.getElementById(hash.substring(1));
                if (elem) {
                    elem.scrollIntoView();
                }
            }
        }, 500);
    }

    render() {
        return (
            <div class="app-root">
                <slot />
            </div>
        );
    }
}
