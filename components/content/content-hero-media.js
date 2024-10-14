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
      
      // Create primary text content
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
  
      // Create secondary text content
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
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
  
        .title-text-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: last baseline;
        }
  
        .media-context-wrapper {
          display: flex;
          flex-direction: row;
          gap: 5vw;
        }
  
        .hero-title {
          font-size: 12vw;
           margin: 0!important;
        line-height: 1!important;
        font-family: Lausanne;
        }
  
        .hero-text-content {
          max-width: 20vw;
        }


  
       .hero-media-content {
          position: relative;
          width: 100%; /* Makes the width responsive */
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 10px;
          object-fit: cover; /* Ensures the media maintains its aspect ratio while filling the container */

        }
  
        .hero-text-content-2 {
          max-width: 20vw;
          margin-top: 0;
        }
  
        /* mobile styling */

        @media (max-width: 768px) {

        .hero-section-wrapper {
          gap: 20px;
        }

          #hero-text-content {
            max-width: 100%;
          }
          .title-text-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: last baseline;
            gap: 5vw;
          }
          .media-context-wrapper {
            display: flex;
            flex-direction: column-reverse;
            gap: 40px;
            
          }
  
          .hero-title {
            font-size: 18vw;
            margin: 0!important;
            line-height: 1!important;
           
          }

           .hero-text-content {
            max-width: 100%;
            margin: 0;
          }
  
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
  