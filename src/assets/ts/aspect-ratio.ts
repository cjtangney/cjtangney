interface AspectRatioInterface {
    ratio: Array<number>,
    element: HTMLElement
}

export class AspectRatio {
    public ratioX: number;

    public ratioY: number;

    public element: HTMLElement;

    constructor(options: AspectRatioInterface) {
        [this.ratioX, this.ratioY] = options.ratio;
        this.element = options.element;
    }

    maintain() {
        this.setAspectRatio();

        window.addEventListener('resize', () => {
            this.setAspectRatio();
        });
    }

    setAspectRatio() {
        const currentWidth = this.element.clientWidth;
        const heightPctByRatio = this.ratioY / this.ratioX;
        const computedHeight = currentWidth * heightPctByRatio;
        this.element.style.height = `${computedHeight}px`;
    }
}
