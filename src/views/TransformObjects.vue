<script setup lang="ts">
import * as THREE from "three";
import { onMounted } from "vue";
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;

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
camera.position.z = 3;
scene.add(camera);

// Renderer
onMounted(() => {
  const canvas = document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
