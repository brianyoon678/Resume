function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
function playVideo(){
  const video = document.querySelector('.profile-video');
  video.muted= true;
  video.play().catch(error =>{
    console.log('autoplay prevented: ' , error)
  });
}
document.addEventListener("DOMContentLoaded", playVideo);

const boxElements = document.querySelectorAll('.box');


// scroll animation 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// rotating picture
const imagePaths = [
  "experience_photos/toldaly_img_1.png",
  "experience_photos/toldaly_img_2.png",
  "experience_photos/toldaly_img_3.png"
];


let current = 0;
let showingImg1 = true;

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

setInterval(() => {
  current = (current + 1) % imagePaths.length;

  if (showingImg1) {
    img2.src = imagePaths[current];
    img2.classList.add("active");
    img1.classList.remove("active");
  } else {
    img1.src = imagePaths[current];
    img1.classList.add("active");
    img2.classList.remove("active");
  }

  showingImg1 = !showingImg1;
}, 4000); // every 3 seconds

// typewriter effect

// TYPEWRITER EFFECT - Separate from existing scroll animations
// The text to be typed
const textToType = "My Projects (To be added soon!)";

// Get typewriter elements
const typewriterContainer = document.getElementById('typewriter-container');
const typedTextElement = document.getElementById('typed-text');
const typewriterCursor = document.getElementById('cursor');

let typewriterTriggered = false;
let typewriterIndex = 0;

function typeWriterChar() {
    if (typewriterIndex < textToType.length) {
        if (typewriterCursor) typewriterCursor.classList.add('typing');
        if (typedTextElement) {
            typedTextElement.textContent += textToType.charAt(typewriterIndex);
        }
        typewriterIndex++;
        console.log(`Typing: ${typewriterIndex}/${textToType.length}`);
        setTimeout(typeWriterChar, 100); // Adjust speed here (milliseconds)
    } else {
        if (typewriterCursor) typewriterCursor.classList.remove('typing');
        console.log('Typewriter complete!');
    }
}

function startTypewriterAnimation() {
    if (typewriterTriggered || !typedTextElement || !typewriterContainer) return;
    typewriterTriggered = true;
    console.log('Starting typewriter animation...');
    
    // Clear any existing text
    typedTextElement.textContent = '';
    typewriterIndex = 0;
    
    // Start typing after a small delay
    setTimeout(typeWriterChar, 500);
}

// Create separate observer for typewriter (avoid conflict with existing observer)
if (typewriterContainer && 'IntersectionObserver' in window) {
    console.log('Typewriter: Using Intersection Observer');
    
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log(`Typewriter Intersection: ${entry.isIntersecting ? 'visible' : 'hidden'}, ratio: ${entry.intersectionRatio.toFixed(2)}`);
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                startTypewriterAnimation();
                typewriterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
        rootMargin: '0px'
    });
    
    typewriterObserver.observe(typewriterContainer);
} else if (typewriterContainer) {
    // Fallback: Scroll event listener for typewriter
    console.log('Typewriter: Using scroll fallback');
    
    function checkTypewriterScroll() {
        const rect = typewriterContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight && rect.bottom > 0;
        const visibilityRatio = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        
        console.log(`Typewriter scroll check - visible: ${isVisible}, ratio: ${visibilityRatio.toFixed(2)}`);
        
        if (isVisible && visibilityRatio >= 0.3) {
            startTypewriterAnimation();
            window.removeEventListener('scroll', checkTypewriterScroll);
        }
    }
    
    window.addEventListener('scroll', checkTypewriterScroll);
    checkTypewriterScroll(); // Check immediately
}

// Manual trigger for testing (you can remove this)
window.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') {
        typewriterTriggered = false; // Allow re-triggering
        startTypewriterAnimation();
    }
});

console.log('Typewriter script loaded - scroll to Projects section or press P to test');