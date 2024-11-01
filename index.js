document.addEventListener('DOMContentLoaded', function () {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < windowHeight - 100) {
                reveal.classList.add('visible');
            } else {
                reveal .classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
  
}
 /*nav bar scrolling to correct place */
 
    document.querySelectorAll('.nav-link').forEach((anchor)=>{
        anchor.addEventListener('click', function (e) {
          
          if(this.getAttribute('href').charAt(0)!=='#')
          {
            return;
          }
          e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            console.log(targetId);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Adjust offset as needed
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        })
    });

/*ends*/

const triggerTabList = document.querySelectorAll('#myTab button')
triggerTabList.forEach(triggerEl => {
  const tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', event => {
    event.preventDefault()
    tabTrigger.show()
  })
})

const images = document.querySelector('.images');
const originalImageCount = document.querySelectorAll('.images img').length / 2; // Only count original images
let currentIndex = 0;
let autoScroll;

// Function to scroll images forward
function scrollImages(index) {
    images.style.transition = "transform 0.5s ease-in-out";
    images.style.transform = `translateX(-${index * 100}%)`;

    // Reset to start if the end is reached
    if (index >= originalImageCount) {
        setTimeout(() => {
            images.style.transition = "none";
            images.style.transform = "translateX(0)";
            currentIndex = 0;
        }, 3000); // Match transition time
    }
}

// Function to start auto-scrolling
function startAutoScroll() {
    autoScroll = setInterval(() => {
        currentIndex++;
        scrollImages(currentIndex);
    }, 3000); // Adjust interval as needed
}

// Manual navigation for "Next" button
document.getElementById("next").addEventListener("click", () => {
    clearInterval(autoScroll); // Pause auto-scroll
    currentIndex++;
    scrollImages(currentIndex);
    startAutoScroll(); // Resume auto-scroll
});

// Manual navigation for "Previous" button
document.getElementById("prev").addEventListener("click", () => {
    clearInterval(autoScroll); // Pause auto-scroll

    // Simulate forward movement by moving to the last image if at the start
    if (currentIndex === 0) {
        images.style.transition = "none"; // Temporarily remove transition
        images.style.transform = `translateX(-${originalImageCount * 100}%)`; // Move to the last image
        currentIndex = originalImageCount - 1;

        // Force reflow to apply transition for a smooth forward effect
        setTimeout(() => {
            images.style.transition = "transform 0.5s ease-in-out";
            scrollImages(currentIndex);
        }, 20);
    } else {
        currentIndex--;
        scrollImages(currentIndex);
    }
    
    startAutoScroll(); // Resume auto-scroll
});

// Start the initial auto-scrolling
startAutoScroll();
