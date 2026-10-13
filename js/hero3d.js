// Futuristic 3D study scene — low-poly, cyan/violet lighting
(function initHero3D() {
  const container = document.getElementById('hero-canvas');
  if (!container) return;

  // Skip 3D on low-power devices or reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 720px)').matches;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  const noWebGL = !(function () {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch { return false; }
  })();

  if (prefersReduced || isMobile || lowMemory || noWebGL || !window.THREE) {
    document.querySelector('.hero__fallback')?.classList.add('show');
    return;
  }

  const THREE = window.THREE;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x07111F, 6, 16);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2.2, 6.5);
  camera.lookAt(0, 0.6, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // ===== LIGHTS =====
  scene.add(new THREE.AmbientLight(0x223355, 0.8));

  const keyLight = new THREE.DirectionalLight(0x10d9f5, 1.4);
  keyLight.position.set(4, 6, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);

  const violetLight = new THREE.PointLight(0xa78bfa, 2.2, 12);
  violetLight.position.set(-3, 2.5, 2);
  scene.add(violetLight);

  const rimLight = new THREE.PointLight(0x10d9f5, 1.6, 10);
  rimLight.position.set(3, 3, -3);
  scene.add(rimLight);

  // ===== DESK GROUP =====
  const group = new THREE.Group();
  scene.add(group);

  // Desk top
  const deskMat = new THREE.MeshStandardMaterial({ color: 0x0f2036, roughness: 0.4, metalness: 0.25 });
  const desk = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 1.8), deskMat);
  desk.castShadow = true; desk.receiveShadow = true;
  group.add(desk);

  // Legs
  const legMat = new THREE.MeshStandardMaterial({ color: 0x0a1829, metalness: 0.6, roughness: 0.3 });
  [[-1.6, -0.7, 0.7], [1.6, -0.7, 0.7], [-1.6, -0.7, -0.7], [1.6, -0.7, -0.7]].forEach(p => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.8, 0.09), legMat);
    leg.position.set(...p);
    leg.castShadow = true;
    group.add(leg);
  });

  // Monitor frame
  const monFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 1.0, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x0b1a2e, metalness: 0.5, roughness: 0.3 })
  );
  monFrame.position.set(0, 0.95, -0.35);
  monFrame.castShadow = true;
  group.add(monFrame);

  // Monitor screen (glowing cyan)
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.58, 0.9),
    new THREE.MeshBasicMaterial({ color: 0x10d9f5, transparent: true, opacity: 0.85 })
  );
  screen.position.set(0, 0.95, -0.31);
  group.add(screen);

  // Monitor stand
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), legMat);
  stand.position.set(0, 0.4, -0.35);
  group.add(stand);

  // ===== DESK LAMP =====
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-1.3, 0.06, 0.4);
  const lampPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.9, 12),
    new THREE.MeshStandardMaterial({ color: 0x1b3a6b, metalness: 0.7, roughness: 0.3 })
  );
  lampPole.position.y = 0.45;
  lampGroup.add(lampPole);

  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.3, 20, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.7, side: THREE.DoubleSide })
  );
  shade.position.set(0.28, 0.9, 0);
  shade.rotation.z = -0.6;
  lampGroup.add(shade);

  const lampLight = new THREE.PointLight(0xa78bfa, 1.8, 4);
  lampLight.position.set(0.35, 0.8, 0.1);
  lampGroup.add(lampLight);
  group.add(lampGroup);

  // ===== BOOK STACK =====
  const bookColors = [0x10d9f5, 0xa78bfa, 0x1b3a6b];
  for (let i = 0; i < 3; i++) {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.09, 0.48),
      new THREE.MeshStandardMaterial({ color: bookColors[i], roughness: 0.5 })
    );
    book.position.set(1.25, 0.11 + i * 0.1, 0.3);
    book.rotation.y = i * 0.15;
    book.castShadow = true;
    group.add(book);
  }

  // ===== FLOATING PARTICLES =====
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 14;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particlesGeo,
    new THREE.PointsMaterial({ color: 0x10d9f5, size: 0.035, transparent: true, opacity: 0.7 })
  );
  scene.add(particles);

  // ===== FLOOR =====
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(9, 48),
    new THREE.MeshStandardMaterial({ color: 0x0a1626, roughness: 0.9, metalness: 0.1 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.1;
  floor.receiveShadow = true;
  scene.add(floor);

  // ===== ANIMATION =====
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    group.rotation.y = Math.sin(t * 0.15) * 0.18;
    group.position.y = Math.sin(t * 0.6) * 0.06;
    particles.rotation.y = t * 0.03;

    // Gentle camera sway
    camera.position.x = Math.sin(t * 0.1) * 0.4;
    camera.lookAt(0, 0.6, 0);

    renderer.render(scene, camera);
  }
  animate();

  // ===== RESIZE =====
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();