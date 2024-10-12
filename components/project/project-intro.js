class ProjectIntro extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'role', 'context1', 'context2'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <div id="intro-wrapper">
                <div id="intro-title-container">
                    <h1 class="intro-title">${this.getAttribute('title')}</h1>
                    <p class="intro-role">${this.getAttribute('role')}</p>
                </div>
                
                <div id="intro-project-context">
                    <p class="intro-text-context">
                        ${this.getAttribute('context1')}
                    </p>
                </div>
                
                <div id="intro-project-context-2">
                    <p class="intro-text-content-2">
                        ${this.getAttribute('context2').replace(/,/g, '<br>')}
                    </p>
                </div>
            </div>
            <style>
                #intro-wrapper {
                    display: flex;
                    flex-direction: row;
                    gap: 5vw;
                    justify-content: space-between;
                    margin-top: var(--space-xxl);
                    margin-bottom: 120px;
                }
                
                #intro-title-container {
                    min-width: 30vw;
                }

                #intro-project-context {
                    min-width: 20vw;
                    max-width: 25vw;
                }

                #intro-project-context-2 {
                    min-width: 20vw;
                    max-width: 25vw;
                }

                /* tablet style */
                @media (max-width: 1024px) and (min-width: 768px) {
                    #intro-title-container {
                        min-width: 30vw;
                    }
                }

                /* mobile styling */
                @media (max-width: 768px) {
                    #intro-wrapper {
                        flex-direction: column;
                        gap: var(--space-lg);
                        margin-top: var(--space-xxl);
                        margin-bottom: var(--space-xxl);
                    }

                    #intro-project-context,
                    #intro-project-context-2 {
                        max-width: 100%;
                    }
                }
            </style>
        `;
    }
}

// Define the new element
customElements.define('project-intro', ProjectIntro);
