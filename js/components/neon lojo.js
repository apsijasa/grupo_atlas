// NeonLogo.js
// Componente React para aplicar efectos neón al logotipo

const NeonLogo = function() {
    const [glitching, setGlitching] = React.useState(false);
    const logoRef = React.useRef(null);
    
    // Efecto de inicialización
    React.useEffect(() => {
        // Encontrar el logo SVG en el DOM
        const logoSVG = document.querySelector('.logo-svg');
        if (logoSVG) {
            logoRef.current = logoSVG;
            
            // Reemplazar el logotipo actual con uno mejorado
            enhanceLogo();
            
            // Iniciar efectos periódicos
            const glitchInterval = setInterval(() => {
                // Probabilidad aleatoria de activar el efecto glitch
                if (Math.random() < 0.1) {
                    triggerGlitchEffect();
                }
            }, 3000);
            
            // Limpieza al desmontar
            return () => clearInterval(glitchInterval);
        }
    }, []);
    
    // Función para mejorar el logo con filtros SVG
    const enhanceLogo = () => {
        if (!logoRef.current) return;
        
        // Crear filtros SVG para efectos neón
        const svg = logoRef.current;
        
        // Verificar si ya existe un defs
        let defs = svg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            svg.prepend(defs);
        }
        
        // Filtro de resplandor neón
        defs.innerHTML = `
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="glitchEffect" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="turbulence" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8e44ad" />
                <stop offset="100%" stop-color="#1abc9c" />
            </linearGradient>
        `;
        
        // Aplicar efectos a las partes del logo
        const paths = svg.querySelectorAll('path');
        if (paths.length >= 2) {
            // Triángulo principal
            paths[0].setAttribute('fill', '#16151d'); // Color de fondo oscuro
            paths[0].setAttribute('filter', 'url(#neonGlow)');
            
            // Triángulo interior
            paths[1].setAttribute('fill', 'url(#techGradient)');
            paths[1].setAttribute('filter', 'url(#neonGlow)');
        }
    };
    
    // Función para activar efecto glitch temporal
    const triggerGlitchEffect = () => {
        if (!logoRef.current || glitching) return;
        
        setGlitching(true);
        
        const paths = logoRef.current.querySelectorAll('path');
        if (paths.length >= 2) {
            // Guardar filtros originales
            const originalFilters = Array.from(paths).map(path => path.getAttribute('filter'));
            
            // Aplicar efecto glitch
            paths.forEach(path => {
                path.setAttribute('filter', 'url(#glitchEffect)');
            });
            
            // Restaurar después de un breve momento
            setTimeout(() => {
                paths.forEach((path, index) => {
                    path.setAttribute('filter', originalFilters[index] || '');
                });
                setGlitching(false);
            }, 200);
        }
    };
    
    // Este componente no renderiza elementos visibles propios
    // Solo modifica elementos existentes en el DOM
    return null;
};