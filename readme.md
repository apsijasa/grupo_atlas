# Grupo Atlas - Sitio Web Corporativo

## 📋 Descripción

Sitio web corporativo para **Grupo Atlas**, una empresa diversificada que ofrece soluciones integrales en múltiples sectores estratégicos. El proyecto presenta un ecosistema de empresas especializadas que se complementan para brindar servicios de consultoría, construcción, análisis deportivo, desarrollo web y salud.

## 🏢 Empresas del Grupo

### 1. **RenovaCare**
- **Sector**: Servicios de salud y bienestar
- **Descripción**: Plataforma de telemedicina y servicios de salud mental y física
- **URL**: [https://apsijasa.github.io/renovafit/](https://apsijasa.github.io/renovafit/)

### 2. **Atlas Sport**
- **Sector**: Análisis de datos deportivos
- **Servicios**: Recolección y análisis de datos deportivos, métricas de rendimiento
- **Página**: `atlas_sport.html`

### 3. **Constructora Atlas**
- **Sector**: Construcción e infraestructura
- **Especialidades**: Infraestructura deportiva, proyectos energéticos, construcción sustentable
- **Página**: `constructora.html`

### 4. **Atlas Consulting**
- **Sector**: Consultoría estratégica
- **Especialidades**: eSports, proyectos deportivos, energéticos, gestión de cambio
- **Página**: `consulting.html`

### 5. **Atlas Servicios Web**
- **Sector**: Desarrollo digital
- **Servicios**: Desarrollo web, aplicaciones móviles, IA, automatización
- **Página**: `web_services.html`

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con variables CSS y grid/flexbox
- **JavaScript**: Funcionalidades interactivas y validaciones
- **Font Awesome 6.4.0**: Iconografía
- **Google Fonts (Inter)**: Tipografía moderna

### Características Técnicas
- ✅ **Diseño Responsivo**: Adaptable a móviles, tablets y desktop
- ✅ **SEO Optimizado**: Meta tags, Open Graph, Schema.org
- ✅ **Accesibilidad**: Navegación por teclado, alt text, ARIA
- ✅ **Performance**: Imágenes optimizadas, CSS minificado
- ✅ **Cross-browser**: Compatible con navegadores modernos

## 📁 Estructura del Proyecto

```
grupo-atlas/
├── index.html              # Página principal
├── constructora.html       # Constructora Atlas
├── consulting.html         # Atlas Consulting  
├── contacto.html          # Página de contacto
├── web_services.html      # Servicios Web
├── css/
│   └── style.css          # Estilos principales
├── js/
│   └── main.js           # JavaScript funcional
├── asset/
│   └── image/            # Imágenes del sitio
│       ├── favicon-16x16.png
│       ├── Centro-acuatico.jpg
│       ├── consulting web.jpg
│       ├── cemento-piscina.jpg
│       └── ...           # Otras imágenes
└── README.md             # Este archivo
```

## 🎨 Características de Diseño

### Sistema de Colores
```css
/* Colores principales */
--primary-color: #0056b3
--secondary-color: #007bff
--accent-color: #00a8ff

/* Colores por servicio */
--sport-accent: #007bff        /* Atlas Sport */
--construction-accent: #28a745  /* Constructora */
--consulting-accent: #6f42c1   /* Consulting */
--web-accent: #fd7e14          /* Servicios Web */
--health-accent: #e83e8c       /* RenovaCare */
```

### Componentes Reutilizables
- **Cards responsivas** con hover effects
- **Grid system** flexible
- **Botones** con múltiples variantes
- **Formularios** con validación
- **Navegación** con dropdown
- **Hero sections** personalizables

## ⚡ Funcionalidades

### Navegación
- **Menú responsivo** con hamburger en móvil
- **Smooth scroll** entre secciones
- **Dropdown menus** para servicios
- **Active state** automático según página

### Formularios
- **Formulario de contacto** con validación
- **Newsletter subscription**
- **Validación en tiempo real**
- **Integración con FormSubmit**

### Interactividad
- **Portfolio filters** dinámicos
- **Animaciones on scroll**
- **Botón de WhatsApp** flotante
- **Notificaciones** personalizadas

### Optimización
- **Lazy loading** de imágenes
- **Throttling** en eventos de scroll
- **Debouncing** en resize
- **Error handling** global

## 📱 Contacto e Integración

### Información de Contacto
- **Teléfono**: +56 9 8509 5780
- **Email**: info@grupoatlas.cl
- **WhatsApp**: Integrado con botón flotante
- **Ubicación**: Santiago, Chile

### Integraciones
- **FormSubmit**: Para formularios de contacto
- **Google Analytics**: Ready (configurar gtag)
- **Schema.org**: Datos estructurados implementados
- **Open Graph**: Para redes sociales

## 🛠 Instalación y Uso

### Requisitos
- Navegador web moderno
- Servidor web (para desarrollo local)

### Instalación Local
```bash
# Clonar o descargar el proyecto
git clone [url-del-repositorio]

# Navegar al directorio
cd grupo-atlas

# Servir con un servidor local
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js (live-server)
npx live-server

# Opción 3: PHP
php -S localhost:8000
```

### Despliegue
El sitio es estático y se puede desplegar en:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3 + CloudFront**
- Cualquier servidor web

## 🔧 Configuración

### Personalización de Colores
Editar las variables CSS en `css/style.css`:
```css
:root {
  --primary-color: #tu-color;
  --secondary-color: #tu-color;
  /* ... */
}
```

### Configuración de Formularios
1. **Cambiar email destino** en `contacto.html`:
```html
<form action="https://formsubmit.co/tu-email@dominio.com">
```

2. **Configurar URLs** de redirección post-envío

### Google Analytics
Agregar tu tracking ID en los archivos HTML:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

## 📊 SEO y Analytics

### Meta Tags Implementados
- **Title tags** descriptivos por página
- **Meta descriptions** optimizadas
- **Keywords** relevantes
- **Open Graph** para redes sociales
- **Twitter Cards**

### Schema.org
- **Organization** markup
- **ContactPage** markup
- **Service** markup por empresa
- **LocalBusiness** datos

## 🔄 Actualizaciones y Mantenimiento

### Tareas Regulares
- [ ] Actualizar contenido de proyectos
- [ ] Revisar enlaces externos
- [ ] Optimizar imágenes nuevas
- [ ] Verificar formularios
- [ ] Actualizar información de contacto

### Mejoras Sugeridas
- [ ] Implementar CMS para gestión de contenido
- [ ] Agregar blog/noticias
- [ ] Integrar chat en vivo
- [ ] Implementar PWA
- [ ] Agregar multiidioma

## 📄 Licencia

© 2025 Grupo Atlas. Todos los derechos reservados.

## 🤝 Contribución

Para sugerir mejoras o reportar problemas:
1. Crear issue en el repositorio
2. Fork del proyecto
3. Crear branch para cambios
4. Submit pull request

## 📞 Soporte

Para soporte técnico o consultas:
- **Email**: info@grupoatlas.cl
- **WhatsApp**: +56 9 8509 5780
- **Horario**: Lunes a Viernes 9:00-18:00, Sábados 9:00-13:00

---

**Grupo Atlas** - *Soluciones integrales para un mundo en constante evolución*