<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * 通过点线面的数组方式创建一个 Geometry
 */
const bufferGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  ...[0, 0, 0], // vertex 0
  ...[0, 1, 0], // vertex 1
  ...[1, 0, 0], // vertex 2
]);
const positionsAttribute = new THREE.BufferAttribute(vertices, 3);
bufferGeometry.setAttribute("position", positionsAttribute);
const material2 = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  wireframe: true,
});
const mesh2 = new THREE.Mesh(bufferGeometry, material2);
mesh2.position.x = 2;
scene.add(mesh2);

/**
 * 通过点线面的数组方式创建一个锥形的 Geometry
 */
const bufferGeometry2 = new THREE.BufferGeometry();
const vertices2 = new Float32Array([
  ...[-0.5, 0, -0.5], // vertex 0
  ...[0.5, 0, -0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[-0.5, 0, 0.5], // vertex 0
  ...[0.5, 0, 0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[-0.5, 0, -0.5], // vertex 0
  ...[-0.5, 0, 0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[0.5, 0, -0.5], // vertex 0
  ...[0.5, 0, 0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[-0.5, 0, -0.5], // vertex 0
  ...[-0.5, 0, 0.5], // vertex 1
  ...[0.5, 0, 0.5], // vertex 2
  ...[0.5, 0, -0.5], // vertex 0
  ...[0.5, 0, 0.5], // vertex 1
  ...[-0.5, 0, -0.5], // vertex 2
]);
const positionsAttribute2 = new THREE.BufferAttribute(vertices2, 3);
bufferGeometry2.setAttribute("position", positionsAttribute2);
const material3 = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  side: THREE.DoubleSide,
  // wireframe: true,
});
const mesh3 = new THREE.Mesh(bufferGeometry2, material3);
mesh3.position.y = 0.5;
scene.add(mesh3);

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
  const canvas: HTMLElement = document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  // OrbitControls
  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;
  control.update();

  const tick = () => {
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
