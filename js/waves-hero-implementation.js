// waves-hero-implementation.js
// Este script modifica las secciones hero de la página de inicio para añadir la animación de waves

document.addEventListener('DOMContentLoaded', function() {
  // Detectar la página actual basado en el nombre de archivo
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Aplicar la animación de waves SOLO en la página de inicio
  if (currentPage === 'index.html') {
    // Identificar la sección hero
    const heroSection = document.querySelector('.hero-home');
    
    if (heroSection) {
      console.log('Añadiendo animación de waves a index.html');
      
      // Crear el contenedor para Waves
      const wavesContainer = document.createElement('div');
      wavesContainer.className = 'waves';
      
      // Insertar el contenedor como primer hijo del heroSection
      heroSection.insertBefore(wavesContainer, heroSection.firstChild);
      
      // Asegurar z-index adecuado para el hero-content
      const heroContent = heroSection.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.position = 'relative';
        heroContent.style.zIndex = '2';
      }
      
      // Inicializar Waves con la configuración
      // Verificar que la clase Waves esté disponible
      if (typeof Waves === 'function') {
        new Waves({
          lineColor: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          waveSpeedX: 0.02,
          waveSpeedY: 0.01,
          waveAmpX: 40,
          waveAmpY: 20,
          friction: 0.9,
          tension: 0.01,
          maxCursorMove: 120,
          xGap: 12,
          yGap: 36
        });
      } else {
        console.error('La clase Waves no está definida. Asegúrate de que waves.js se haya cargado correctamente.');
      }
    } else {
      console.error('No se encontró la sección hero en index.html');
    }
  }
});