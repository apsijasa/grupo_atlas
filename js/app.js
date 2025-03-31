// app.js - Punto de entrada principal para los componentes React

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Detectar la página actual basado en el nombre de archivo
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Componentes específicos para web_services.html
    if (currentPage === 'web_services.html') {
        // Verificar si existe el contenedor para LetterGlitch
        const letterGlitchContainer = document.getElementById('letter-glitch-container');
        if (letterGlitchContainer) {
            // Renderizar el componente LetterGlitch
            ReactDOM.render(
                React.createElement(LetterGlitch, { 
                    glitchSpeed: 50, 
                    centerVignette: true, 
                    outerVignette: false, 
                    smooth: true 
                }),
                letterGlitchContainer
            );
            console.log('LetterGlitch montado correctamente en web_services.html');
        }
        
        // Crear contenedor para el componente NeonLogo
        const neonLogoContainer = document.createElement('div');
        neonLogoContainer.id = 'neon-logo-container';
        document.body.appendChild(neonLogoContainer);
        
        // Renderizar el componente NeonLogo
        ReactDOM.render(
            React.createElement(NeonLogo),
            neonLogoContainer
        );
        console.log('NeonLogo montado correctamente en web_services.html');
    }
    
    // Aquí puedes agregar más inicializaciones para otras páginas
    // Por ejemplo:
    
    // Componentes específicos para atlas_sport.html
    if (currentPage === 'atlas_sport.html') {
        // Código para inicializar componentes en atlas_sport.html
    }
    
    // Componentes específicos para constructora.html
    if (currentPage === 'constructora.html') {
        // Código para inicializar componentes en constructora.html
    }
    
    // Componentes específicos para consulting.html
    if (currentPage === 'consulting.html') {
        // Código para inicializar componentes en consulting.html
    }
    
    // Componentes globales que pueden aparecer en varias páginas
    // Por ejemplo, un componente de testimonios animados, gráficos interactivos, etc.
    
    // Ejemplo: Inicializar componentes comunes en todas las páginas
    const commonContainers = document.querySelectorAll('.react-common-container');
    if (commonContainers.length > 0) {
        commonContainers.forEach(container => {
            // Obtener el tipo de componente a renderizar desde un atributo data
            const componentType = container.dataset.componentType;
            
            // Renderizar el componente apropiado según el tipo
            if (componentType === 'example') {
                // ReactDOM.render(React.createElement(ExampleComponent), container);
            }
        });
    }
});

// Función auxiliar para cargar dinámicamente componentes React
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Error al cargar el script: ${src}`));
        document.head.appendChild(script);
    });
}