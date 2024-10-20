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
  