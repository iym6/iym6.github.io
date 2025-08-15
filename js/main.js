document.addEventListener('DOMContentLoaded', function() {
  // 1. Инициализация Swiper (только если элемент существует)
  const swiperContainer = document.querySelector('.certificates-swiper');
  if (swiperContainer) {
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

  // 2. Мобильное меню (с защитой от отсутствия элементов)
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuIcon = document.querySelector('.menu-icon');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      
      // Защищенное обновление иконки
      if (menuIcon) {
        menuIcon.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
      }
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !e.target.closest('#navMenu') && 
          !e.target.closest('#mobileMenuToggle')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        if (menuIcon) menuIcon.textContent = '☰';
      }
    });
  }

  // 3. Плавная прокрутка с учетом хэдера
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      const header = document.querySelector('header');
      
      if (target && header) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Закрываем мобильное меню если оно открыто
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuToggle?.classList.remove('active');
          if (menuIcon) menuIcon.textContent = '☰';
        }
      }
    });
  });
});
