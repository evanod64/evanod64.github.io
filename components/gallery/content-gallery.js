class ContentGallery extends HTMLElement {
    constructor() {
        super();

        // Attach shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the gallery wrapper
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'gallery-wrapper');

        // Get user-defined attributes
        const columnCount = this.getAttribute('columns') || 3;
        const aspectRatio = this.getAttribute('aspect-ratio') || '16/9'; 
        const gap = this.getAttribute('gap') || '16px';

        // Create the images from attributes
        let imageIndex = 1;
        while (this.hasAttribute(`image-${imageIndex}-src`)) {
            const imgSrc = this.getAttribute(`image-${imageIndex}-src`);

            // Create a figure element for each image
            const figure = document.createElement('figure');
            figure.setAttribute('class', 'gallery-item');

            // Create img element
            const img = document.createElement('img');
            img.setAttribute('src', imgSrc);
            img.setAttribute('alt', `Gallery image ${imageIndex}`);
            img.setAttribute('loading', 'lazy');

            // Add image to figure
            figure.appendChild(img);

            // Append figure to the wrapper
            wrapper.appendChild(figure);

            // Move to the next image
            imageIndex++;
        }

        // Append styles for layout
        const style = document.createElement('style');
        style.textContent = `
            .gallery-wrapper {
                display: grid;
                grid-template-columns: repeat(${columnCount}, 1fr);
                gap: ${gap};
            }

            .gallery-item {
                position: relative;
                padding-top: calc(100% / (${aspectRatio})); /* Maintain aspect ratio */
                overflow: hidden;
            }

            figure.gallery-item {
             margin: 0;
            }

          

            .gallery-item img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
            }

            @media (max-width: 768px) {
                .gallery-wrapper {
                    grid-template-columns: repeat(2, 1fr); /* Adjust to 2 columns on mobile */
                }
            }

       
        `;

        // Attach style and wrapper to shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

// Define the custom element
customElements.define('content-gallery', ContentGallery);
