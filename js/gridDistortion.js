// GridDistortion.js - Sin módulos ES6
class GridDistortion {
    constructor(options) {
      this.container = options.container;
      this.imageSrc = options.imageSrc;
      this.grid = options.grid || 15;
      this.mouse = options.mouse || 0.1;
      this.strength = options.strength || 0.15;
      this.relaxation = options.relaxation || 0.9;
      
      this.imageAspect = 1;
      this.containerRef = this.container;
      this.initialData = null;
  
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.uniforms = null;
      this.dataTexture = null;
      this.mouseState = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };
  
      this.init();
    }
  
    init() {
      // Create scene
      this.scene = new THREE.Scene();
      
      // Create renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.containerRef.appendChild(this.renderer.domElement);
  
      // Create camera
      this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
      this.camera.position.z = 2;
  
      // Create uniforms
      this.uniforms = {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        uTexture: { value: null },
        uDataTexture: { value: null },
      };
  
      // Load texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(this.imageSrc, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        this.imageAspect = texture.image.width / texture.image.height;
        this.uniforms.uTexture.value = texture;
        this.handleResize();
      });
  
      // Create data texture
      const size = this.grid;
      const data = new Float32Array(4 * size * size);
      for (let i = 0; i < size * size; i++) {
        data[i * 4] = Math.random() * 255 - 125;
        data[i * 4 + 1] = Math.random() * 255 - 125;
      }
  
      this.initialData = new Float32Array(data);
  
      this.dataTexture = new THREE.DataTexture(
        data,
        size,
        size,
        THREE.RGBAFormat,
        THREE.FloatType
      );
      this.dataTexture.needsUpdate = true;
      this.uniforms.uDataTexture.value = this.dataTexture;
  
      // Create shader material
      const vertexShader = `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
  
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`;
  
      const fragmentShader = `
      uniform sampler2D uDataTexture;
      uniform sampler2D uTexture;
      uniform vec4 resolution;
      varying vec2 vUv;
  
      void main() {
        vec2 uv = vUv;
        vec4 offset = texture2D(uDataTexture, vUv);
        gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
      }`;
  
      const material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: this.uniforms,
        vertexShader,
        fragmentShader,
      });
  
      // Create geometry
      const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
      this.plane = new THREE.Mesh(geometry, material);
      this.scene.add(this.plane);
  
      // Add event listeners
      this.containerRef.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.containerRef.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      window.addEventListener('resize', this.handleResize.bind(this));
      
      // Initial resize
      this.handleResize();
      
      // Start animation
      this.animate();
    }
  
    handleResize() {
      const width = this.containerRef.offsetWidth;
      const height = this.containerRef.offsetHeight;
      const containerAspect = width / height;
      
      this.renderer.setSize(width, height);
  
      const scale = Math.max(containerAspect / this.imageAspect, 1);
      this.plane.scale.set(this.imageAspect * scale, scale, 1);
  
      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      this.camera.left = -frustumWidth / 2;
      this.camera.right = frustumWidth / 2;
      this.camera.top = frustumHeight / 2;
      this.camera.bottom = -frustumHeight / 2;
      this.camera.updateProjectionMatrix();
  
      this.uniforms.resolution.value.set(width, height, 1, 1);
    }
  
    handleMouseMove(e) {
      const rect = this.containerRef.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      this.mouseState.vX = x - this.mouseState.prevX;
      this.mouseState.vY = y - this.mouseState.prevY;
      Object.assign(this.mouseState, { x, y, prevX: x, prevY: y });
    }
  
    handleMouseLeave() {
      this.dataTexture.needsUpdate = true;
      Object.assign(this.mouseState, { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });
    }
  
    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.uniforms.time.value += 0.05;
  
      const data = this.dataTexture.image.data;
      const size = this.grid;
      
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= this.relaxation;
        data[i * 4 + 1] *= this.relaxation;
      }
  
      const gridMouseX = size * this.mouseState.x;
      const gridMouseY = size * this.mouseState.y;
      const maxDist = size * this.mouse;
  
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distance = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
          if (distance < maxDist * maxDist) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distance), 10);
            data[index] += this.strength * 100 * this.mouseState.vX * power;
            data[index + 1] -= this.strength * 100 * this.mouseState.vY * power;
          }
        }
      }
  
      this.dataTexture.needsUpdate = true;
      this.renderer.render(this.scene, this.camera);
    }
  
    destroy() {
      this.containerRef.removeEventListener('mousemove', this.handleMouseMove);
      this.containerRef.removeEventListener('mouseleave', this.handleMouseLeave);
      window.removeEventListener('resize', this.handleResize);
      
      this.renderer.dispose();
      this.plane.geometry.dispose();
      this.plane.material.dispose();
      this.dataTexture.dispose();
      
      if (this.uniforms.uTexture.value) {
        this.uniforms.uTexture.value.dispose();
      }
      
      if (this.containerRef.contains(this.renderer.domElement)) {
        this.containerRef.removeChild(this.renderer.domElement);
      }
    }
  }
  
  // Hacer disponible globalmente
  window.GridDistortion = GridDistortion;