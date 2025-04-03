// init-distortion.js
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el contenedor de la distorsión
    const container = document.getElementById('grid-distortion-container');
    if (!container) return;
    
    // Obtener la URL de la imagen de fondo del hero
    const heroElement = document.querySelector('.hero-sport');
    if (!heroElement) return;
    
    // Extraer la URL de la imagen del estilo computado
    const computedStyle = window.getComputedStyle(heroElement);
    const backgroundImage = computedStyle.backgroundImage;
    
    // Extraer la URL de la imagen del formato 'url("ruta-de-la-imagen")'
    let imageSrc = '';
    if (backgroundImage && backgroundImage !== 'none') {
      // Extraer la URL entre url() y eliminar comillas
      const matches = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
      if (matches && matches[1]) {
        imageSrc = matches[1];
      }
    }
    
    // Si no se pudo extraer una imagen, usar una por defecto
    if (!imageSrc) {
      imageSrc = 'asset/image/imagen_jumbotron.jpg';
      console.warn('No se pudo extraer la imagen de fondo. Usando imagen por defecto.');
    }
    
    console.log('Inicializando GridDistortion con imagen:', imageSrc);
    
    // Inicializar el efecto Grid Distortion
    try {
      window.gridDistortion = new GridDistortion({
        container: container,
        imageSrc: imageSrc,
        grid: 15,
        mouse: 0.1,
        strength: 0.15,
        relaxation: 0.9
      });
      console.log('GridDistortion inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar GridDistortion:', error);
    }
  });