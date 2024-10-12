class MasonryGallery extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      shadow.innerHTML = `
        <style>
          .masonry {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
            grid-auto-rows: 200px; /* Base height for each row unit */
            gap: 10px;
            overflow: clip;
            
          }
  
          .masonry-item {
            background-color: #ddd;
            border: 1px solid #ccc;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            
          }
  
          /* Image styling */
          .masonry-item img {
            width: 100%;
            height: auto;
            display: block;
            
          }
        </style>
        <div class="masonry">
          <slot></slot> <!-- This will allow content insertion -->
        </div>
      `;
  
      this.adjustMasonryLayout = this.adjustMasonryLayout.bind(this);
    }
  
    connectedCallback() {
      this.adjustMasonryLayout();
      window.addEventListener('resize', this.adjustMasonryLayout); // Recalculate on resize
    }
  
    disconnectedCallback() {
      window.removeEventListener('resize', this.adjustMasonryLayout);
    }
  
    adjustMasonryLayout() {
      const masonry = this.shadowRoot.querySelector('.masonry');
      const masonryItems = masonry.querySelectorAll('.masonry-item');
  
      masonryItems.forEach((item) => {
        const contentHeight = item.querySelector('img').getBoundingClientRect().height;
        const rowSpan = Math.ceil(contentHeight / 10); // Divide by row height (10px)
        item.style.gridRowEnd = `span ${rowSpan}`;
      });
    }
  }
  
  customElements.define('masonry-gallery', MasonryGallery);
  