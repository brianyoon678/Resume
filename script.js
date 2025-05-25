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