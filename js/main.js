document.addEventListener('DOMContentLoaded', function() {
  const certSwiper = new Swiper('.certificates-swiper', {
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  
  // Кастомная пагинация
  pagination: {
    el: '.swiper-pagination-fixed',
    clickable: true,
    bulletClass: 'swiper-pagination-bullet-fixed',
    bulletActiveClass: 'swiper-pagination-bullet-fixed-active',
    renderBullet: function (index, className) {
      return `<span class="${className}"></span>`;
    },
  },
  
  // Кастомная навигация
  navigation: {
    nextEl: '.swiper-button-next-fixed',
    prevEl: '.swiper-button-prev-fixed',
  },
});

  // Остальной ваш код...
});
// Enhanced Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuIcon = document.querySelector('.menu-icon');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      menuIcon.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('#navMenu') && 
        !e.target.closest('#mobileMenuToggle')) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      menuIcon.textContent = '☰';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
});

