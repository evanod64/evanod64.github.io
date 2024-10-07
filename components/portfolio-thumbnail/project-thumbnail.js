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

      .project-thumbnail img {
        position: absolute;
        border-radius: 10px;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures the image maintains its aspect ratio while filling the container */
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

    // Create an img element for the background image
    const img = document.createElement('img');
    img.src = this.getAttribute('img-src') || ''; // Default: no image
    img.alt = this.getAttribute('alt') || 'Project Thumbnail';

    // Trigger custom event for case study loading
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior

      // Dispatch a custom event with the study ID
      this.dispatchEvent(new CustomEvent('case-study-click', {
        detail: {
          studyId: studyId
        },
        bubbles: true,
        composed: true
      }));
    });

    // Append everything: styles, wrapper, link, img, and title to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(link);  // Wrap the contents in the link
    link.appendChild(img);
    link.appendChild(title);
  }
}

// Define the custom element
customElements.define('project-thumbnail', ProjectThumbnail);
