<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import * as dat from "dat.gui";
const scene = new THREE.Scene();
const gui = new dat.GUI();

/**
 * Galaxy
 */
const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 5,
  spin: 0.83,
  randomness: 0.2,
  pow: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};
gui
  .add(parameters, "count")
  .min(100)
  .max(100000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.001)
  .max(20)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(0)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.add(parameters, "pow").min(0).max(5).step(1).onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

let particleGeometry: THREE.BufferGeometry | null | undefined = null;
let particleMaterial: THREE.PointsMaterial | null | undefined = null;
let points:
  | THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>
  | THREE.Object3D<THREE.Event>
  | null = null;

function isMaterial(material: any): material is THREE.Material {
  if (material instanceof THREE.Material) {
    return true;
  }
  return false;
}

function isGeometry(geometry: any): geometry is THREE.BufferGeometry {
  if (geometry) {
    return true;
  }
  return false;
}

function generateGalaxy() {
  if (points !== null) {
    isGeometry(particleGeometry) && particleGeometry.dispose();
    isMaterial(particleMaterial) && particleMaterial.dispose();
    scene.remove(points);
  }

  particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    // Position
    const i3 = i * 3;
    const radius = Math.random() * parameters.radius;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
    const spinAngle = radius * parameters.spin;
    const randomX =
      Math.pow(Math.random(), parameters.pow) * (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.pow) * (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.pow) * (Math.random() < 0.5 ? 1 : -1);

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  particleMaterial = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });
  points = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(points);
}

generateGalaxy();

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
    points && (points.rotation.y += 0.001);

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
