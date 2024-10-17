class ImageCarousel extends HTMLElement {
    constructor() {
        super();

        // Attach shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the wrapper for the entire carousel
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'carousel-wrapper');

        // Create the main image container
        const carousel = document.createElement('div');
        carousel.setAttribute('class', 'carousel');

        // Left button
        const leftButton = document.createElement('button');
        leftButton.setAttribute('class', 'carousel-button left');
        leftButton.textContent = '←';
        leftButton.addEventListener('click', () => this.showPreviousImage());

        // Right button
        const rightButton = document.createElement('button');
        rightButton.setAttribute('class', 'carousel-button right');
        rightButton.textContent = '→';
        rightButton.addEventListener('click', () => this.showNextImage());

        // Thumbnails wrapper
        const thumbnails = document.createElement('div');
        thumbnails.setAttribute('class', 'thumbnails');

        // Initialize variables to store images and thumbnails
        this.images = [];
        this.currentImageIndex = 0;

        // Create the images and thumbnails dynamically based on attributes
        let imageIndex = 1;
        while (this.hasAttribute(`image-${imageIndex}-src`)) {
            const imgSrc = this.getAttribute(`image-${imageIndex}-src`);

            // Create image for the carousel
            const img = document.createElement('img');
            img.setAttribute('src', imgSrc);
            img.setAttribute('class', 'carousel-image');
            img.setAttribute('alt', `Carousel image ${imageIndex}`);
            if (imageIndex === 1) img.classList.add('active'); // Set the first image active

            // Add image to the images array
            this.images.push(img);
            carousel.appendChild(img);

            // Create thumbnail
            const thumbnail = document.createElement('img');
            thumbnail.setAttribute('src', imgSrc);
            thumbnail.setAttribute('class', 'thumbnail-image');
            thumbnail.setAttribute('alt', `Thumbnail image ${imageIndex}`);
            thumbnail.addEventListener('click', () => this.showImage(imageIndex - 1));  // Correct click handler

            thumbnails.appendChild(thumbnail);

            // Move to the next image
            imageIndex++;
        }

        // Append elements to the wrapper
        wrapper.appendChild(leftButton);
        wrapper.appendChild(carousel);
        wrapper.appendChild(rightButton);
        wrapper.appendChild(thumbnails);

        // Append styles for layout
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
                min-width: 100%;
                min-height: 100%;
                display: none;
                transition: opacity 0.3s ease;
                object-fit: contain;
                border-radius: 10px;
            }

            .carousel-image.active {
                display: block;
            }

            .carousel-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                padding: 10px;
                cursor: pointer;
                z-index: 1;
                font-size: 2rem;
                 border-radius: 5px;
            }

            .carousel-button.left {
                left: 10px;
            }

            .carousel-button.right {
                right: 10px;
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
                }

                .thumbnail-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                }
            }
        `;

        // Append style and wrapper to the shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    showPreviousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
    }

    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateCarousel();
    }

    showImage(index) {
        this.currentImageIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update carousel images
        this.images.forEach((img, index) => {
            img.classList.toggle('active', index === this.currentImageIndex);
        });

        // Update the thumbnails to reflect the active image
        const thumbnailImages = this.shadowRoot.querySelectorAll('.thumbnail-image');
        thumbnailImages.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentImageIndex);
        });
    }
}

// Define the custom element
customElements.define('image-carousel', ImageCarousel);
