// whatsapp-button.js
// Script para agregar un botón flotante de WhatsApp en todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    // Crear el elemento del botón de WhatsApp
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/56985095780'; // Reemplazar con el número real de WhatsApp
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp');
    
    // Añadir el ícono de WhatsApp
    const icon = document.createElement('i');
    icon.className = 'fab fa-whatsapp';
    whatsappButton.appendChild(icon);
    
    // Agregar notificación visual (opcional)
    const notification = document.createElement('div');
    notification.className = 'whatsapp-notification';
    whatsappButton.appendChild(notification);
    
    // Insertar el botón en el documento
    document.body.appendChild(whatsappButton);
    
    // Animación de entrada (opcional)
    setTimeout(() => {
        whatsappButton.style.animation = 'fadeIn 0.5s forwards';
    }, 1000);
    
    // Evento de click para análisis (opcional)
    whatsappButton.addEventListener('click', function() {
        // Si se implementa Google Analytics u otra herramienta de análisis
        if (typeof gtag === 'function') {
            gtag('event', 'click', {
                'event_category': 'WhatsApp',
                'event_label': 'WhatsApp Button Click'
            });
        }
    });
});