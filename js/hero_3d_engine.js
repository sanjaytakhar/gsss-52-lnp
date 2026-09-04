/**
 * GSSS 52 LNP (मांझूवास) — THREE.JS 3D ANIMATED HERO ENGINE
 * High-performance WebGL 3D Particle Constellation, Holographic Rings & Interactive 3D Orbit
 * Version: 2.0 (Apple-Grade Liquid 3D Animation)
 */

(function() {
  'use strict';

  function initHero3DScene() {
    const canvasContainer = document.getElementById('hero3dCanvasContainer');
    if (!canvasContainer) return;

    // Check WebGL availability
    if (!window.THREE) {
      console.warn('Three.js not loaded, skipping WebGL 3D scene');
      return;
    }

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    
    let width = canvasContainer.clientWidth || window.innerWidth;
    let height = canvasContainer.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // 2. Interactive Lighting
    const ambientLight = new THREE.AmbientLight(0xfffbe9, 0.85);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe3caa5, 2.5, 100);
    pointLight1.position.set(15, 15, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xad8b73, 2.0, 100);
    pointLight2.position.set(-15, -10, 15);
    scene.add(pointLight2);

    const mouseLight = new THREE.PointLight(0xffd54f, 1.8, 60);
    mouseLight.position.set(0, 0, 10);
    scene.add(mouseLight);

    // 3. Central 3D Holographic Orbit Group
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Position orbit group slightly to the right on desktop, centered on mobile
    if (window.innerWidth > 1024) {
      orbitGroup.position.set(7.5, 0, 0);
    } else {
      orbitGroup.position.set(0, -2, 0);
    }

    // Outer Gyroscope Ring 1 (Gold Wireframe)
    const ring1Geo = new THREE.TorusGeometry(8.5, 0.08, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xe3caa5,
      emissive: 0xad8b73,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    orbitGroup.add(ring1);

    // Inner Gyroscope Ring 2 (Warm Terracotta)
    const ring2Geo = new THREE.TorusGeometry(6.8, 0.06, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xad8b73,
      emissive: 0xe3caa5,
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.1
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    orbitGroup.add(ring2);

    // Central Floating 3D Crystal Gem (Icosahedron)
    const gemGeo = new THREE.IcosahedronGeometry(3.2, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffbe9,
      emissive: 0xe3caa5,
      emissiveIntensity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    orbitGroup.add(gem);

    // Wireframe Overlay for High-Tech Hologram effect
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xe3caa5,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireGem = new THREE.Mesh(gemGeo, wireMat);
    wireGem.scale.set(1.02, 1.02, 1.02);
    orbitGroup.add(wireGem);

    // 4. Orbiting Satellite Nodes (4 Core Academic Pillars)
    const satellites = [];
    const nodeColors = [0xffb300, 0x10b981, 0x38bdf8, 0xec4899];
    const nodeLabels = ['Results', 'Science', 'ICT Lab', 'Agri'];

    for (let i = 0; i < 4; i++) {
      const satGroup = new THREE.Group();
      const nodeGeo = new THREE.SphereGeometry(0.75, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      satGroup.add(nodeMesh);

      // Glow halo
      const haloGeo = new THREE.RingGeometry(0.9, 1.1, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      satGroup.add(haloMesh);

      orbitGroup.add(satGroup);
      satellites.push({
        group: satGroup,
        angle: (i * Math.PI) / 2,
        radius: 9.8,
        speed: 0.008 + i * 0.002
      });
    }

    // 5. 3D Glowing Particle Field (1,000 Floating Dust Stars)
    const particleCount = 900;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xad8b73),
      new THREE.Color(0xceab93),
      new THREE.Color(0xe3caa5),
      new THREE.Color(0xfffbe9),
      new THREE.Color(0xffd54f)
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i] = c.r;
      colors[i + 1] = c.g;
      colors[i + 2] = c.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 6. Smooth Mouse & Touch Camera Tracking (Inertia & Parallax)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isTouching = false;

    function onPointerMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      mouseX = (clientX / window.innerWidth) * 2 - 1;
      mouseY = -(clientY / window.innerHeight) * 2 + 1;

      mouseLight.position.x = mouseX * 20;
      mouseLight.position.y = mouseY * 15;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Click Ripple Particle Effect
    window.addEventListener('click', (e) => {
      // Small interactive burst
      const burstX = (e.clientX / window.innerWidth) * 2 - 1;
      const burstY = -(e.clientY / window.innerHeight) * 2 + 1;
      pointLight1.intensity = 4.0;
      setTimeout(() => {
        pointLight1.intensity = 2.5;
      }, 300);
    });

    // 7. Responsive Resize Handler
    function onWindowResize() {
      width = canvasContainer.clientWidth || window.innerWidth;
      height = canvasContainer.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (window.innerWidth > 1024) {
        orbitGroup.position.set(7.5, 0, 0);
      } else {
        orbitGroup.position.set(0, -2, 0);
      }
    }

    window.addEventListener('resize', onWindowResize, { passive: true });

    // 8. 60 FPS Render Loop with Smooth Animation
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX * 4.5 - targetX) * 0.05;
      targetY += (mouseY * 3.5 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate central 3D elements
      gem.rotation.y = elapsedTime * 0.35;
      gem.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2;
      wireGem.rotation.y = gem.rotation.y;
      wireGem.rotation.x = gem.rotation.x;

      ring1.rotation.x = Math.sin(elapsedTime * 0.3) * 0.4;
      ring1.rotation.y = elapsedTime * 0.4;

      ring2.rotation.y = -elapsedTime * 0.5;
      ring2.rotation.z = Math.cos(elapsedTime * 0.25) * 0.3;

      // Rotate satellites along orbital paths
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.group.position.x = Math.cos(sat.angle) * sat.radius;
        sat.group.position.y = Math.sin(sat.angle) * (sat.radius * 0.65);
        sat.group.position.z = Math.sin(sat.angle * 2) * 2.5;
        sat.group.rotation.y += 0.03;
      });

      // Slowly rotate background particle galaxy
      particleSystem.rotation.y = elapsedTime * 0.025;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;

      renderer.render(scene, camera);
    }

    animate();
    console.log('3D Animated Hero Scene initialized successfully.');
  }

  // Load when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3DScene);
  } else {
    initHero3DScene();
  }
})();
