class ContentColumns extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'content-columns');

    // Create title
    const title = document.createElement('h2');
    title.setAttribute('class', 'content-columns-title');
    title.textContent = this.getAttribute('content-columns-title') || 'Content Section Title';
    
    // Create wrapper for content
    const contentWrapper = document.createElement('div');
    contentWrapper.setAttribute('class', 'content-wrapper');

    // Dynamically add content and images based on attributes
    let contentCount = 1;
    let imageCount = 1;
    
    // Loop through and check for content and image attributes
    while (this.getAttribute(`content-${contentCount}`) || this.getAttribute(`image-${imageCount}-src`)) {
      // Check if there's content (paragraph)
      if (this.getAttribute(`content-${contentCount}`)) {
        const paragraph = document.createElement('p');
        paragraph.setAttribute('class', 'content-paragraph');
        paragraph.textContent = this.getAttribute(`content-${contentCount}`);
        contentWrapper.appendChild(paragraph);
        contentCount++;  // Move to next content block
      }

      // Check if there's an image
      if (this.getAttribute(`image-${imageCount}-src`)) {
        const imageContainer = document.createElement('div');
        imageContainer.setAttribute('class', 'image-container');
        
        const image = document.createElement('img');
        image.setAttribute('class', 'content-image');
        image.setAttribute('src', this.getAttribute(`image-${imageCount}-src`));
        image.setAttribute('alt', this.getAttribute(`image-${imageCount}-alt`) || `Image ${imageCount}`);
        
        const caption = document.createElement('p');
        caption.setAttribute('class', 'image-caption');
        caption.textContent = this.getAttribute(`caption-${imageCount}`) || `Caption for Image ${imageCount}`;
        
        imageContainer.appendChild(image);
        imageContainer.appendChild(caption);
        contentWrapper.appendChild(imageContainer);
        
        imageCount++;  // Move to next image block
      }
    }

    // Append title and wrapper to the main wrapper
    wrapper.appendChild(title);
    wrapper.appendChild(contentWrapper);

    // Append styles
    const style = document.createElement('style');
    style.textContent = `
      .content-columns-title {
        padding-bottom: 40px;
        margin-top: 0;
        margin-bottom: 0;
      }

      .content-paragraph {
       max-width: 33vw;
        min-width: 20vw;
      }

      .content-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 40px;
      }

      .image-container {
        display: flex;
        flex-direction: column;
        align-items: left;
        min-width: 20vw;
        width: 100%;
      }

      .content-image {
        width: 100%;
        aspect-ratio: 3 / 2;
        object-fit: cover;
        border-radius: 10px;
      }

      .image-caption {
        text-align: left;
        margin-top: 10px;
        font-size: 0.9em;
        color: #555;
      }

      p {
        margin-top: 0px;
        margin-bottom: 0px;
      }

      @media (max-width: 768px) {
        .content-wrapper {
          flex-direction: column;
          gap: 40px;
        }
                p {
        max-width: 100%;
        margin-top: 0px;
        margin-bottom: 0px;
      }

        .content-paragraph {
          max-width: 100%;
        }

        .image-container {
        max-width: 100%;}

        .content-image {
          max-width: 100%;
        }
      }
    `;

    // Attach everything to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

// Define the custom element
customElements.define('content-columns', ContentColumns);
