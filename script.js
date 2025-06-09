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