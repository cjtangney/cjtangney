import {
    Component, h, ComponentInterface, State, Prop, Element
} from '@stencil/core';
import {
    cloneElementAttr
} from 'utils';

@Component({
    tag: 'c3-card',
    styleUrl: 'c3-card.scss',
    shadow: false
})
export class C3Card implements ComponentInterface {
    @Element() root: HTMLElement;

    @State() hasHeader: boolean;

    @State() hasMedia: boolean;

    @State() hasFooter: boolean;

    @State() isHeaderInline: boolean;

    @State() isHeaderLink: boolean;

    @State() cssString: string;

    /**
     * The theme of the card, dictacting look / feel
     */
    @Prop() readonly cardStyle: string = undefined;

    /**
     * Which side of the card the image should render on
     */
    @Prop() readonly cardOrientation: string = undefined;

    /**
     * Should the card be full bleed?
     */
    @Prop() readonly fullBleed: boolean = false;

    /**
     * CSS classes to be optionally appended to the wrapper
     */
    @Prop() readonly classes: string;

    /**
     * Determines if the header is a link
     */
    @Prop() readonly headerLink: boolean;

    /**
     * Determines if the header is inline
     */
    @Prop() readonly headerInline: boolean;

    private _CARD_HEADER_: HTMLElement = undefined;

    private _CARD_MEDIA_: HTMLElement = undefined;

    private _CARD_FOOTER_: HTMLElement = undefined;

    private _CARD_CONTENTS_: Array<any>;

    /**
     * Ensures the header renders correctly depending on whether or not
     * it is inline
     */
    private updateHeader() {
        this.root.querySelector('[slot="card-header"]')?.classList.add('card-header');

        this.isHeaderInline = (this._CARD_HEADER_?.dataset?.inline !== undefined
            || this.headerInline);
        this.isHeaderLink = (this._CARD_HEADER_?.dataset?.inlineLink !== undefined
            || this.headerLink);

        if (this.isHeaderLink) {
            this.isHeaderInline = true;
            this._CARD_HEADER_?.classList.add('fake-link');
            this._CARD_HEADER_?.classList.add('fs-6');
        } else {
            this._CARD_HEADER_?.classList.remove('fake-link');
            this._CARD_HEADER_?.classList.remove('fs-6');
        }
    }

    componentWillRender() {
        this.cssString = 'c3-card';

        if (this.fullBleed) { this.cssString = `${this.cssString}_full-bleed`; }

        if (this.cardStyle !== undefined && this.cardStyle !== null) {
            if (this.cardStyle !== 'default') {
                this.cssString = `${this.cssString}_${this.cardStyle}`;
            }

            if (this.cardStyle === 'minimal' && this.fullBleed) {
                this.cssString = this.cssString.replace('_full-bleed', '');
            }
        }

        this.cssString = this.cardOrientation !== undefined ? (
            `${this.cssString}_${this.cardOrientation}`
        ) : (
            `${this.cssString}_img-left`
        );

        if (this.classes !== undefined) {
            this.cssString = `${this.cssString} ${this.classes}`;
        }

        this.updateHeader();
    }

    componentWillLoad() {
        this.hasHeader = !!this.root.querySelector('[slot="card-header"]');
        if (this.hasHeader) {
            this._CARD_HEADER_ = this.root.querySelector('[slot="card-header"]');
            this.updateHeader();
            this.root.querySelector('[slot="card-header"]').remove();
        }

        this.hasMedia = !!this.root.querySelector('[slot="card-media"]');
        if (this.hasMedia) {
            this._CARD_MEDIA_ = this.root.querySelector('[slot="card-media"]');
            this.root.querySelector('[slot="card-media"]').remove();
        }

        this.hasFooter = !!this.root.querySelector('[slot="card-footer"]');
        if (this.hasFooter) {
            this._CARD_FOOTER_ = this.root.querySelector('[slot="card-footer"]');
            this.root.querySelector('[slot="card-footer"]').remove();
        }

        if (this.root.children.length > 0) {
            this._CARD_CONTENTS_ = Array.from(this.root.children)
                .filter((child) => !(child.getAttribute('slot')));
        }
    }

    // componentDidRender() {
    //     globalThis.resizeObserver.observe(this.root.firstElementChild);
    // }

    render() {
        const CardHeader = this.hasHeader && `${this._CARD_HEADER_.tagName.toLowerCase()}`;
        const CardMedia = this.hasMedia && `${this._CARD_MEDIA_.tagName.toLowerCase()}`;
        const CardFooter = this.hasFooter && `${this._CARD_FOOTER_.tagName.toLowerCase()}`;
        let CardContent;

        return (
            <div class={this.cssString}>
                {/** BLOCK HEADER */}
                {(
                    this.hasHeader
                    && !(this.cardStyle === 'minimal')
                    && !(this.isHeaderInline)
                ) && (
                    <div class="row">
                        <div class="col">
                            <CardHeader {...cloneElementAttr(this._CARD_HEADER_)}>
                                {this._CARD_HEADER_.innerHTML}
                            </CardHeader>
                        </div>
                    </div>
                )}
                {/** end BLOCK HEADER */}

                <div class="card-body">
                    <div class="row">
                        <div class="col">

                            {/** CARD MEDIA */}
                            {this.hasMedia && (
                                <div
                                    class={`card-media${CardMedia === 'iframe'
                                        ? ' ratio ratio-16x9'
                                        : ''}`}
                                >
                                    <CardMedia
                                        {...cloneElementAttr(this._CARD_MEDIA_)}
                                        innerHTML={this._CARD_MEDIA_.innerHTML}
                                    />
                                </div>
                            )}
                            {/** end CARD MEDIA */}

                            <div class="card-content">
                                {/** INLINE HEADER */}
                                {(
                                    this.hasHeader
                                    && (this.cardStyle === 'minimal' || this.isHeaderInline)
                                ) && (
                                    <div class="row">
                                        <div class="col">
                                            <CardHeader
                                                {...cloneElementAttr(this._CARD_HEADER_)}
                                                innerHTML={this._CARD_HEADER_.innerHTML}
                                            />
                                        </div>
                                    </div>
                                )}
                                {/** end INLINE HEADER */}

                                {/** CONTENT */}
                                {this._CARD_CONTENTS_?.length > 0 && (
                                    this._CARD_CONTENTS_.map((child) => {
                                        CardContent = child.tagName.toLowerCase();
                                        child.remove();

                                        return (
                                            <CardContent
                                                {...cloneElementAttr(child)}
                                                innerHTML={child.innerHTML}
                                            />
                                        );
                                    })
                                )}
                                {/** end CONTENT */}

                                {/** FOOTER */}
                                {this.hasFooter && (
                                    <div class="card-footer">
                                        <div class="row">
                                            <div class="col">
                                                <CardFooter
                                                    {...cloneElementAttr(this._CARD_FOOTER_)}
                                                    innerHTML={this._CARD_FOOTER_.innerHTML}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/** end FOOTER */}

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
