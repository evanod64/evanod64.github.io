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

        // Append title and role to the title container
        titleContainer.appendChild(title);
        titleContainer.appendChild(role);
        wrapper.appendChild(titleContainer);

        // Create the first context wrapper for rich content
        const context1Wrapper = document.createElement('div');
        context1Wrapper.setAttribute('id', 'intro-project-context');

        // Use a template for context1 to preserve inline HTML like <br> and <a>
        const context1Template = document.createElement('template');
        context1Template.innerHTML = this.getAttribute('context1') || '';

        // Append the template content for context1
        context1Wrapper.appendChild(context1Template.content.cloneNode(true));
        wrapper.appendChild(context1Wrapper);

        // Create the second context wrapper for rich content
        const context2Wrapper = document.createElement('div');
        context2Wrapper.setAttribute('id', 'intro-project-context-2');

        // Use a template for context2 to preserve inline HTML like <br>
        const context2Template = document.createElement('template');
        context2Template.innerHTML = this.getAttribute('context2') || '';

        // Append the template content for context2
        context2Wrapper.appendChild(context2Template.content.cloneNode(true));
        wrapper.appendChild(context2Wrapper);

        // Append the entire wrapper to the shadow DOM
        shadow.appendChild(wrapper);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `

            h1 {
            font-family: Lausanne;
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

// Define the custom element
customElements.define('project-intro', ProjectIntro);
