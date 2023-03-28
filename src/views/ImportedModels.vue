<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { onMounted } from "vue";
const scene = new THREE.Scene();

// Helper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

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

// Plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshStandardMaterial({ color: "#808080" })
);
plane.rotation.x = Math.PI * -0.5;
scene.add(plane);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Model
const loader = new GLTFLoader();
let mixer: THREE.AnimationMixer | null = null;

loader.load("/models/Fox/glTF/Fox.gltf", (gltf) => {
  gltf.scene.scale.set(0.025, 0.025, 0.025);
  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
  scene.add(gltf.scene);
});

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
  let tempTime = 0;

  const tick = () => {
    control.update();

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - tempTime;
    tempTime = elapsedTime;
    mixer && mixer.update(deltaTime);
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
