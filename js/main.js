document.addEventListener('DOMContentLoaded', function() {
  // Инициализация Swiper с проверкой существования контейнера
  const certSwiperContainer = document.querySelector('.certificates-swiper');
  if (certSwiperContainer) {
    new Swiper('.certificates-swiper', {
      loop: true,
      slidesPerView: 1,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination-fixed',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet-fixed',
        bulletActiveClass: 'swiper-pagination-bullet-fixed-active',
        renderBullet: function (index, className) {
          return `<span class="${className}"></span>`;
        },
      },
      navigation: {
        nextEl: '.swiper-button-next-fixed',
        prevEl: '.swiper-button-prev-fixed',
      },
    });
  }
// Enhanced Mobile Menu
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuIcon = document.querySelector('.menu-icon');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      
      if (menuIcon){
        menuIcon.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
      }
      
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('#navMenu') && 
        !e.target.closest('#mobileMenuToggle')) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      if (menuIcon){
      menuIcon.textContent = '☰';
      }
    }
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  if (anchorLinks.length > 0) {
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          const header = document.querySelector('.header-nav');
          const headerHeight = header ? header.offsetHeight : 0;
          
          window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  }
});