<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";

import textureCircle from "@/assets/textures/particles/transparent/circle_01.png";

const scene = new THREE.Scene();

/**
 * Particles
 */
// const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
// const particleMaterial = new THREE.PointsMaterial({
//   size: 0.02,
//   sizeAttenuation: true,
// });
// const particles = new THREE.Points(particleGeometry, particleMaterial);
// scene.add(particles);

const particleTexture = new THREE.TextureLoader().load(textureCircle);

const particleGeometry = new THREE.BufferGeometry();
const count = 50000;

const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
  alphaMap: particleTexture,
  transparent: true,
  color: "#ff88cc",
});
const particles = new THREE.Points(particleGeometry, particlesMaterial);
scene.add(particles);

// Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);
scene.add(cube);

// Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth - 200,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(1, 1, 5);
scene.add(camera);

// Renderer
onMounted(() => {
  const canvas: HTMLElement = document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  // OrbitControls
  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;
  control.update();
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    const arr = (particleGeometry.attributes.position as any).array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = arr[i3];
      arr[i3 + 1] = Math.sin(elapsedTime + x);
      // arr[i + 1] = Math.sin(elapsedTime + x);
    }

    particleGeometry.attributes.position.needsUpdate = true;

    control.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
