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


class ContentHeroMedia extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create the main wrapper
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'hero-section-wrapper');

    // Create title text wrapper
    const titleTextWrapper = document.createElement('div');
    titleTextWrapper.setAttribute('class', 'title-text-wrapper');
    
    // Create title
    const heroTitle = document.createElement('h1');
    heroTitle.setAttribute('class', 'hero-title');
    heroTitle.textContent = this.getAttribute('hero-title') || '';

    // Get the font size from the title-text-size attribute, default to 12vw if not specified
    const titleFontSize = this.getAttribute('title-text-size') || '12vw';
    heroTitle.style.fontSize = titleFontSize;
    
    // Create primary text content (first context)
    const heroTextContent = document.createElement('p');
    heroTextContent.setAttribute('class', 'hero-text-content');
    heroTextContent.textContent = this.getAttribute('hero-text-context') || '';

    // Append title and primary text to titleTextWrapper
    titleTextWrapper.appendChild(heroTitle);
    titleTextWrapper.appendChild(heroTextContent);
    wrapper.appendChild(titleTextWrapper);

    // Create media context wrapper
    const mediaContextWrapper = document.createElement('div');
    mediaContextWrapper.setAttribute('class', 'media-context-wrapper');
    
    // Create media element (image or video)
    const mediaSrc = this.getAttribute('media-src');
    const thumbnailSrc = this.getAttribute('thumbnail-src');
    const mediaElement = document.createElement(mediaSrc.endsWith('.mp4') ? 'video' : 'img');
    mediaElement.setAttribute('class', 'hero-media-content');
    mediaElement.setAttribute('src', mediaSrc);
    mediaElement.setAttribute('loading', 'lazy');
    

    // Add controls attribute for video elements
    if (mediaSrc.endsWith('.mp4')) {
      mediaElement.setAttribute('controls', '');
      mediaElement.setAttribute('poster', thumbnailSrc);
    }

    // Create secondary text content (second context)
    const heroTextContent2 = document.createElement('p');
    heroTextContent2.setAttribute('class', 'hero-text-content-2');
    heroTextContent2.textContent = this.getAttribute('hero-text-content-2') || 'Default secondary context';

    // Append media and secondary text to mediaContextWrapper
    mediaContextWrapper.appendChild(mediaElement);
    mediaContextWrapper.appendChild(heroTextContent2);
    wrapper.appendChild(mediaContextWrapper);

    // Append styles
    const style = document.createElement('style');
    style.textContent = `
      .hero-section-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto auto;
        gap: 40px;
        align-items: center;
      }

      .title-text-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column: span 4;
        grid-row: 1 / 2;
        gap: 5vw;
        align-items: last baseline;
      }

      p.hero-text-content {
        grid-column: 4 / 5;
        max-width: 100%;
        padding: 0;
        margin: 0;
        align-self: last baseline;
      }

      .hero-title {
        grid-column: span 3;
        padding: 0;
        margin: 0;
        align-self: last baseline;
        font-family: Lausanne;
        -moz-osx-font-smoothing: grayscale;
       -webkit-font-smoothing: antialiased;
      }

      .media-context-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column: span 4;
        grid-row: 2 / 3;
        gap: 5vw;
      }

      .hero-media-content {
        grid-column: span 3;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 10px;
        object-fit: cover;
      }

      .hero-text-content-2 {
        grid-column: 4 / 5;
        max-width: 100%;
      }

      /*--------- mobile styling ------------*/

      @media (max-width: 768px) {
        .hero-section-wrapper {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 32px;
        }

        .title-text-wrapper {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 32px;
        }

        .media-context-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .hero-title {
          font-size: 10vw;
          padding: 0;
          margin: 0;
        }

        .hero-text-content,
        .hero-text-content-2 {
          max-width: 100%;
          margin: 0;
        }
      }
    `;

    // Append style and wrapper to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

// Define the custom element
customElements.define('content-hero-media', ContentHeroMedia);


class VideoBlock extends HTMLElement {
    constructor() {
      super();
  
      // Attach shadow DOM
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create a wrapper div for the video block
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'video-block');
  
      // Set up styles inside the shadow DOM
      const style = document.createElement('style');
      style.textContent = `
        .video-block {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 10px;
        }
  
        .video-block video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
  
        .thumbnail {
          display: none;
        }
      `;
  
      // Determine video source, autoplay, controls, and thumbnail functionality
      const videoSrc = this.getAttribute('video-src');
      const autoplay = this.getAttribute('autoplay') || 'no';
      const controls = this.getAttribute('controls') || 'yes'; // Default to 'yes' for controls
      const thumbnailSrc = this.getAttribute('thumbnail-src'); // Thumbnail for the poster attribute
      const mediaElement = document.createElement('video');
  
