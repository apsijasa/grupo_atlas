// waves-hero-implementation.js
// Este script modifica las secciones hero de las páginas específicas para añadir la animación de waves

document.addEventListener('DOMContentLoaded', function() {
    // Detectar la página actual basado en el nombre de archivo
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Aplicar la animación de waves solo en las páginas específicas
    if (['index.html', 'atlas_sport.html', 'constructora.html', 'consulting.html'].includes(currentPage)) {
      // 1. Identificar la sección hero
      let heroSection;
      
      if (currentPage === 'index.html') {
        heroSection = document.querySelector('.hero-home');
      } else if (currentPage === 'atlas_sport.html') {
        heroSection = document.querySelector('.hero-sport');
      } else if (currentPage === 'constructora.html') {
        heroSection = document.querySelector('.hero-constructora');
      } else if (currentPage === 'consulting.html') {
        heroSection = document.querySelector('.hero-consulting');
      }
      
      if (heroSection) {
        console.log(`Añadiendo animación de waves a ${currentPage}`);
        
        // 2. Crear el contenedor para Waves
        const wavesContainer = document.createElement('div');
        wavesContainer.className = 'waves';
        
        // 3. Insertar el contenedor como primer hijo del heroSection
        // Comprobar si existe un grid-distortion-container en atlas_sport.html
        const gridDistortionContainer = heroSection.querySelector('#grid-distortion-container');
        if (gridDistortionContainer && currentPage === 'atlas_sport.html') {
          // Si existe, insertar después del grid-distortion-container
          heroSection.insertBefore(wavesContainer, gridDistortionContainer.nextSibling);
        } else {
          // En otros casos, insertar como primer hijo
          heroSection.insertBefore(wavesContainer, heroSection.firstChild);
        }
        
        // 4. Asegurar z-index adecuado para el hero-content
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.position = 'relative';
          heroContent.style.zIndex = '2';
        }
        
        // 5. Inicializar Waves con la configuración
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
        console.error(`No se encontró la sección hero en ${currentPage}`);
      }
    }
  });