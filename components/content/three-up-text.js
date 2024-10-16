class ThreeUpText extends HTMLElement {
    constructor() {
      super();
  
      // Attach shadow DOM
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create wrapper div
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'three-up-text');
  
      // Create title
      const title = document.createElement('h2');
      title.setAttribute('class', 'three-up-title');
      title.textContent = this.getAttribute('three-up-title') || 'Content Section Title';
  
      // Create wrapper for paragraphs
      const threeUpWrapper = document.createElement('div');
      threeUpWrapper.setAttribute('class', 'three-up-wrapper');
  
      // Create paragraphs
      const content1 = document.createElement('p');
      content1.setAttribute('class', 'three-up-content');
      content1.textContent = this.getAttribute('content-1') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  
      const content2 = document.createElement('p');
      content2.setAttribute('class', 'three-up-content');
      content2.textContent = this.getAttribute('content-2') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  
      const content3 = document.createElement('p');
      content3.setAttribute('class', 'three-up-content');
      content3.textContent = this.getAttribute('content-3') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  
      // Append paragraphs to the wrapper
      threeUpWrapper.appendChild(content1);
      threeUpWrapper.appendChild(content2);
      threeUpWrapper.appendChild(content3);
  
      // Append title and wrapper to the main wrapper
      wrapper.appendChild(title);
      wrapper.appendChild(threeUpWrapper);
  
      // Append styles
      const style = document.createElement('style');
      style.textContent = `
        .three-up-title {
          padding-bottom: 40px;
                  margin-top: 0;
        margin-bottom: 0;
        }
  
        .three-up-content {
          max-width: 25vw;
        }
  
        .three-up-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 80px;
        }
            p {
            max-width: 100%;
            margin-top: 0px;
            margin-bottom: 0px;
          }
  
        @media (max-width: 768px) {
          .three-up-wrapper {
            flex-direction: column;
            gap: 40px;
          }
  
          .three-up-content {
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
  customElements.define('three-up-text', ThreeUpText);
  