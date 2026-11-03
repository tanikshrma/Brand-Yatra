import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Globe3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvas2dRef = useRef<HTMLCanvasElement>(null);
  const [use2DOnly, setUse2DOnly] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    let anim2DId: number | null = null;
    let isMounted = true;
    let resizeObserver: ResizeObserver | null = null;

    // Helper to start safe 2D Canvas fallback
    const start2DFallback = () => {
      if (!isMounted) return;
      setUse2DOnly(true);
      const canvas = canvas2dRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let angle = 0;

      const render2D = () => {
        if (!isMounted || !canvas || !container) return;
        const w = (canvas.width = container.clientWidth || 340);
        const h = (canvas.height = container.clientHeight || 340);
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.min(w, h) * 0.26;

        ctx.clearRect(0, 0, w, h);

        // Ambient radial background glow
        const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.6);
        bgGrad.addColorStop(0, 'rgba(248, 195, 17, 0.16)');
        bgGrad.addColorStop(0.6, 'rgba(248, 195, 17, 0.03)');
        bgGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = bgGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Core Dark Globe Sphere
        const globeGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 10, cx, cy, r);
        globeGrad.addColorStop(0, '#0E2234');
        globeGrad.addColorStop(0.7, '#0E2234');
        globeGrad.addColorStop(1, '#17212B');
        ctx.fillStyle = globeGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        // Border Outline
        ctx.strokeStyle = 'rgba(248, 195, 17, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Rotating Orbital Ring
        angle += 0.015;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle * 0.5);
        ctx.strokeStyle = 'rgba(248, 195, 17, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.3, r * 0.4, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting Yellow Node
        const px = Math.cos(angle * 2) * r * 1.3;
        const py = Math.sin(angle * 2) * r * 0.4;
        ctx.fillStyle = '#F8C311';
        ctx.shadowColor = '#F8C311';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        anim2DId = requestAnimationFrame(render2D);
      };

      render2D();
    };

    // Check WebGL support safely
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        start2DFallback();
        return () => {
          isMounted = false;
          if (anim2DId) cancelAnimationFrame(anim2DId);
        };
      }
    } catch {
      start2DFallback();
      return () => {
        isMounted = false;
        if (anim2DId) cancelAnimationFrame(anim2DId);
      };
    }

    try {
      // Create Three.js Scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Handle WebGL context loss safely
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        console.warn('[Globe3D] WebGL context lost. Falling back to 2D Canvas.');
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        start2DFallback();
      };

      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

      const boundingRadius = 136;

      const updateSize = () => {
        if (!isMounted || !container || !renderer) return;
        const width = container.clientWidth || 360;
        const height = container.clientHeight || 360;
        if (width === 0 || height === 0) return;

        const aspect = width / height;
        camera.aspect = aspect;

        const paddingFactor = 0.82;
        const requiredExtent = boundingRadius / paddingFactor;
        const visibleHeight = aspect < 1 ? (requiredExtent * 2) / aspect : requiredExtent * 2;

        const fovRad = (camera.fov * Math.PI) / 360;
        camera.position.z = (visibleHeight / 2) / Math.tan(fovRad);

        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      container.appendChild(renderer.domElement);
      updateSize();

      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(container);

      // Globe Group
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Core Dark Metallic Sphere
      const coreRadius = 70;
      const coreGeo = new THREE.SphereGeometry(coreRadius - 1, 48, 48);
      const coreMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0E2234'),
        roughness: 0.32,
        metalness: 0.88,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      globeGroup.add(coreMesh);

      // Wireframe Grid
      const wireMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#F8C311'),
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      });
      const wireMesh = new THREE.Mesh(coreGeo, wireMat);
      globeGroup.add(wireMesh);

      // Atmospheric Rim Shell
      const atmosGeo = new THREE.SphereGeometry(coreRadius + 2, 36, 36);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#F8C311'),
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
      });
      const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
      globeGroup.add(atmosMesh);

      // Dot Matrix Geographical Points
      const dotCount = 2000;
      const positions = new Float32Array(dotCount * 3);
      const colors = new Float32Array(dotCount * 3);

      const yellowColor = new THREE.Color('#F8C311');
      const darkColor = new THREE.Color('#66717D');
      const whiteColor = new THREE.Color('#ffffff');

      for (let i = 0; i < dotCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / dotCount);
        const theta = Math.sqrt(dotCount * Math.PI) * phi;

        const x = coreRadius * Math.cos(theta) * Math.sin(phi);
        const y = coreRadius * Math.sin(theta) * Math.sin(phi);
        const z = coreRadius * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const lat = phi - Math.PI / 2;
        const lon = theta % (2 * Math.PI);
        const landNoise = Math.sin(lat * 4) * Math.cos(lon * 3) + Math.sin(lat * 8 + lon * 4) * 0.5;

        const isLand = landNoise > -0.15;
        const isHighlightNode = isLand && Math.random() < 0.14;

        if (isHighlightNode) {
          colors[i * 3] = yellowColor.r;
          colors[i * 3 + 1] = yellowColor.g;
          colors[i * 3 + 2] = yellowColor.b;
        } else if (isLand) {
          const c = Math.random() < 0.35 ? whiteColor : darkColor;
          colors[i * 3] = c.r;
          colors[i * 3 + 1] = c.g;
          colors[i * 3 + 2] = c.b;
        } else {
          colors[i * 3] = 0.1;
          colors[i * 3 + 1] = 0.1;
          colors[i * 3 + 2] = 0.12;
        }
      }

      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      dotGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const createDotTexture = () => {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        if (!ctx) return null;
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,0.8)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      };

      const dotTex = createDotTexture();

      const dotMat = new THREE.PointsMaterial({
        size: 3.2,
        vertexColors: true,
        map: dotTex || undefined,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const dotCloud = new THREE.Points(dotGeo, dotMat);
      globeGroup.add(dotCloud);

      // Orbital Rings
      const ringGroup = new THREE.Group();
      globeGroup.add(ringGroup);

      const createOrbitalRing = (radius: number, tiltX: number, tiltY: number, particleCount = 24) => {
        const ringGeo = new THREE.TorusGeometry(radius, 0.45, 12, 96);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#F8C311'),
          transparent: true,
          opacity: 0.28,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = tiltX;
        ringMesh.rotation.y = tiltY;

        const pPositions = new Float32Array(particleCount * 3);
        for (let p = 0; p < particleCount; p++) {
          const angle = (p / particleCount) * Math.PI * 2;
          pPositions[p * 3] = radius * Math.cos(angle);
          pPositions[p * 3 + 1] = radius * Math.sin(angle);
          pPositions[p * 3 + 2] = 0;
        }

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        const pMat = new THREE.PointsMaterial({
          color: new THREE.Color('#F8C311'),
          size: 4.8,
          map: dotTex || undefined,
          transparent: true,
          blending: THREE.AdditiveBlending,
        });
        const particlePoints = new THREE.Points(pGeo, pMat);
        particlePoints.rotation.x = tiltX;
        particlePoints.rotation.y = tiltY;

        return { ringMesh, particlePoints };
      };

      const ring1 = createOrbitalRing(106, Math.PI / 3.2, Math.PI / 6, 24);
      const ring2 = createOrbitalRing(122, -Math.PI / 3.8, Math.PI / 3, 28);
      const ring3 = createOrbitalRing(130, Math.PI / 6, -Math.PI / 4, 20);

      ringGroup.add(ring1.ringMesh, ring1.particlePoints);
      ringGroup.add(ring2.ringMesh, ring2.particlePoints);
      ringGroup.add(ring3.ringMesh, ring3.particlePoints);

      // Lighting Rig
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight('#F8C311', 2.0);
      keyLight.position.set(150, 100, 200);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
      rimLight.position.set(-150, -100, -150);
      scene.add(rimLight);

      // Pointer Tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      const handlePointerMove = (e: MouseEvent) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouseX = (e.clientX - cx) / (rect.width / 2);
        mouseY = (e.clientY - cy) / (rect.height / 2);
      };

      window.addEventListener('pointermove', handlePointerMove);

      const clock = new THREE.Clock();

      const tick = () => {
        if (!isMounted || !renderer) return;

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        globeGroup.rotation.y += 0.22 * delta;

        targetRotationY += (mouseX * 0.35 - targetRotationY) * 0.05;
        targetRotationX += (-mouseY * 0.35 - targetRotationX) * 0.05;

        globeGroup.rotation.x = targetRotationX;

        ring1.particlePoints.rotation.z = elapsedTime * 0.45;
        ring2.particlePoints.rotation.z = -elapsedTime * 0.38;
        ring3.particlePoints.rotation.z = elapsedTime * 0.25;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(tick);
      };

      tick();

      return () => {
        isMounted = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (anim2DId) cancelAnimationFrame(anim2DId);
        window.removeEventListener('pointermove', handlePointerMove);

        if (resizeObserver) {
          resizeObserver.disconnect();
        }

        if (renderer) {
          renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.warn('[Globe3D] Three.js WebGL initialization caught exception:', err);
      start2DFallback();
      return () => {
        isMounted = false;
        if (anim2DId) cancelAnimationFrame(anim2DId);
      };
    }
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] md:h-[520px] lg:h-[560px] xl:h-[600px] flex items-center justify-center overflow-visible select-none">
      {/* Three.js WebGL Container */}
      <div
        ref={mountRef}
        className={`absolute inset-0 w-full h-full z-10 [&>canvas]:block [&>canvas]:w-full [&>canvas]:h-full ${
          use2DOnly ? 'hidden' : ''
        }`}
      />
      
      {/* 2D Fallback Canvas */}
      <canvas
        ref={canvas2dRef}
        className={`absolute inset-0 w-full h-full pointer-events-none ${
          use2DOnly ? 'z-10' : 'z-0'
        }`}
      />
      
      {/* Soft Ambient Radial Yellow Glow Behind Globe */}
      <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full bg-[var(--color-primary)]/12 blur-[100px] pointer-events-none z-0" />
    </div>
  );
};
