<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import * as dat from "dat.gui";
import gsap from "gsap";
const scene = new THREE.Scene();

// Red cube
const paramters = {
  color: "#ff0000",
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: paramters.color });
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

/**
 * Debugger
 */
const gui = new dat.GUI();
gui.add(axesHelper, "visible").name("axesHelper");

const floder = gui.addFolder("mesh");
floder.add(mesh.position, "x").min(-3).max(3).step(0.01).name("positionX");
floder.add(mesh, "visible").name("visible");
floder
  .addColor(paramters, "color")
  .onChange(() => {
    material.color.set(paramters.color);
  })
  .name("color");
floder.add(paramters, "spin").name("spin");

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
