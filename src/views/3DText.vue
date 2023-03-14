<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import { FontLoader } from "three/addons/loaders/FontLoader";
import { TextGeometry } from "three/addons/geometries/TextGeometry";
import * as dat from "dat.gui";
import gsap from "gsap";

const scene = new THREE.Scene();

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const fontParams = {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  };
  const material = new THREE.MeshNormalMaterial();
  const group = new THREE.Group();
  // let timeline = gsap.timeline({ duration: 0.1, delay: 1 });
  for (const [index, item] of Object.entries("Hello three.js!")) {
    const textGeometry = new TextGeometry(item, fontParams);
    const text = new THREE.Mesh(textGeometry, material);
    text.geometry.center();
    gsap.to(text.position, {
      x: Number(index) * 0.5,
      duration: 1,
    });
    gsap.to(text.rotation, {
      x: Math.PI * 1 * Math.random(),
      y: Math.PI * 2 * Math.random(),
      z: Math.PI * 3 * Math.random(),
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(text.rotation, {
      x: Math.PI * 2 * (Math.random() > 0.5 ? -1 : 1),
      y: Math.PI * 2 * (Math.random() > 0.5 ? -1 : 1),
      z: Math.PI * 2 * (Math.random() > 0.5 ? -1 : 1),
      delay: 1 + (Number(index) + 1) * 0.3,
      duration: 1,
      ease: "power2.inOut",
    });
    // timeline.to(text.rotation, {
    //   z: Math.PI * 2 * (Math.random() > 0.5 ? -1 : 1),
    //   duration: 0.4,
    //   ease: "power2.inOut",
    // });
    group.add(text);
  }
  group.position.x = -3;
  scene.add(group);

  const geometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  console.time("createMeshes");
  for (let i = 0; i < 100; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    mesh.scale.set(scale, scale, scale);
    scene.add(mesh);
  }
  console.timeEnd("createMeshes");
});

// Helper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

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
      sizes.width = window.innerWidth - 200;
      sizes.height = window.innerHeight;
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
  <canvas class="webgl"></canvas>
</template>
