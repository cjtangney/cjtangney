import {
    Component,
    h,
    ComponentInterface,
    Element,
    Event,
    EventEmitter
} from '@stencil/core';
import { guid } from 'utils';

@Component({
    tag: 'c3-off-canvas',
    styleUrl: 'c3-off-canvas.scss',
    shadow: false
})

export class C3OffCanvas implements ComponentInterface {
    @Element() root:HTMLElement;

    private _GUID_ = guid();

    componentDidRender() {
        this.root.querySelector('.btn-collapse-panel').addEventListener('click', (event) => {
            event.preventDefault();

            this.togglePanel();
        });
    }

    /**
     * Toggles visibilty of the panel
     */
    @Event() toggleLeftPanel:EventEmitter;

    private togglePanel() {
        this.root.querySelector('.c3-off-canvas').classList.toggle('closed');
        this.root.querySelector('.c3-off-canvas').setAttribute(
            'aria-hidden',
            `${this.root.querySelector('.c3-off-canvas').classList.contains('closed')}`
        );
        this.toggleLeftPanel.emit();
    }

    render() {
        return (
            <aside
                class="c3-off-canvas"
                id={`c3-off-canvas-${this._GUID_}`}
                aria-hidden={!!this.root.classList.contains('closed')}
            >
                <button
                    class="btn btn-collapse-panel"
                    aria-label="Toggle Atomic Design System Menu"
                    type="button"
                >
                    <span />
                </button>
                <slot />
            </aside>
        );
    }
}
