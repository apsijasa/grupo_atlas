/* =========================================
   GRUPO ATLAS - JAVASCRIPT UNIFICADO
   Versión Simplificada 2025
   ========================================= */

(function() {
    'use strict';
    
    // Variables globales
    let isScrolling = false;
    let lastScrollTop = 0;
    
    // ========================================
    // INICIALIZACIÓN
    // ========================================
    
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initSmoothScroll();
        initPortfolioFilters();
        initContactForm();
        initNewsletterForm();
        initScrollEffects();
        initWhatsAppButton();
        initAnimationsOnScroll();
        
        console.log('Grupo Atlas - Sitio cargado correctamente');
    });
    
    // ========================================
    // NAVEGACIÓN
    // ========================================
    
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdowns = document.querySelectorAll('.dropdown');
        
        // Toggle menú móvil
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Cambiar icono del toggle
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.className = navMenu.classList.contains('active') ? 
                        'fas fa-times' : 'fas fa-bars';
                }
            });
        }
        
        // Cerrar menú al hacer click en un enlace (móvil)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu?.classList.remove('active');
                    const icon = navToggle?.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            });
        });
        
        // Cerrar menú al hacer click fuera (móvil)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !navToggle?.contains(e.target) && 
                !navMenu?.contains(e.target)) {
                navMenu?.classList.remove('active');
                const icon = navToggle?.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
        
        // Manejo de dropdowns en móvil
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
        
        // Marcar enlace activo basado en la página actual
        setActiveNavLink();
    }
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === 'index.html' && href === '#home') ||
                (currentPage === '' && href === '#home')) {
                link.classList.add('active');
            }
        });
    }
    
    // ========================================
    // SCROLL SUAVE
    // ========================================
    
    function initSmoothScroll() {
        // Scroll suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Verificar que el enlace no esté vacío y que el elemento exista
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // ========================================
    // EFECTOS DE SCROLL
    // ========================================
    
    function initScrollEffects() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Efecto header al hacer scroll
            if (header) {
                if (scrollTop > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                    header.style.backdropFilter = 'blur(15px)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.backdropFilter = 'blur(10px)';
                }
            }
            
            lastScrollTop = scrollTop;
        }, 100));
    }
    
    // ========================================
    // FILTROS DE PORTFOLIO
    // ========================================
    
    function initPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterButtons.length === 0 || portfolioItems.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Actualizar botón activo
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar elementos
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========================================
    // FORMULARIO DE CONTACTO
    // ========================================
    
    function initContactForm() {
        const contactForm = document.getElementById('contactForm') || 
                          document.querySelector('.contact-form form');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            if (validateContactForm(this)) {
                // Aquí normalmente enviarías el formulario
                showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
                this.reset();
            }
        });
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
    
    function validateContactForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validación específica para email
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && !isValidEmail(emailField.value)) {
            showFieldError(emailField, 'Por favor ingresa un correo electrónico válido');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Limpiar errores previos
        clearFieldError(field);
        
        // Validar campo requerido
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo es requerido');
            isValid = false;
        }
        
        // Validación específica por tipo
        switch (field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showFieldError(field, 'Correo electrónico inválido');
                    isValid = false;
                }
                break;
            case 'tel':
                if (value && !isValidPhone(value)) {
                    showFieldError(field, 'Número de teléfono inválido');
                    isValid = false;
                }
                break;
        }
        
        // Validación de longitud mínima
        const minLength = field.getAttribute('minlength');
        if (minLength && value.length > 0 && value.length < parseInt(minLength)) {
            showFieldError(field, `Mínimo ${minLength} caracteres`);
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remover mensaje de error previo
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Crear nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--danger-color)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--space-xs)';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.field-error');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
    
    // ========================================
    // FORMULARIO DE NEWSLETTER
    // ========================================
    
    function initNewsletterForm() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                if (emailInput && isValidEmail(emailInput.value)) {
                    showNotification('¡Suscripción exitosa! Gracias por unirte.', 'success');
                    emailInput.value = '';
                } else {
                    showNotification('Por favor ingresa un correo electrónico válido.', 'error');
                }
            });
        });
    }
    
    // ========================================
    // BOTÓN DE WHATSAPP
    // ========================================
    
    function initWhatsAppButton() {
        // Crear botón de WhatsApp
        const whatsappButton = document.createElement('a');
        whatsappButton.href = 'https://wa.me/56985095780';
        whatsappButton.target = '_blank';
        whatsappButton.rel = 'noopener noreferrer';
        whatsappButton.className = 'whatsapp-button';
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
        whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp');
        
        // Estilos del botón
        const styles = `
            .whatsapp-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background-color: #25d366;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                text-decoration: none;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                transition: all 0.3s ease;
                opacity: 0;
                transform: scale(0);
            }
            
            .whatsapp-button:hover {
                background-color: #128c7e;
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
            
            .whatsapp-button.show {
                opacity: 1;
                transform: scale(1);
            }
            
            @media (max-width: 768px) {
                .whatsapp-button {
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                    bottom: 15px;
                    right: 15px;
                }
            }
        `;
        
        // Agregar estilos al documento
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // Agregar botón al DOM
        document.body.appendChild(whatsappButton);
        
        // Mostrar botón después de un delay
        setTimeout(() => {
            whatsappButton.classList.add('show');
        }, 2000);
        
        // Tracking de clics (opcional)
        whatsappButton.addEventListener('click', function() {
            // Google Analytics o similar
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'WhatsApp Button'
                });
            }
        });
    }
    
    // ========================================
    // ANIMACIONES AL HACER SCROLL
    // ========================================
    
    function initAnimationsOnScroll() {
        // Crear observer para animaciones
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Elementos a animar
        const animatedElements = document.querySelectorAll(`
            .service-card, 
            .company-card, 
            .portfolio-item, 
            .value-item,
            .about-content > *,
            .section-header
        `);
        
        animatedElements.forEach(el => {
            // Configurar estado inicial
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Observar elemento
            observer.observe(el);
        });
    }
    
    // ========================================
    // UTILIDADES
    // ========================================
    
    // Throttle para optimizar eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Debounce para optimizar eventos de resize
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
    
    // Validación de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validación de teléfono (formato chileno)
    function isValidPhone(phone) {
        const phoneRegex = /^(\+?56|0)?[1-9]\d{8}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }
    
    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        // Remover notificación existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: 'var(--border-radius)',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: 'var(--box-shadow-lg)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? 'var(--success-color)' : 
                           type === 'error' ? 'var(--danger-color)' : 
                           'var(--info-color)'
        });
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
    
    // ========================================
    // MANEJO DE ERRORES
    // ========================================
    
    window.addEventListener('error', function(e) {
        console.error('Error en Grupo Atlas:', e.error);
        // En producción, aquí podrías enviar el error a un servicio de logging
    });
    
    // ========================================
    // API PÚBLICA
    // ========================================
    
    // Exponer funciones útiles globalmente
    window.GrupoAtlas = {
        showNotification: showNotification,
        validateEmail: isValidEmail,
        validatePhone: isValidPhone
    };
    
})();