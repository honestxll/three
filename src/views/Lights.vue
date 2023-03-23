<script setup lang="ts">
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import { DirectionalLightHelper } from "three";

const scene = new THREE.Scene();
const gui = new dat.GUI();

/**
 * Lights
 */
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// 半球光
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
hemisphereLight.position.y = 3;
scene.add(hemisphereLight);

// 点光源
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, 0.5, 1);
scene.add(pointLight);

// 平面光光源
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// 聚光灯
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 6, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

spotLight.target.position.x = -0.75;
scene.add(spotLight.target);

gui
  .add(directionalLight, "intensity")
  .name("方向性光源强度")
  .min(0)
  .max(1)
  .step(0.0001);
gui
  .add(hemisphereLight, "intensity")
  .name("半球光强度")
  .min(0)
  .max(1)
  .step(0.0001);

/**
 * Helpers
 */
const directionalLightHelper = new DirectionalLightHelper(
  directionalLight,
  0.2
);
scene.add(directionalLightHelper);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
scene.add(hemisphereLightHelper);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 0.2;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(1).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
const rect = new THREE.Mesh(new THREE.BoxGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
const horizontalPlane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), material);
horizontalPlane.rotation.x = Math.PI * -0.5;
sphere.position.x = -1.5;
torus.position.x = 1.5;
const meshY = 1;
sphere.position.y = meshY;
rect.position.y = meshY;
torus.position.y = meshY;
scene.add(sphere, rect, torus, horizontalPlane);

// Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth - 300,
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
