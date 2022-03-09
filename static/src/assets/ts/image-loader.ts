/**
 * Lazy loads images that are set up properly. Aslo handled webp fallbacks
 * For img tags:
 *      <picture>
            <source class="img-load-lazy" data-srcset="/img.jpg" type="image/jpeg" />
            <img class="img-load-lazy" data-src="/img.jpg" alt="Image Alt" />
          </picture>
    For BG Images: <div class="lazy-load-bg" style="background-image: url('/my-image.jpeg')"></div>

    more info: https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video
 */

export class ImageLoader {
    public queue;

    public backgroundQueue;

    public lazyImageObserver;

    public lazyBgObserver;

    public options;

    public webpSupported;

    constructor(options = {}) {
        this.queue = [];
        this.backgroundQueue = [];
        this.lazyImageObserver = null;
        this.lazyBgObserver = null;
        this.options = options;
    }

    public initialize() {
        this.queue = [];
        this.backgroundQueue = [];
        this.lazyImageObserver = null;
        this.lazyBgObserver = null;

        this.getImagesToLazyLoad();

        if (!('IntersectionObserver' in window)) {
            this.abort();
            return;
        }

        this.onContentLoaded();
        this.setGenericPlaceholder();

        this.queue.forEach((lazyImage) => {
            this.lazyImageObserver.observe(lazyImage);
        });

        this.backgroundQueue.forEach((lazyBg) => {
            this.lazyBgObserver.observe(lazyBg);
        });
    }

    getImagesToLazyLoad() {
        this.queue = document.querySelectorAll('.img-load-lazy');
        this.backgroundQueue = document.querySelectorAll('.lazy-load-bg');
    }

    setGenericPlaceholder() {
        if (this.options.genericImagePlaceholder) {
            this.queue.forEach((img) => {
                img.setAttribute('src', this.options.genericImagePlaceholder);
            });
        }

        if (this.options.genericBgPlaceholder) {
            this.backgroundQueue.forEach((bg) => {
                // eslint-disable-next-line no-param-reassign
                bg.style.backgroundColor = this.options.genericBgPlaceholder;
            });
        }
    }

    onContentLoaded() {
        this.lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage: any = entry.target;

                    if (lazyImage.classList.contains('img-load-lazy')) {
                        if (lazyImage.dataset.src) {
                            lazyImage.src = lazyImage.dataset.src;
                        }
                        if (lazyImage.dataset.srcset) {
                            lazyImage.srcset = lazyImage.dataset.srcset;
                        }
                        lazyImage.classList.remove('img-load-lazy');
                        this.lazyImageObserver.unobserve(lazyImage);
                    }
                }
            });
        });

        this.lazyBgObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.classList.contains('lazy-load-bg')) {
                    const webP = entry.target.getAttribute('data-webp');
                    if (this.webpSupported && webP && webP !== '') {
                        entry.target.setAttribute('style', `background-image: url(${webP})`);
                    }

                    entry.target.classList.remove('lazy-load-bg');
                    this.lazyBgObserver.unobserve(entry.target);
                }
            });
        });
    }

    abort() {
        for (let i = 0; i < this.queue.length; i += 1) {
            this.queue[i].setAttribute('src', this.queue[i].getAttribute('data-src'));
            this.queue[i].classList.remove('img-load-lazy');
        }

        for (let i = 0; i < this.backgroundQueue.length; i += 1) {
            this.backgroundQueue[i].classList.remove('lazy-load-bg');
        }
    }
}
