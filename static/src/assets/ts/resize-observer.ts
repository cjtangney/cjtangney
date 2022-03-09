/**
 * We only want a singular ResizeObserver instance
 * for performance reasons. This is a wrapper for
 * this API which allows us to add items to the
 * watched elements.
 *
 * Theoretically, it should also allow for
 * compartmentalization of functions to handle
 * specific treatment of "observed" elements
 */
import { ResizeObserver } from 'resize-observer'; // required for prerendering
import { _BREAKPOINTS_ } from 'utils';

import cardMediaVals from '../../components/Cards/assets/ts/_card-media';

export default class C3ResizeObserver extends ResizeObserver {
    constructor() {
        super((entries) => {
            entries.forEach((entry) => {
                const cssClasses = Array.from(entry.target.classList);

                if (cssClasses.some(
                    (cssClass) => /c3-card/g.test(cssClass)
                )) this.wrapCard(entry.target as HTMLElement);

                if (cssClasses.some(
                    (cssClass) => /c3-flex-list/g.test(cssClass)
                )) this.wrapInlineListGroup(entry.target as HTMLElement);
            });
        });
    }

    /**
     * Determines if a Card should display with
     * contents stacked or side-by-side, based upon
     * the configured Card image orientation and
     * available real estate within the containing element.
     *
     * @param card HTMLElement
     */
    private wrapCard(card: HTMLElement) {
        let cardClass = 'c3-card';

        if (card.closest('c3-card').getAttribute('full-bleed') !== null) {
            cardClass = `${cardClass}_full-bleed`;
        }

        if (card.closest('c3-card').getAttribute('card-style') !== null) {
            cardClass = `${cardClass}_${card.closest('c3-card').getAttribute('card-style')}`;
        }

        if (card.offsetWidth * cardMediaVals.flexBasis < cardMediaVals.minWidth) {
            card.classList.forEach((cssClass) => {
                if (
                    cssClass.includes(cardClass)
                    && cssClass.includes('_img-left')
                ) card.classList.replace(cssClass, cardClass);

                if (
                    cssClass.includes(cardClass)
                    && cssClass.includes('_img-right')
                ) card.classList.replace(cssClass, cardClass);
            });
        } else if (card.closest('c3-card').getAttribute('card-orientation')) {
            card.classList.forEach((cssClass) => {
                card.classList.replace(
                    cssClass,
                    `${cardClass}_${card.closest('c3-card').getAttribute('card-orientation')
                    }`
                );
            });
        } else {
            card.classList.forEach((cssClass) => {
                card.classList.replace(cssClass, `${cardClass}_img-left`);
            });
        }

        if (card.closest('c3-card').getAttribute('classes') !== null) {
            card.closest('c3-card').getAttribute('classes').split(' ').forEach((classString) => {
                card.classList.add(classString);
            });
        }
    }

    private wrapInlineListGroup(flexList: HTMLElement) {
        if (window.innerWidth > _BREAKPOINTS_.md) {
            if (flexList.classList.contains('justify-left')) {
                if ((
                    flexList.firstElementChild as HTMLElement
                ).offsetHeight
                    > (
                        flexList.querySelector('.list-group-item') as HTMLElement
                    ).offsetHeight
                ) {
                    let currentY = flexList
                        .querySelector('.list-group-item').getBoundingClientRect().y;
                    Array.from(flexList.querySelectorAll('.list-group-item'))
                        .forEach((item: HTMLElement, index: Number) => {
                            if (index > 0) {
                                const box = item.getBoundingClientRect();
                                if (box.y > currentY) {
                                    item.classList.add('ps-0');
                                    currentY = box.y;
                                }
                            }
                        });
                } else {
                    Array.from(flexList.querySelectorAll('.list-group-item'))
                        .forEach((item: HTMLElement, index: Number) => {
                            if (index > 0) {
                                item.classList.remove('ps-0');
                            }
                        });
                }
            }
        } else {
            Array.from(flexList.querySelectorAll('.list-group-item'))
                .forEach((item: HTMLElement, index: Number) => {
                    if (index > 0) {
                        item.classList.remove('ps-0');
                    }
                });
        }
    }
}
