
const audio = document.getElementById('myAudio');
const icon = document.getElementById('playIcon');
const label = document.getElementById('playSoundLabel');

icon.addEventListener('click', () => {
  const audio = document.getElementById('myAudio');
  audio.volume = 0.4; // 40% volume
  if(audio.paused){
    audio.play();
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    label.textContent = 'Pause Sound';    
  } else {
    audio.pause();
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    label.textContent = 'Play Sound';
  }
});

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('active');
  } else {
    backToTopButton.classList.remove('active');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  document.title = savedTheme === 'dark' ? 'Portfolio | Dark Mode' : 'Portfolio | Light Mode';
  updateIcon(savedTheme);
});

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  updateIcon(newTheme);
  localStorage.setItem('theme', newTheme);
  document.title = newTheme === 'dark' ? 'Portfolio | Dark Mode' : 'Portfolio | Light Mode';
});

themeToggle.addEventListener('mouseover', () => {
  const currentTheme = html.getAttribute('data-theme');
  themeToggle.title = currentTheme === 'light'
    ? 'Switch to Dark Mode 🌙'
    : 'Switch to Light Mode ☀️';
});

function updateIcon(theme) {
  if (theme === 'dark') {
    themeToggle.classList.remove('fa-moon');
    themeToggle.classList.add('fa-sun');
    themeToggle.title = 'Switch to Light Mode ☀️';
  } else {
    themeToggle.classList.remove('fa-sun');
    themeToggle.classList.add('fa-moon');
    themeToggle.title = 'Switch to Dark Mode 🌙';
  }
}

function openModal(projectId) {
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const closeButtons = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal'); // Add this line

  // Close modal when close button is clicked
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close modal when clicking outside the content
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbw0qjw3N83TsxU27g1GndCAk6ddY-eoRQ7IZSSFlqFcniWriTyDuqgTR1B0S41r_heo/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      if (response.ok) {
        msg.innerHTML = "Message sent successfully!";
        msg.style.color = "green";
        setTimeout(function() {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      } else {
        msg.innerHTML = "Error sending message.";
      }
    })
    .catch(error => {
      msg.innerHTML = "Error sending message.";
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').substring(1) === current) {
      item.classList.add('active');
    }
  });
});

// Animate on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animated');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
// Initial check on page load
animateOnScroll();

// Animate skill bars
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = '0';
    
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 500);
  });
};

// Check if skills section is in view and animate
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      observer.unobserve(entry.target);
    }
  });
});

if (skillsSection) {
  observer.observe(skillsSection);
}

// Animate stats counter
const animateStats = () => {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / 100;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateStats(), 20);
    } else {
      counter.innerText = target;
    }
  });
};

// Check if about section is in view and animate stats
const aboutSection = document.getElementById('about');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
});

if (aboutSection) {
  statsObserver.observe(aboutSection);
}

// Testimonials Slider Functionality - MOVED OUTSIDE OF DOMContentLoaded
const testimonialsModal = document.getElementById('testimonials-modal');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevButton = document.querySelector('.testimonial-arrow.prev');
const nextButton = document.querySelector('.testimonial-arrow.next');
const closeButton = document.querySelector('.testimonials-close');

let currentSlide = 0;
const totalSlides = testimonialSlides.length;

// Open testimonials modal - MUST be global for onclick to work
window.openTestimonials = function() {
  console.log('openTestimonials function called');
  if (testimonialsModal) {
    testimonialsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    goToSlide(0);
  } else {
    console.error('Testimonials modal not found');
  }
}

// Close testimonials modal
function closeTestimonials() {
  if (testimonialsModal) {
    testimonialsModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Go to specific slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  if (testimonialTrack) {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Update active dot
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

// Initialize testimonials when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing testimonials...');
  
  // Event listeners for testimonials
  if (closeButton) {
    closeButton.addEventListener('click', closeTestimonials);
  }
  
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }
  
  // Dot navigation
  testimonialDots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      goToSlide(slideIndex);
    });
  });
  
  // Close modal when clicking outside content
  if (testimonialsModal) {
    testimonialsModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeTestimonials();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && testimonialsModal && testimonialsModal.classList.contains('active')) {
      closeTestimonials();
    }
  });
  
  // Keyboard navigation for slider
  document.addEventListener('keydown', function(e) {
    if (testimonialsModal && testimonialsModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    }
  });
  
  console.log('Testimonials initialized');
});