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

    // Create a title element
    const title = document.createElement('h3');
    title.textContent = this.getAttribute('title') || 'Project Title'; // Default title

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
        padding-top: 56.25%; /* 16:9 aspect ratio */
        box-sizing: border-box;
        overflow: hidden;
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

      .project-thumbnail h3 {
        position: absolute;
        top: 10px;
        left: 10px;
        margin: 0;
        font-size: 16px;
        color: white;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for better contrast */
        padding: 5px;
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
        const newURL = `/case-studies/${studyId}.html`; // Build URL based on studyId
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

    // Append everything: styles, wrapper, link, media element, and title to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(link);  // Wrap the contents in the link
    link.appendChild(mediaElement);  // Append the media (image or video) to the link
    link.appendChild(title);  // Append the title to the link
  }
}

// Define the custom element
customElements.define('project-thumbnail', ProjectThumbnail);
