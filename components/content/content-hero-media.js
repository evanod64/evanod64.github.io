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
    const mediaElement = document.createElement(mediaSrc.endsWith('.mp4') ? 'video' : 'img');
    mediaElement.setAttribute('class', 'hero-media-content');
    mediaElement.setAttribute('src', mediaSrc);
    mediaElement.setAttribute('loading', 'lazy');

    // Add controls attribute for video elements
    if (mediaSrc.endsWith('.mp4')) {
      mediaElement.setAttribute('controls', ''); // Adding controls for video
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
        padding-top: 64px;
        padding-bottom: 64px;
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
