// init-distortion.js
document.addEventListener('DOMContentLoaded', () => {
    // Obtener la ruta de la imagen actual del hero
    const heroElement = document.querySelector('.hero-sport');
    const computedStyle = window.getComputedStyle(heroElement);
    const backgroundImage = computedStyle.backgroundImage;
    
    // Extraer la URL de la imagen del estilo CSS
    let imageSrc = '';
    if (backgroundImage !== 'none') {
      // Extraer la ruta de la imagen del formato 'url("ruta-de-la-imagen")'
      imageSrc = backgroundImage.slice(4, -1).replace(/"/g, '');
    } else {
      // Si no hay imagen de fondo, usar una imagen por defecto
      imageSrc = 'img/hero-bg.jpg'; // Ajusta esta ruta a tu imagen por defecto
    }
    
    // Inicializar el efecto Grid Distortion
    const container = document.getElementById('grid-distortion-container');
    
    const gridDistortion = new GridDistortion({
      container: container,
      imageSrc: imageSrc,
      grid: 15,
      mouse: 0.1,
      strength: 0.15,
      relaxation: 0.9
    });
    
    // Almacenar la instancia para poder limpiarla si es necesario
    window.gridDistortion = gridDistortion;
  });