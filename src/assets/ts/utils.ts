import C3ResizeObserver from './resize-observer';
import { ImageLoader } from './image-loader';
import { AspectRatio } from './aspect-ratio';

const _COLORS_ = Object.freeze({
    0: 'primary',
    1: 'success',
    2: 'danger',
    3: 'gray',
});

const _KEYBOARD_ = Object.freeze({
    'enter': 13,
    'arrow-u': 38,
    'arrow-r': 39,
    'arrow-d': 40,
    'arrow-l': 37,
    'esc': 27,
    'tab': 9,
    'space': 32
});

/**
 * Breakpoints are situatued such that
 * comparison would be "and down" --
 *
 * if (window.innerWidth < _BREAKPOINTS_.sm) { ... }
 */
const _BREAKPOINTS_ = Object.freeze({
    'xs': 576,
    'sm': 767,
    'md': 991,
    'lg': 1199,
    'xl': 1399,
    'giant': 1799
});

const guid = () => {
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return template.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;

        return v.toString(16);
    });
};

/**
 * Returns an HTMLElement's attributes
 * in an object containing key:value pairs
 * for each attr present
 *
 * @param node HTMLElement
 * @returns {Object}
 */
const cloneElementAttr = (node: HTMLElement) => {
    const attrs = {};

    Array.from(node.attributes).forEach((attr) => {
        attrs[`${attr.nodeName}`] = node?.attributes[`${attr.nodeName}`]?.value;
    });

    return attrs;
};

export {
    C3ResizeObserver,
    ImageLoader,
    AspectRatio,
    _COLORS_,
    _KEYBOARD_,
    _BREAKPOINTS_,
    guid,
    cloneElementAttr
};
