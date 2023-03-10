<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
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
  const canvas: HTMLElement & { webkitRequestFullscreen: Function } =
    document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  // console.log("window.devicePixelRatio", window.devicePixelRatio);

  const updateCanvasSize = () => {
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
  };

  window.addEventListener("resize", () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("dblclick", () => {
    type DocumentType = Document & {
      webkitExitFullscreen: Function;
      webkitFullscreenElement: Element;
    };
    const fullscreenElement =
      document.fullscreenElement ||
      (document as DocumentType).webkitFullscreenElement;
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        updateCanvasSize();
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      }
    } else {
      sizes.width = 800;
      sizes.height = 600;
      updateCanvasSize();
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as DocumentType).webkitExitFullscreen) {
        (document as DocumentType).webkitExitFullscreen();
      }
    }
  });

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
  <h3>双击全屏</h3>
  <canvas class="webgl"></canvas>
</template>
