import {
    Component,
    h,
    Prop,
    Element
} from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';

const Router = createRouter();

@Component({
    tag: 'static-router',
    shadow: false
})

export class StaticRouter {
    @Element() root: HTMLElement;

    /**
     * Contains the active page's markup from
     * the node server
     */
    @Prop({ mutable: true }) markup: any;

    componentDidRender() { return this.fetchContents(); }

    private fetchContents() {
        const path = document.location.pathname;

        fetch(`/html${path}/index.html`).then((response) => {
            if (response.ok) {
                return response.text();
            }

            throw new Error('missing component');
        })
            .then((data) => {
                const parser = new DOMParser();
                const markup = parser.parseFromString(data, 'text/html');
                this.markup = markup.firstElementChild.outerHTML;

                if (markup.body.querySelector('script')) {
                    this.injectBodyScripts(Array.from(markup.querySelectorAll('script')));
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    private injectBodyScripts(scripts:Array<HTMLScriptElement>) {
        globalThis.imageLoader.initialize();

        scripts.forEach((script, index) => {
            if (!document.body.querySelector(`script#injected-script_${index}`)) {
                setTimeout(() => {
                    const injectedScript = document.createElement('script');
                    injectedScript.setAttribute('id', `injected-script_${index}`);
                    injectedScript.innerHTML = script.innerHTML;
                    document.body.appendChild(injectedScript);
                }, 50);
            }
        });
    }

    render() {
        return (
            <Router.Switch>
                <Route
                    path={document.location.pathname}
                    render={() => (
                        <main class="page-root" innerHTML={this.markup} />
                    )}
                />
            </Router.Switch>
        );
    }
}