      mediaElement.src = videoSrc;
      mediaElement.setAttribute('class', 'media-content');
  
      // Set the thumbnail image as the poster
      if (thumbnailSrc) {
        mediaElement.setAttribute('poster', thumbnailSrc);
      }
  
      // Autoplay logic
      if (autoplay === 'yes') {
        mediaElement.autoplay = true;
        mediaElement.loop = true;
        mediaElement.muted = true; // Mute when autoplaying
        mediaElement.playsInline = true;
      }
  
      // Controls logic
      if (controls === 'yes') {
        mediaElement.controls = true; // Show controls for audio if autoplay is enabled
        mediaElement.muted = autoplay === 'yes'; // If autoplay is 'yes', keep it muted by default
      }
  
      // Handle video metadata to get the natural aspect ratio and adjust the container
      mediaElement.addEventListener('loadedmetadata', () => {
        const videoAspectRatio = mediaElement.videoHeight / mediaElement.videoWidth;
        wrapper.style.paddingTop = `${videoAspectRatio * 100}%`; // Dynamically set the padding based on video aspect ratio
      });
  
      // Append everything: styles, wrapper, and media element to the shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.appendChild(mediaElement); // Append the video to the wrapper
    }
  }
  
  // Define the custom element
  customElements.define('video-block', VideoBlock);
  

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
                max-width: 100%;
                margin: 0 auto;
                padding-top: 64px;
                padding-bottom: 64px;
            }

            .carousel {
                width: 70%;
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


class ProjectThumbnail extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a wrapper div with the project-thumbnail class
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'project-thumbnail');

    // Create a link element
    const link = document.createElement('a');
    link.style.cursor = 'pointer'; // Indicate that the thumbnail is clickable

    // Create a div to wrap both titles
    const titleWrapper = document.createElement('div');
    titleWrapper.setAttribute('class', 'title-wrapper');

    // Create the main title element
    const title = document.createElement('h3');
    title.textContent = this.getAttribute('title') || 'Project Title'; // Default title

    // Create the secondary title element ("title-context")
    const titleContext = document.createElement('h3');
    titleContext.textContent = this.getAttribute('title-context') || 'Project Context'; // Default context title
    titleContext.setAttribute('class', 'title-context');

    // Apply the `data-study-id` to the outer wrapper
    const studyId = this.getAttribute('data-study-id');
    if (studyId) {
      wrapper.setAttribute('data-study-id', studyId);
    }

    // Set up styles inside the shadow DOM
    const style = document.createElement('style');
    style.textContent = `
      .project-thumbnail {
        position: relative;
        width: 100%; /* Makes the width responsive */
        padding-top: 60%; /* 16:9 aspect ratio */
        box-sizing: border-box;
        overflow: hidden;
      }



      @media (max-width: 768px) {
            .project-thumbnail {
        position: relative;
        width: 100%; /* Makes the width responsive */
        padding-top: 80%;
        box-sizing: border-box;
        overflow: hidden;
      }
      }

      .project-thumbnail img, .project-thumbnail video {
        position: absolute;
        border-radius: 10px;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures the media maintains its aspect ratio while filling the container */
      }

      .title-wrapper {
        position: absolute;
        top: 10px;
        left: 10px;
        width: calc(100% - 20px); /* Prevents overlap */
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .project-thumbnail h3 {
      font-family: Lato;
        margin: 0;
        font-size: 16px;
        color: white;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for better contrast */

        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 10px;
      }

      .title-context {
        font-size: 16px;
        color: white;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for better contrast */
        font-family: Lato;
        font-weight: 400;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 0;
        border-radius: 10px;
      }

      .project-thumbnail a {
        text-decoration: none; /* Removes underline from the link */
        color: inherit; /* Ensures the link inherits the current text color */
        display: block; /* Ensures the link covers the entire wrapper */
        width: 100%;
        height: 100%;
      }
    `;

    // Determine if we should display an image or a video
    const imgSrc = this.getAttribute('img-src');
    const videoSrc = this.getAttribute('video-src');
    let mediaElement;

    if (videoSrc) {
      // Create a video element if `video-src` is provided
      mediaElement = document.createElement('video');
      mediaElement.src = videoSrc;
      mediaElement.autoplay = true;
      mediaElement.loop = true;
      mediaElement.muted = true;
      mediaElement.playsInline = true; // Ensures no fullscreen on mobile
      mediaElement.setAttribute('class', 'media-content');
    } else if (imgSrc) {
      // Create an img element if `img-src` is provided
      mediaElement = document.createElement('img');
      mediaElement.src = imgSrc;
      mediaElement.alt = this.getAttribute('alt') || 'Project Thumbnail';
      mediaElement.loading = 'lazy'; // Lazy loading attribute
      mediaElement.setAttribute('class', 'media-content');
    }

    // Handle click event for navigation
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior

      // Get the studyId and navigate to the appropriate case study page
      if (studyId) {
        const newURL = `/${studyId}.html`; // Build URL based on studyId
        window.location.href = newURL; // Navigate to the new page
      }

      // Dispatch a custom event with the study ID (optional for other handlers)
      this.dispatchEvent(new CustomEvent('case-study-click', {
        detail: {
          studyId: studyId
        },
        bubbles: true,
        composed: true
      }));
    });

    // Append everything: styles, wrapper, link, media element, and titles to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(link); // Wrap the contents in the link
    link.appendChild(mediaElement); // Append the media (image or video) to the link

    // Append both titles to the titleWrapper, then append it to the link
    titleWrapper.appendChild(title);
    titleWrapper.appendChild(titleContext);
    link.appendChild(titleWrapper);
  }
}

