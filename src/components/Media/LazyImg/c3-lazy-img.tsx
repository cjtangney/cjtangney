import {
    Component,
    Host,
    h,
    Prop
} from '@stencil/core';

@Component({
    tag: 'c3-lazy-img',
    styleUrl: 'c3-lazy-img.scss',
    shadow: false,
})
export class C3LazyImg {
    /**
     * Image source
     */
    @Prop() readonly imgSrc: string;

    /**
     * Image alternate text
     */
    @Prop() readonly imgAlt: string;

    /**
     * Additional CSS classes to append
     */
    @Prop() readonly classes: string = '';

    componentDidLoad() {
        globalThis.imageLoader.initialize();
    }

    render() {
        return (
            <Host>
                <picture class="c3-lazy-img">
                    <source class={`img-load-lazy ${this.classes}`} data-srcset={this.imgSrc} />
                    <img
                        class={`img-load-lazy ${this.classes}`}
                        data-src={this.imgSrc}
                        alt={this.imgAlt}
                        role={this.imgAlt === undefined ? 'presentation' : ''}
                    />
                </picture>
            </Host>
        );
    }
}
