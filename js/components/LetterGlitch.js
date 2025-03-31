// LetterGlitch.js
// Componente de fondo con efecto de letras dinámicas tipo "glitch"

// Definición del componente
const LetterGlitch = function({ glitchSpeed = 50, centerVignette = true, outerVignette = false, smooth = true }) {
    const containerRef = React.useRef(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });
    const [matrix, setMatrix] = React.useState([]);
    const charsRef = React.useRef('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/[]{}|=+-*_$#@!?');
    
    // Setup inicial y manejo de cambio de tamaño
    React.useEffect(() => {
        if (!containerRef.current) return;
        
        const updateSize = () => {
            const { offsetWidth, offsetHeight } = containerRef.current;
            setSize({ width: offsetWidth, height: offsetHeight });
        };
        
        window.addEventListener('resize', updateSize);
        updateSize();
        
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    // Generar matriz inicial de caracteres
    React.useEffect(() => {
        if (size.width === 0 || size.height === 0) return;
        
        const charWidth = 10; // Aproximado para fuente monospace
        const charHeight = 16; // Aproximado para fuente monospace
        
        const cols = Math.ceil(size.width / charWidth);
        const rows = Math.ceil(size.height / charHeight);
        
        const newMatrix = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push(charsRef.current.charAt(Math.floor(Math.random() * charsRef.current.length)));
            }
            newMatrix.push(row);
        }
        
        setMatrix(newMatrix);
    }, [size]);
    
    // Efecto de glitch - actualización periódica de caracteres
    React.useEffect(() => {
        if (matrix.length === 0) return;
        
        const interval = setInterval(() => {
            setMatrix(prevMatrix => {
                return prevMatrix.map(row => {
                    return row.map(char => {
                        return Math.random() < 0.03 ? 
                            charsRef.current.charAt(Math.floor(Math.random() * charsRef.current.length)) : 
                            char;
                    });
                });
            });
        }, glitchSpeed);
        
        return () => clearInterval(interval);
    }, [matrix, glitchSpeed]);
    
    // Estilos del componente
    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'rgba(142, 68, 173, 0.05)'
    };
    
    const textStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        fontFamily: 'monospace',
        fontSize: '16px',
        lineHeight: '1',
        color: 'rgba(255, 255, 255, 0.7)',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'pre',
        opacity: smooth ? 0.5 : 0.7
    };
    
    const vignetteStyle = centerVignette ? {
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, rgba(142, 68, 173, 0.8) 70%)',
        zIndex: 2
    } : null;
    
    const outerVignetteStyle = outerVignette ? {
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(142, 68, 173, 0.8) 0%, transparent 70%)',
        zIndex: 2
    } : null;
    
    return React.createElement('div', { ref: containerRef, style: containerStyle },
        React.createElement('div', { style: textStyle },
            matrix.map((row, i) => 
                React.createElement('div', { key: i }, row.join(''))
            )
        ),
        centerVignette && React.createElement('div', { style: vignetteStyle }),
        outerVignette && React.createElement('div', { style: outerVignetteStyle })
    );
};