// Define the custom element
customElements.define('project-thumbnail', ProjectThumbnail);


class ProjectIntro extends HTMLElement {
    constructor() {
        super();
        
        // Attach shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the wrapper
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'intro-wrapper');

        // Create the title container
        const titleContainer = document.createElement('div');
        titleContainer.setAttribute('id', 'intro-title-container');
        
        const title = document.createElement('h1');
        title.setAttribute('class', 'intro-title');
        title.textContent = this.getAttribute('title') || '';

        const role = document.createElement('p');
        role.setAttribute('class', 'intro-role');
        role.textContent = this.getAttribute('role') || '';

        titleContainer.appendChild(title);
        titleContainer.appendChild(role);
        wrapper.appendChild(titleContainer);

     
        const context1Wrapper = document.createElement('div');
        context1Wrapper.setAttribute('id', 'intro-project-context');

     
        const context1Template = document.createElement('template');
        context1Template.innerHTML = this.getAttribute('context1') || '';

       
        context1Wrapper.appendChild(context1Template.content.cloneNode(true));
        wrapper.appendChild(context1Wrapper);

       
        const context2Wrapper = document.createElement('div');
        context2Wrapper.setAttribute('id', 'intro-project-context-2');

      
        const context2Template = document.createElement('template');
        context2Template.innerHTML = this.getAttribute('context2') || '';

    
        context2Wrapper.appendChild(context2Template.content.cloneNode(true));
        wrapper.appendChild(context2Wrapper);

      
        shadow.appendChild(wrapper);

       
        const style = document.createElement('style');
        style.textContent = `

            h1 {
            font-family: Lausanne;
                -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
            }

            #intro-wrapper {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 5vw;
                padding-top: 64px;
                padding-bottom: 120px;
                justify-content: center;
            }

            #intro-title-container {
                grid-column: span 2;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                min-width: 0; /* prevent overflow */
            }

            .intro-title {
                margin: 0 0 16px 0;
                font-size: 2rem;
            }

            .intro-role {
                margin: 0;
                font-size: 1.2rem;
                color: #666;
            }

            #intro-project-context,
            #intro-project-context-2 {
                grid-column: span 1;
                min-width: 0; /* prevent overflow */
            }

            #intro-project-context a,
            #intro-project-context-2 a {
                text-decoration: none;
                color: #929191;
            }

            #intro-project-context a:hover,
            #intro-project-context-2 a:hover {
                text-decoration: underline;
                color: black;
            }

            /* tablet style */
            @media (max-width: 1024px) and (min-width: 768px) {
                #intro-wrapper {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 5vw;
                }

                #intro-title-container {
                    grid-column: span 2;
                }

                #intro-project-context,
                #intro-project-context-2 {
                    grid-column: span 1;
                }
            }

            /* mobile styling */
            @media (max-width: 768px) {
                #intro-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-lg);
                    margin-top: var(--space-xxl);
                    margin-bottom: var(--space-xxl);
                }

                #intro-title-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                #intro-project-context,
                #intro-project-context-2 {
                    max-width: 100%;
                }
            }
        `;
        shadow.appendChild(style);
    }
}


customElements.define('project-intro', ProjectIntro);


// Lazy loading using Intersection Observer for both images and videos
document.addEventListener("DOMContentLoaded", function() {
  const lazyMedia = document.querySelectorAll('img[loading="lazy"], video[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const mediaObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const media = entry.target;

         
          if (media.tagName.toLowerCase() === 'img') {
            media.src = media.dataset.src; 
          }

         
          if (media.tagName.toLowerCase() === 'video') {
            media.src = media.dataset.src; 
            media.load(); 
          }

          media.classList.remove('lazy');
          mediaObserver.unobserve(media); 
        }
      });
    });

    lazyMedia.forEach(function(media) {
      mediaObserver.observe(media); 
    });
  }
});