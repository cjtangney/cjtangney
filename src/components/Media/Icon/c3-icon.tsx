import {
    Component,
    ComponentInterface,
    h,
    Prop
} from '@stencil/core';

declare const _ASSETS_;

@Component({
    tag: 'c3-icon',
    shadow: false,
})
export class C3Icon implements ComponentInterface {
    /**
     * Any CSS classes to append to the SVG
     */
    @Prop() readonly classes: string;

    /**
     * The icon to utilize
     */
    @Prop() readonly icon: string;

    render() {
        return (
            <svg class={this.classes}>
                <use href={`${_ASSETS_}/icon/${this.icon}`} />
            </svg>
        );
    }
}
