/**
 * Electrician_life - Professional Website JavaScript
 * Developed by Christian Herencia
 * https://christian-freelance.us/
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Language Toggle Functionality
    // ========================================
    const langToggle = document.getElementById('lang-toggle');
    const langOptions = langToggle.querySelectorAll('.lang-option');
    let currentLang = 'en';
    
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        
        langOptions.forEach(option => {
            if (option.dataset.lang === currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        updateLanguage(currentLang);
    });
    
    function updateLanguage(lang) {
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update all elements with data-en and data-es attributes
        const translatableElements = document.querySelectorAll('[data-en][data-es]');
        
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            
            // Handle elements with HTML content
            if (element.classList.contains('read-more')) {
                element.innerHTML = lang === 'en' ? 'Learn More →' : 'Leer Más →';
            } else {
                element.textContent = text;
            }
        });
        
        // Save preference to localStorage
        localStorage.setItem('preferred-lang', lang);
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-lang');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        langOptions.forEach(option => {
            if (option.dataset.lang === currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        updateLanguage(currentLang);
    }
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // Carousel Functionality
    // ========================================
    const carouselTrack = document.getElementById('carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselDots = document.getElementById('carousel-dots');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots
    carouselSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        resetInterval();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }
    
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    carouselNext.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    carouselPrev.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
            resetInterval();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
            resetInterval();
        }
    }
    
    // Start carousel
    startInterval();
    
    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Modal Functionality (Privacy & Cookies)
    // ========================================
    const privacyModal = document.getElementById('privacy-modal');
    const cookiesModal = document.getElementById('cookies-modal');
    const privacyClose = document.getElementById('privacy-close');
    const cookiesClose = document.getElementById('cookies-close');
    const privacyLinks = document.querySelectorAll('a[href="#privacy"]');
    const cookiesLinks = document.querySelectorAll('a[href="#cookies"]');
    
    privacyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.classList.add('active');
        });
    });
    
    cookiesLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            cookiesModal.classList.add('active');
        });
    });
    
    privacyClose.addEventListener('click', function() {
        privacyModal.classList.remove('active');
    });
    
    cookiesClose.addEventListener('click', function() {
        cookiesModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            privacyModal.classList.remove('active');
        }
        if (e.target === cookiesModal) {
            cookiesModal.classList.remove('active');
        }
    });
    
    // ========================================
    // Update Current Year in Footer
    // ========================================
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe blog cards
    document.querySelectorAll('.blog-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe contact items
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe feature items
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--primary-color)';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    });
    
    // ========================================
    // Parallax Effect for Hero Section
    // ========================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < hero.offsetHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
    
    // ========================================
    // Lazy Loading for Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // Performance: Debounce Function
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ========================================
    // Keyboard Navigation Support
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            privacyModal.classList.remove('active');
            cookiesModal.classList.remove('active');
        }
        
        // Carousel navigation with arrow keys
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });
    
    // ========================================
    // Console Message (Developer Credit)
    // ========================================
    console.log('%c⚡ Electrician_life Website', 'color: #f39c12; font-size: 24px; font-weight: bold;');
    console.log('%cDeveloped by Christian Herencia', 'color: #2c3e50; font-size: 14px;');
    console.log('%chttps://christian-freelance.us/', 'color: #3498db; font-size: 12px; text-decoration: underline;');
    
});
