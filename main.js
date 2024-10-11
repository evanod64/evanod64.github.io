function initHoverEffect() {
    const hoverWords = document.querySelectorAll('.hover-word');

    hoverWords.forEach(word => {
        word.addEventListener('mouseover', () => {
            const newImage = word.getAttribute('data-image');
            const dynamicImage = document.getElementById('dynamic-image');
            dynamicImage.src = newImage;  // Set the image source
            dynamicImage.style.opacity = "1";  // Show the image on hover
        });

        word.addEventListener('mouseout', () => {
            const dynamicImage = document.getElementById('dynamic-image');
            dynamicImage.style.opacity = "0";  // Hide the image when not hovering
        });
    });
}



const hoverWords2 = document.querySelectorAll('.hover-word-2');

hoverWords2.forEach(word => {
    word.addEventListener('mouseover', () => {
        const newImage = word.getAttribute('data-image');
        window.parent.postMessage({ image: newImage, section: 'section2' }, '*');  // Send the image URL to the parent window with section info
    });

    word.addEventListener('mouseout', () => {
        window.parent.postMessage({ image: null, section: 'section2' }, '*');  // Send null image for reset
    });
});


window.addEventListener('message', (event) => {
    
    if (event.data.section === 'section2') {  // Check if the message is for the correct section
        const dynamicImage = document.getElementById('dynamic-image-2');
        if (event.data.image) {
            dynamicImage.src = event.data.image;  // Change the image source based on the message
        } else {
            // Optionally reset to a default image if necessary
            dynamicImage.src = "https://images.squarespace-cdn.com/content/5e28bcdb6e962366618ef23b/a72b8b70-2f3e-4439-a695-71f1c9c9c9ae/20230505_sol_p400_rooftop_041+2.png?content-type=image%2Fpng";
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // List of hobbies to randomly select from
    const hobbies = ["Rug making", "Woodworking", "Illumination", "Horticulture", "Making a terrarium", "Learning to sew"];

    // Function to replace the placeholder text with a random hobby
    function setRandomHobby() {
        const randomHobby = hobbies[Math.floor(Math.random() * hobbies.length)];
        const hobbyElement = document.getElementById("random-hobby");
        if (hobbyElement) {
            hobbyElement.textContent = randomHobby;
        }
    }

    // Set the random hobby when the page loads
    setRandomHobby();
});









          // ------------------------------------------------------------------------------------------------------ //





// Function to load and inject HTML content
function injectHomepageContent(placeholderId) {
    fetch('/homepage-content.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById(placeholderId).innerHTML = data;
      })
      .catch(error => console.error('Error loading homepage content:', error));
  }
  
  // For homepage
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    injectHomepageContent('homepage-placeholder');
    initHoverEffect();
    console.log('initHoverEffects');
  }
  
  // For case study pages
  else {
    injectHomepageContent('homepage-placeholder'); // Inject homepage content at the bottom of case study
    initHoverEffect();
  }
  


  

  


// Track if the case study has already been unloaded to prevent multiple unloads
let caseStudyUnloaded = false;

// Function to unload case study content and reset URL
function unloadCaseStudy() {
    const caseStudyContent = document.getElementById('case-study-content');
    
    if (!caseStudyUnloaded && window.scrollY > caseStudyContent.scrollHeight) {
        // Unload the case study content
        caseStudyContent.innerHTML = ''; // Clear or hide the case study content
        
        // Update the URL to the homepage without reloading the page
        history.pushState(null, null, '/');
        
        // Mark the case study as unloaded
        caseStudyUnloaded = true;
        
        console.log('Case study content unloaded and URL changed to homepage');
    }
}

// Function to monitor scroll position and detect when to unload case study
function handleScroll() {
    const caseStudyContent = document.getElementById('case-study-content');
    const homepageContent = document.getElementById('homepage-placeholder');
    
    // Ensure both the case study content and homepage content exist
    if (caseStudyContent && homepageContent) {
        const homepageTop = homepageContent.offsetTop;
        
        // Check if the user has scrolled past the case study content and into the homepage content
        if (window.scrollY >= homepageTop && !caseStudyUnloaded) {
            unloadCaseStudy();
        }
    }
}

// Add scroll event listener for all pages
window.addEventListener('scroll', handleScroll);

// Inject homepage content into all case studies
function injectHomepageContent(placeholderId) {
    fetch('/homepage-content.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById(placeholderId).innerHTML = data;
      })
      .catch(error => console.error('Error loading homepage content:', error));
}

// For homepage
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    injectHomepageContent('homepage-placeholder');
}

// For case study pages (general case for all case studies)
else {
    injectHomepageContent('homepage-placeholder'); // Inject homepage content at the bottom of the case study
}





