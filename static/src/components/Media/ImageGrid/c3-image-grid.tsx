import {
    Component,
    h,
    ComponentInterface,
    Prop,
    Element
} from '@stencil/core';
import { _COLUMS_, _KEYBOARD_, guid } from 'utils';

@Component({
    tag: 'c3-image-grid',
    styleUrl: 'c3-image-grid.scss',
    shadow: false
})
export class C3ImageGrid implements ComponentInterface {
    private _IMAGES_: Array<Object> = [];

    private _GUID_: String = guid();

    private _NUM_COLS_: Number = 3;

    private _IS_MODAL_HIDDEN_: boolean = true;

    private _FOCUSED_IMAGE_: HTMLButtonElement;

    /**
     * The number of columns to render
     */
    @Prop() readonly numColumns: string = undefined;

    @Element() root: HTMLElement;

    constructor() {
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillLoad() {
        if (this.numColumns !== undefined) {
            this._NUM_COLS_ = parseInt(this.numColumns, 10);
        }

        // TODO: check to ensure images are children
        Array.from(this.root.children).forEach((img: HTMLImageElement) => {
            this._IMAGES_.push({
                imgSrc: img.src,
                imgAlt: img.alt || 'Default alternate text'
            });

            img.remove();
        });
    }

    componentWillRender() {
        const imgRow = document.createElement('div');
        imgRow.classList.add('row');
        imgRow.classList.add('c3-image-grid-row');
        imgRow.setAttribute('id', `images-${this._GUID_}`);

        this.root.appendChild(imgRow);

        this._IMAGES_.forEach((img: any, index: number) => {
            const imgCol = document.createElement('div');
            imgCol.classList.add('col-12');
            imgCol.classList.add(`col-lg-${_COLUMS_[this._NUM_COLS_.toString()]}`);
            imgCol.classList.add('c3-image-col');
            imgCol.classList.add(`image-${index}`);

            const imgBtn = document.createElement('button');

            const newImg = document.createElement('img');
            newImg.setAttribute('src', img.imgSrc);
            newImg.setAttribute('alt', img.imgAlt);

            imgBtn.appendChild(newImg);
            imgCol.appendChild(imgBtn);
            imgRow.appendChild(imgCol);
        });
    }

    componentDidRender() {
        Array.from(this.root.querySelectorAll('.c3-image-col')).forEach((img) => {
            img.firstElementChild.addEventListener('click', this.showModal);
        });

        this.root.querySelector('.modal').addEventListener('click', (event) => {
            if (!this.root.querySelector('.modal-content').contains(event.target as HTMLElement)) {
                this.closeModal();
            }
        });

        window.addEventListener('keydown', (event:KeyboardEvent) => {
            if (!this._IS_MODAL_HIDDEN_) {
                if (event.which === _KEYBOARD_.esc) {
                    this.closeModal();
                }
            }
        });
    }

    private showModal(event): void {
        this._FOCUSED_IMAGE_ = (event.target as HTMLElement).closest('button');

        this.root.querySelector(`#image-modal-${this._GUID_} .modal-body > img`)
            .setAttribute('src', ((event.target as HTMLElement)
                .closest('button').querySelector(':scope > img') as HTMLImageElement).src);

        this.root.querySelector(`#image-modal-${this._GUID_} .modal-body > img`)
            .setAttribute('alt', ((event.target as HTMLElement)
                .closest('button').querySelector(':scope > img') as HTMLImageElement).alt);

        const offset = window.outerWidth - document.body.offsetWidth;
        document.body.style.marginLeft = `-${offset}px`;
        document.body.style.marginRight = `-${offset}px`;
        document.body.style.paddingRight = `${offset}px`;
        document.body.style.width = `calc(100% + ${offset * 2}px)`;
        document.body.classList.add('overflow-hidden');
        document.body.classList.add('modal-open');

        this.root.querySelector(`#image-modal-${this._GUID_}`).classList.add('show');
        this._IS_MODAL_HIDDEN_ = false;

        (this.root.querySelector('.btn-close-modal') as HTMLButtonElement).focus();
    }

    private closeModal(): void {
        this.root.querySelector('.modal').classList.remove('show');
        document.body.classList.remove('overflow-hidden');
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style');
        this._IS_MODAL_HIDDEN_ = true;
        this._FOCUSED_IMAGE_.focus();
    }

    render() {
        return (
            <div class="c3-image-grid">
                <slot />

                <div
                    class="modal"
                    id={`image-modal-${this._GUID_}`}
                    aria-hidden={this._IS_MODAL_HIDDEN_}
                    tabIndex={-1}
                >
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button
                                    type="button"
                                    class="btn btn-quinary btn-close-modal"
                                    aria-label="Zoom Out"
                                    onClick={this.closeModal}
                                >
                                    <span class="svg-icon">
                                        <svg height="32px" width="32px">
                                            <use href="/assets/icon/sheets/icons.svg#cross" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <img src="" class="grid-image" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
