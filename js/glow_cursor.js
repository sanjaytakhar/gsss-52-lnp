/**
 * GSSS 52 LNP (मांझूवास) — GLOW CURSOR ENGINE
 * High-Performance Interactive Canvas Glow Cursor & Spline Trail
 * Configured with: #67E8F9 / #A78BFA, followSpeed: 0.16, glowIntensity: 1.9, idleFade: true
 */

(function() {
  'use strict';

  function initGlowCursor() {
    // Check if canvas already exists
    if (document.getElementById('glowCursorCanvas')) return;

    // Create full-screen fixed canvas layer
    const canvas = document.createElement('canvas');
    canvas.id = 'glowCursorCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998'; // Just below modal/toast
    canvas.style.display = 'block';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const config = {
      color: '#67E8F9',
      secondaryColor: '#A78BFA',
      trailLength: 40,
      trailWidth: 8,
      trailTaper: 0.8,
      followSpeed: 0.16,
      glowIntensity: 1.9,
      glowSpread: 1.2,
      hotspot: 0.65,
      brightness: 1.25,
      opacity: 1,
      pulseSpeed: 1.1,
      noiseStrength: 0.035,
      idleFade: true,
      idleTimeout: 700,
      fadeDuration: 900,
      blendMode: 'screen'
    };

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mousePos = { x: width / 2, y: height / 2 };
    let currentPos = { x: width / 2, y: height / 2 };
    let trail = [];

    let isInside = false;
    let lastMoveTime = performance.now();
    let currentOpacity = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      lastMoveTime = performance.now();
      isInside = true;
    };

    const handleMouseEnter = () => {
      isInside = true;
      lastMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      isInside = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
        lastMoveTime = performance.now();
        isInside = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const startTime = performance.now();

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = (now - startTime) / 1000;
      const idleTime = now - lastMoveTime;

      // Handle idle fade calculations
      let targetOpacity = 0;
      if (isInside) {
        if (config.idleFade) {
          if (idleTime < config.idleTimeout) {
            targetOpacity = config.opacity;
          } else {
            const fadeProgress = Math.min(1, (idleTime - config.idleTimeout) / config.fadeDuration);
            targetOpacity = config.opacity * (1 - fadeProgress);
          }
        } else {
          targetOpacity = config.opacity;
        }
      }

      currentOpacity += (targetOpacity - currentOpacity) * 0.12;

      if (currentOpacity > 0.005) {
        // Smooth cursor lag / interpolation
        currentPos.x += (mousePos.x - currentPos.x) * config.followSpeed;
        currentPos.y += (mousePos.y - currentPos.y) * config.followSpeed;

        // Subtle organic noise
        const noiseX = Math.sin(elapsed * 4 * config.pulseSpeed) * config.noiseStrength * 20;
        const noiseY = Math.cos(elapsed * 3.5 * config.pulseSpeed) * config.noiseStrength * 20;

        trail.unshift({
          x: currentPos.x + noiseX,
          y: currentPos.y + noiseY,
          age: 0
        });

        if (trail.length > config.trailLength) {
          trail.pop();
        }

        // Pulse calculation
        const pulse = 1 + Math.sin(elapsed * Math.PI * 2 * config.pulseSpeed) * 0.12;

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.globalCompositeOperation = config.blendMode;

        // 1. Draw Multi-Layered Outer Glow Orb (Ambient Bloom)
        const outerGlowRadius = 60 * config.glowSpread * pulse;
        const outerGlow = ctx.createRadialGradient(
          currentPos.x,
          currentPos.y,
          0,
          currentPos.x,
          currentPos.y,
          outerGlowRadius
        );
        outerGlow.addColorStop(0, config.color);
        outerGlow.addColorStop(0.35, config.secondaryColor);
        outerGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, outerGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Draw Fluid Particle Trail
        if (trail.length > 1) {
          for (let i = 0; i < trail.length - 1; i++) {
            const p1 = trail[i];
            const p2 = trail[i + 1];
            p1.age += 1;

            const progress = i / trail.length;
            const widthScale = (1 - progress * config.trailTaper) * config.trailWidth * pulse;
            const trailAlpha = Math.max(0.05, (1 - progress) * 0.9 * config.brightness);

            ctx.save();
            ctx.globalAlpha = currentOpacity * trailAlpha;

            const segmentGlow = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            segmentGlow.addColorStop(0, config.color);
            segmentGlow.addColorStop(1, config.secondaryColor);

            ctx.strokeStyle = segmentGlow;
            ctx.lineWidth = Math.max(0.5, widthScale);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = config.color;
            ctx.shadowBlur = 15 * config.glowIntensity;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // 3. Draw Intense Hotspot Core
        const coreRadius = 8 * config.hotspot * pulse;
        const coreGlow = ctx.createRadialGradient(
          currentPos.x,
          currentPos.y,
          0,
          currentPos.x,
          currentPos.y,
          coreRadius
        );
        coreGlow.addColorStop(0, '#FFFFFF');
        coreGlow.addColorStop(0.5, config.color);
        coreGlow.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = coreGlow;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 20 * config.brightness;
        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
    console.log('GlowCursor initialized on School Portal.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlowCursor);
  } else {
    initGlowCursor();
  }
})();
