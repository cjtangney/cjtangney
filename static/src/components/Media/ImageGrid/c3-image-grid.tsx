import {
    Component,
    h,
    ComponentInterface,
    Prop,
    Element,
} from '@stencil/core';
import { guid } from 'utils';

@Component({
    tag: 'c3-image-grid',
    styleUrl: 'c3-image-grid.scss',
    shadow: false
})
export class C3ImageGrid implements ComponentInterface {
    private _IMAGES_: Array<Object> = [];

    private _GUID_: String = guid();

    /**
     * The number of columns to render
     */
    @Prop() readonly numColumns: Number = 3;

    @Element() root: HTMLElement;

    componentWillLoad() {
        // eslint-disable-next-line
        console.log(this.root.children);

        // check to ensure images are children
        Array.from(this.root.children).forEach((img: HTMLImageElement) => {
            this._IMAGES_.push({
                imgSrc: img.src,
                imgAlt: img.alt || 'Default alternate text'
            });
        });
    }

    componentWillRender() {
        this._IMAGES_.forEach((img: any) => {
            const imgCol = document.createElement('div');
            imgCol.classList.add('col-12');
            imgCol.classList.add('col-lg-4');

            const newImg = document.createElement('img');
            newImg.setAttribute('src', img.imgSrc);
            newImg.setAttribute('alt', img.imgAlt);

            imgCol.appendChild(newImg);
            this.root.querySelector(`images-${this._GUID_}`).appendChild(imgCol);
        });
    }

    render() {
        return (
            <div class="c3-image-grid">
                <slot />

                {/** Images render in this row */}
                <div class="row" id={`images-${this._GUID_}`} />

                <div class="modal" aria-hidden="true" tabIndex={-1}>
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <img src="" class="grid-image active" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
