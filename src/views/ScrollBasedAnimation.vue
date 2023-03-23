<script setup lang="ts">
import * as THREE from "three";
import { Mesh } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import gsap from "gsap";

const material = new THREE.PointsMaterial({
  color: "#C9EEFF",
  size: 0.02,
  sizeAttenuation: true,
});
const scene = new THREE.Scene();

// Objects
const object1 = new THREE.Points(new THREE.ConeGeometry(1, 4, 4, 70), material);
const object2 = new THREE.Points(
  new THREE.TorusGeometry(1, 0.4, 16, 100),
  material
);
const object3 = new THREE.Points(
  new THREE.TorusKnotGeometry(1, 0.4, 16, 50),
  material
);
object1.position.x = -2.5;
object2.position.x = 2.5;
object3.position.x = -2.5;
const objects = [object1, object2, object3];
const distance = 8;
scene.add(...objects);
objects.forEach((object, index) => {
  object.position.y = -index * distance;
});

const particleCount = 2000;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 300);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] = (Math.random() - 0.5) * distance * 10;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particleMaterial = new THREE.PointsMaterial({
  size: 0.04,
  sizeAttenuation: true,
  transparent: true,
  color: "#ffffff",
});
const particles = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particles);

const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / (sizes.width + 300) - 0.5;
  mouse.y = -(event.clientY / sizes.height - 0.5);

  // console.log("mouse", mouse);
});

// Helper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth - 300,
  height: window.innerHeight,
};

// Camera
const cameraGroup = new THREE.Group();
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6 * 2;
// camera.position.set(1, 1, 5);
cameraGroup.add(camera);
scene.add(cameraGroup);

// Renderer
onMounted(() => {
  const canvas: HTMLElement = document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    // alpha: true,
  });

  window.addEventListener("resize", () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  renderer.setSize(sizes.width, sizes.height);

  let currentScroll = 0;
  let currentSection = 0;
  (document.querySelector(".container") as HTMLElement)!.addEventListener(
    "scroll",
    (el) => {
      currentScroll = (el as any).target.scrollTop;
      const newSection = Math.round(currentScroll / window.innerHeight);
      if (newSection !== currentSection) {
        currentSection = newSection;

        gsap.to(objects[currentSection].rotation, {
          duration: 1.5,
          ease: "power2.inOut",
          x: "+=6",
          y: "+=3",
          z: "+=1.5",
        });

        console.log("changed", currentSection);
      }
    }
  );

  // OrbitControls
  // const control = new OrbitControls(camera, canvas);
  // control.enableDamping = true;
  // control.update();

  const clock = new THREE.Clock();
  let previousTime = 0;

  const updateCanvasSize = () => {
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
  };

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth - 300;
    sizes.height = window.innerHeight;
    console.log("sizes", sizes);
    updateCanvasSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const tick = () => {
    // control.update();
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    // console.log("deltaTime", deltaTime);
    renderer.render(scene, camera);
    objects.forEach((obj) => {
      obj.rotation.x += deltaTime * 0.01;
      obj.rotation.y += deltaTime * 0.12;
    });
    camera.position.y = (-currentScroll / sizes.height) * distance;
    cameraGroup.position.x = (mouse.x - cameraGroup.position.x) * 0.3;
    cameraGroup.position.y = (mouse.y - cameraGroup.position.y) * 0.3;

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <div class="container">
    <canvas class="webgl"></canvas>
    <div class="page-container">
      <section class="page">
        <h1 class="page-title">你好</h1>
      </section>
      <section class="page">
        <h1 class="page-title">Hola</h1>
      </section>
      <section class="page">
        <h1 class="page-title">Bonjour</h1>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  overflow-y: scroll;
}
.webgl {
  position: fixed;
  left: 300px;
  top: 0;
  z-index: -1;
}
.page {
  height: 100vh;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 5rem;
  .page-title {
    width: 50%;
    text-align: center;
  }
  &:nth-child(odd) {
    justify-content: flex-end;
  }
}
</style>
