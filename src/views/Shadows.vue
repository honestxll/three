<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import * as dat from "dat.gui";
const newLocal = new THREE.MeshStandardMaterial();
const scene = new THREE.Scene();
const gui = new dat.GUI();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
gui.add(ambientLight, "intensity").name("环境光").min(0).max(1).step(0.001);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").name("平行光").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
directionalLight.shadow.mapSize.width = 1024 * 1;
directionalLight.shadow.mapSize.height = 1024 * 1;
directionalLight.castShadow = true;
directionalLight.shadow.radius = 10;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
scene.add(directionalLight);

/**
 * Helpers
 */
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper);
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLightCameraHelper);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;
// sphere.position.y = 0.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.receiveShadow = true;
plane.rotation.x = Math.PI * -0.5;
plane.position.y = -0.5;
scene.add(sphere, plane);

material.metalness = 0;
material.roughness = 0.2;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

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
  renderer.shadowMap.enabled = true;
  renderer.setSize(sizes.width, sizes.height);

  // OrbitControls
  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;
  control.enableDamping = true;
  control.update();

  const clock = new THREE.Clock();
  const tick = () => {
    control.update();
    const elapsedTime = clock.getElapsedTime();
    sphere.position.x = Math.sin(elapsedTime) * 1.5;
    sphere.position.z = Math.cos(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
