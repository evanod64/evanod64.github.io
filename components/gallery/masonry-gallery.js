class MasonryGallery extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a wrapper div for the gallery
    const galleryWrapper = document.createElement('div');
    galleryWrapper.setAttribute('class', 'masonry-gallery');

    // Get the number of columns from the attribute, with a fallback to 3 columns
    const columns = this.getAttribute('columns') || 3;

    // Create a style element for the masonry grid
    const style = document.createElement('style');
    style.textContent = `
      .masonry-gallery {
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        grid-auto-flow: dense;
        grid-gap: 10px; 
        padding-top: var(--space-120);
        padding-bottom: var(--space-120);
      }

      .masonry-gallery img {
        width: 100%;
        height: 100%; /* Ensure it covers the container */
        display: block;
        object-fit: cover; /* Crop the image to fit the container */
        border-radius: 10px;
      }

      /* Set the row height dynamically to match the image aspect ratio */
      .masonry-gallery .grid-item {
        grid-row: span var(--row-span);
        break-inside: avoid;
        height: auto; /* Ensure height adapts to row span */
        overflow: hidden; /* Hide overflow if the image is cropped */
      }

      @media (max-width: 768px) {
        .masonry-gallery {
          grid-template-columns: repeat(2, 1fr); 
          grid-gap: 5px;
        }
      }

      
      }
    `;

    // Append styles to the shadow DOM
    shadow.appendChild(style);

    // Dynamically calculate row span for each image
    const images = this.querySelectorAll('img');
    images.forEach((img) => {
      const gridItem = document.createElement('div');
      gridItem.setAttribute('class', 'grid-item');

      // Clone the image into the grid item
      const imgClone = img.cloneNode(true);
      gridItem.appendChild(imgClone);

      // Append the grid item to the gallery
      galleryWrapper.appendChild(gridItem);

      // Load the image to calculate row span based on the actual image height
      imgClone.onload = () => {
        const rowHeight = 10; // Set this to the grid-gap size
        const imageHeight = imgClone.getBoundingClientRect().height;

        // Add the row gap to the image height for consistent spacing
        const rowSpan = Math.ceil((imageHeight + rowHeight) / rowHeight);

        gridItem.style.setProperty('--row-span', rowSpan);
      };
    });

    // Append the gallery to the shadow DOM
    shadow.appendChild(galleryWrapper);
  }
}

// Define the custom element
customElements.define('masonry-gallery', MasonryGallery);
