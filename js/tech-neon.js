// Efectos interactivos para la sección de tecnologías

document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar en la página de servicios web
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage !== 'web_services.html') return;
    
    const techItems = document.querySelectorAll('.tech-item');
    if (!techItems.length) return;
    
    // Función para seleccionar elementos aleatorios y aplicar efectos
    function randomPulseEffect() {
        // Eliminar efectos anteriores
        techItems.forEach(item => {
            item.classList.remove('pulse-neon');
        });
        
        // Seleccionar entre 1 y 3 elementos aleatorios
        const numElements = Math.floor(Math.random() * 3) + 1;
        const selectedIndices = new Set();
        
        while (selectedIndices.size < numElements && selectedIndices.size < techItems.length) {
            const randomIndex = Math.floor(Math.random() * techItems.length);
            selectedIndices.add(randomIndex);
        }
        
        // Aplicar el efecto de pulsación
        selectedIndices.forEach(index => {
            techItems[index].classList.add('pulse-neon');
        });
        
        // Programar próxima pulsación
        setTimeout(randomPulseEffect, Math.random() * 4000 + 3000);
    }
    
    // Iniciar efectos
    randomPulseEffect();
    
    // Efecto de hover interactivo para categorías de tecnología
    const techCategories = document.querySelectorAll('.tech-category');
    
    techCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            // Escalar suavemente
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            
            // Efecto de partículas en el borde superior
            createParticleEffect(this);
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Función para crear efecto de partículas
    function createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('tech-particle');
            
            // Estilos para la partícula
            Object.assign(particle.style, {
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: getRandomColor(),
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 1000,
                opacity: 1,
                transition: 'all 1s ease'
            });
            
            // Posición inicial
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            document.body.appendChild(particle);
            
            // Animación
            setTimeout(() => {
                // Posición final (movimiento ascendente)
                const endX = startX + (Math.random() * 100 - 50);
                const endY = startY - Math.random() * 100;
                
                Object.assign(particle.style, {
                    left: `${endX}px`,
                    top: `${endY}px`,
                    opacity: 0,
                    transform: 'scale(0)'
                });
                
                // Eliminar partícula después de la animación
                setTimeout(() => {
                    document.body.removeChild(particle);
                }, 1000);
            }, 10);
        }
    }
    
    // Función para obtener color aleatorio en formato neón
    function getRandomColor() {
        const colors = [
            '#8e44ad', // Púrpura
            '#1abc9c', // Turquesa
            '#3498db', // Azul
            '#f39c12', // Naranja
            '#e74c3c'  // Rojo
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Efecto de interactividad en hover para los elementos de tecnología
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            // Añadir resplandor extra
            this.style.textShadow = '0 0 5px #fff, 0 0 10px ' + getRandomColor();
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });
});