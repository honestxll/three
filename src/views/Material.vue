<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import * as dat from "dat.gui";

import baseDoor from "@/assets/textures/door/Door_Wood_001_basecolor.jpg";
import ambientOcclusionDoor from "@/assets/textures/door/Door_Wood_001_ambientOcclusion.jpg";
import heightDoor from "@/assets/textures/door/Door_Wood_001_height.png";
import matalnessDoor from "@/assets/textures/door/Door_Wood_001_metallic.jpg";
import normalDoor from "@/assets/textures/door/Door_Wood_001_normal.jpg";
import roughnessDoor from "@/assets/textures/door/Door_Wood_001_roughness.jpg";

import px from "@/assets/materials/Standard-Cube-Map/px.png";
import nx from "@/assets/materials/Standard-Cube-Map/nx.png";
import py from "@/assets/materials/Standard-Cube-Map/py.png";
import ny from "@/assets/materials/Standard-Cube-Map/ny.png";
import pz from "@/assets/materials/Standard-Cube-Map/pz.png";
import nz from "@/assets/materials/Standard-Cube-Map/nz.png";

const environmentMapTexture = new THREE.CubeTextureLoader().load([
  px,
  nx,
  py,
  ny,
  pz,
  nz,
]);

const scene = new THREE.Scene();
const gui = new dat.GUI();

/**
 * Textures
 */
const baseDoorTexture = new THREE.TextureLoader().load(baseDoor);
const ambientOcclusionDoorTexture = new THREE.TextureLoader().load(
  ambientOcclusionDoor
);
const heightDoorTexture = new THREE.TextureLoader().load(heightDoor);
const matalnessDoorTexture = new THREE.TextureLoader().load(matalnessDoor);
const normalDoorTexture = new THREE.TextureLoader().load(normalDoor);
const roughnessDoorTexture = new THREE.TextureLoader().load(roughnessDoor);

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0;
// material.roughness = 1;
// material.map = baseDoorTexture;
// material.aoMap = ambientOcclusionDoorTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightDoorTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = matalnessDoorTexture;
// material.normalMap = normalDoorTexture;
// material.roughnessMap = roughnessDoorTexture;
// // material.transparent = true;
// material.alphaMap = baseDoorTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(1).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
sphere.position.x = -1.5;
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

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

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    sphere.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    sphere.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
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
