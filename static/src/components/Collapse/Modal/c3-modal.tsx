import {
    Component,
    h,
    ComponentInterface,
    State,
    Element
} from '@stencil/core';
import {
    _KEYBOARD_,
    cloneElementAttr
} from 'utils';

@Component({
    tag: 'c3-modal',
    shadow: false
})
export class C3Modal implements ComponentInterface {
    @Element() root: HTMLElement;

    @State() hasHeader: boolean;

    @State() isHidden: boolean = true;

    private _MODAL_HEADER_: HTMLElement = undefined;

    constructor() {
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillLoad(): void {
        this.hasHeader = !!this.root.querySelector('[slot="modal-header"]');
        if (this.hasHeader) {
            this._MODAL_HEADER_ = this.root.querySelector('[slot="modal-header"]');
            this.root.querySelector('[slot="modal-header"]').remove();
        }
    }

    componentDidRender(): void {
        this.root.querySelector('[slot="modal-trigger"]').addEventListener('click', this.showModal);
        this.root.querySelector('.modal').addEventListener('click', (event) => {
            if (!this.root.querySelector('.modal-content').contains(event.target as HTMLElement)) {
                this.closeModal();
            }
        });

        Array.from(this.root.querySelectorAll('.btn-close-modal')).forEach((closeBtn) => {
            closeBtn.addEventListener('click', this.closeModal);
        });

        window.addEventListener('keydown', (event:KeyboardEvent) => {
            if (!this.isHidden) {
                if (event.which === _KEYBOARD_.esc) {
                    this.closeModal();
                }
            }
        });
    }

    private showModal(): void {
        const offset = window.outerWidth - document.body.offsetWidth;
        document.body.style.marginLeft = `-${offset}px`;
        document.body.style.marginRight = `-${offset}px`;
        document.body.style.paddingRight = `${offset}px`;
        document.body.style.width = `calc(100% + ${offset * 2}px)`;
        document.body.classList.add('overflow-hidden');
        document.body.classList.add('modal-open');
        this.root.querySelector('.modal').classList.add('show');
        this.isHidden = false;
    }

    private closeModal(): void {
        this.root.querySelector('.modal').classList.remove('show');
        document.body.classList.remove('overflow-hidden');
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style');
        this.isHidden = true;
    }

    render() {
        const ModalHeader = this.hasHeader && `${this._MODAL_HEADER_.tagName.toLowerCase()}`;

        return (
            <div class="c3-modal">
                <slot name="modal-trigger" />

                <div class="modal" aria-hidden={this.isHidden} tabIndex={-1}>
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            {this.hasHeader && (
                                <div class="modal-header">
                                    <ModalHeader
                                        class="modal-title"
                                        {...cloneElementAttr(this._MODAL_HEADER_)}
                                        innerHTML={this._MODAL_HEADER_.innerHTML}
                                    />
                                    <button
                                        type="button"
                                        class="btn btn-close btn-close-modal"
                                        aria-label="Close Dialog"
                                    >
                                        <span class="svg-icon">
                                            <svg>
                                                <use href="/assets/icon/sheets/icons.svg#cross" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            )}
                            <div class="modal-body">
                                <slot />
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-quinary btn-close-modal"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
