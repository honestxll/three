<script setup lang="ts">
import * as THREE from "three";
import gsap from "gsap";
import { onMounted } from "vue";
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: 800,
  height: 600,
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
  const canvas = document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  const clock = new THREE.Clock();
  gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
  gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 });
  gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 });
  const tick = () => {
    // Update objects
    // mesh.rotation.y += 0.01;
    const elapsedTime = clock.getElapsedTime();
    console.log("elapsedTime", elapsedTime);
    console.log("camera.position", camera.position);
    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
