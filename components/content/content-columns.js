class ContentColumns extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'content-columns');

    // Create wrapper for content
    const contentWrapper = document.createElement('div');
    contentWrapper.setAttribute('class', 'content-wrapper');

    // Get the number of columns from the attribute or default to 4
    const totalColumns = this.getAttribute('columns') || 4;

    // Get the global aspect ratio for all images (or default to '3 / 2')
    const globalAspectRatio = this.getAttribute('aspect-ratio') || '3 / 2';

    // Get background color and text color attributes (with default values)
    const backgroundColor = this.getAttribute('background-color') || 'transparent';
    const textColor = this.getAttribute('text-color') || '#000'; // Default to black text

    // Dynamically add content and images based on attributes
    let contentCount = 1;
    let imageCount = 1;

    // Check for title and add if it exists
    const titleText = this.getAttribute('content-columns-title');
    if (titleText) {
      const title = document.createElement('h2');
      title.setAttribute('class', 'content-columns-title');
      title.textContent = titleText;
      wrapper.appendChild(title); // Only append if title exists
    }

    // Loop through and check for content and image attributes
    while (this.getAttribute(`content-${contentCount}`) || this.getAttribute(`image-${imageCount}-src`)) {
      // Check if there's content (paragraph)
      if (this.getAttribute(`content-${contentCount}`)) {
        const paragraph = document.createElement('p');
        paragraph.setAttribute('class', 'content-paragraph');
        this._addBreaks(paragraph, this.getAttribute(`content-${contentCount}`));

        // Get the span for this paragraph or default to 1 column
        const contentSpan = this.getAttribute(`content-${contentCount}-span`) || 1;
        paragraph.style.gridColumn = `span ${contentSpan}`;

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

        const captionText = this.getAttribute(`caption-${imageCount}`);
        if (captionText) {
          const caption = document.createElement('p');
          caption.setAttribute('class', 'image-caption');
          this._addBreaks(caption, captionText); // Apply line breaks if caption exists
          imageContainer.appendChild(caption); // Append caption only if it exists
        }

        // Get the span for this image or default to 1 column
        const imageSpan = this.getAttribute(`image-${imageCount}-span`) || 1;
        imageContainer.style.gridColumn = `span ${imageSpan}`;

        // Apply the global aspect ratio to the image
        image.style.aspectRatio = globalAspectRatio;

        imageContainer.appendChild(image);
        contentWrapper.appendChild(imageContainer);

        imageCount++;  // Move to next image block
      }
    }

    // Append wrapper to the main wrapper
    wrapper.appendChild(contentWrapper);

    // Append styles
    const style = document.createElement('style');
    style.textContent = `

      .content-columns {
        background-color: ${backgroundColor}; /* Apply background color */
        color: ${textColor}; /* Apply text color */
      }

      h2 {
        font-family: Lausanne;
        color: ${textColor}; /* Apply text color to title */
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
      }

      .content-columns-title {
        padding-bottom: 40px;
        margin-top: 0;
        margin-bottom: 0;
      }

      .content-wrapper {
        display: grid;
        grid-template-columns: repeat(${totalColumns}, 1fr);  /* Dynamic columns */
        gap: 40px;
         align-items: flex-start;
      }

      .content-paragraph {
        max-width: 100%;
        font-size: 0.9em;
      }

      .image-container {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-start;
        width: 100%;
      }

      .content-image {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
      }

      .image-caption {
        text-align: left;
        margin-top: 16px;  /* Space between image and caption */
        font-size: 0.9em;
        color: ${textColor}; /* Apply text color to caption */
      }

      p {
        margin-top: 0px;
        margin-bottom: 0px;
      }

      @media (max-width: 1024px) {
        .content-wrapper {
          grid-template-columns: repeat(2, 1fr);  /* Default to 2 columns for tablets */
        }
      }

      @media (max-width: 768px) {
        .content-wrapper {
          grid-template-columns: 1fr;  /* Single column on mobile */
        }
      }
    `;

    // Attach everything to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  // Custom method to handle line breaks using <br> tags
  _addBreaks(element, text) {
    const textParts = text.split('\n');  // Split on newlines
    textParts.forEach((part, index) => {
      if (index > 0) {
        element.appendChild(document.createElement('br'));  // Add <br> between text parts
      }
      if (part.trim() !== "") {
        element.appendChild(document.createTextNode(part));  // Add the text part
      }
    });
  }
}

// Define the custom element
customElements.define('content-columns', ContentColumns);
