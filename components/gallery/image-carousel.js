class ImageCarousel extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'carousel-wrapper');

        const carousel = document.createElement('div');
        carousel.setAttribute('class', 'carousel');

        const leftButton = this._createButton('left', '←', this.showPreviousImage.bind(this));

        const rightButton = this._createButton('right', '→', this.showNextImage.bind(this));

        const buttonWrapper = document.createElement('div');
        buttonWrapper.setAttribute('class', 'button-wrapper');
        buttonWrapper.append(leftButton, rightButton);

        const thumbnails = document.createElement('div');
        thumbnails.setAttribute('class', 'thumbnails');

        this.images = [];
        this.thumbnails = [];
        this.currentImageIndex = 0;

        let imageIndex = 1;
        while (this.hasAttribute(`image-${imageIndex}-src`)) {
            const imgSrc = this.getAttribute(`image-${imageIndex}-src`);

            const img = this._createImageElement(imgSrc, imageIndex);
            this.images.push(img);
            carousel.appendChild(img);

            const thumbnail = this._createThumbnailElement(imgSrc, imageIndex);
            thumbnails.appendChild(thumbnail);
            this.thumbnails.push(thumbnail);

            imageIndex++;
        }

        wrapper.append(carousel, buttonWrapper, thumbnails);

        const style = this._getCarouselStyle();

        shadow.append(style, wrapper);

        this.updateCarousel();
    }

    _createButton(direction, text, clickHandler) {
        const button = document.createElement('button');
        button.setAttribute('class', `carousel-button ${direction}`);
        button.textContent = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    _createImageElement(src, index) {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('class', 'carousel-image');
        img.setAttribute('alt', `Carousel image ${index}`);
        img.style.display = index === 1 ? 'block' : 'none';
        return img;
    }

    _createThumbnailElement(src, index) {
        const thumbnail = document.createElement('img');
        thumbnail.setAttribute('src', src);
        thumbnail.setAttribute('class', 'thumbnail-image');
        thumbnail.setAttribute('alt', `Thumbnail image ${index}`);
        thumbnail.dataset.index = index - 1;
        thumbnail.addEventListener('click', () => {
            const thumbnailIndex = parseInt(thumbnail.dataset.index, 10);
            console.log(`Thumbnail clicked: Index ${thumbnailIndex}`);
            this.showImage(thumbnailIndex);
        });
        return thumbnail;
    }

    _getCarouselStyle() {
        const style = document.createElement('style');
        style.textContent = `
            .carousel-wrapper {
                position: relative;
                width: 100%;
                max-width: 100vw;
                margin: 0 auto;
                padding-top: 64px;
                padding-bottom: 64px;
            }

            .carousel {
                width: 70vw;
                height: 50vh;
                margin: 0 auto;
                overflow: hidden;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .carousel-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: none;
            }

            .carousel-image.active {
                display: block;
            }

            .button-wrapper {
                display: flex;
                justify-content: center;
                margin-top: 20px;
                gap: 20px;
            }

            .carousel-button {
                background-color: white;
                color: #808189;
                border: none;
                padding: 10px;
                cursor: pointer;
                font-size: 2rem;
                border-radius: 5px;
            }

            .thumbnails {
                display: flex;
                justify-content: center;
                margin-top: 20px;
                gap: 10px;
            }

            .thumbnail-image {
                width: 50px;
                height: 50px;
                object-fit: cover;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity 0.3s ease;
                border-radius: 5px;
            }

            .thumbnail-image.active {
                opacity: 1;
                border: 2px solid #000;
            }

            @media (max-width: 768px) {
                .carousel {
                    width: 90vw;
                    height: 30vh;
                }

                .thumbnail-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                }
            }
        `;
        return style;
    }

    showPreviousImage() {
        console.log('Previous button clicked');
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
    }

    showNextImage() {
        console.log('Next button clicked');
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateCarousel();
    }

    showImage(index) {
        console.log(`Show image: Index ${index}`);
        this.currentImageIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        console.log(`Updating carousel to show index ${this.currentImageIndex}`);
        
        this.images.forEach((img, index) => {
            img.style.display = index === this.currentImageIndex ? 'block' : 'none';
            img.classList.toggle('active', index === this.currentImageIndex);
        });

        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentImageIndex);
        });
    }
}

customElements.define('image-carousel', ImageCarousel);
