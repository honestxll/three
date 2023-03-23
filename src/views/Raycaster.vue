<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
const scene = new THREE.Scene();

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;
scene.add(object1);

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
scene.add(object2);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;
scene.add(object3);

const objects = [object1, object2, object3];

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();
// const origin = new THREE.Vector3(-3, 0, 0);
// const direction = new THREE.Vector3(1, 0, 0);
// direction.normalize();
// raycaster.set(origin, direction);

const mouse = new THREE.Vector2();
let currentIntersect: THREE.Object3D | null = null;

window.addEventListener("pointermove", (event) => {
  mouse.x = ((event.clientX - 300) / sizes.width) * 2 - 1;
  mouse.y = -((event.clientY / sizes.height) * 2 - 1);
});

window.addEventListener("click", () => {
  if (currentIntersect) {
    console.log("click");
    console.log("currentIntersect", currentIntersect);
    (
      currentIntersect as unknown as { material: THREE.MeshBasicMaterial }
    ).material.color.set("#0000ff");
  }
});

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

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    control.update();

    object1.position.y = Math.sin(elapsedTime * 0.3) * 2;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 3;
    object3.position.y = Math.sin(elapsedTime * 1.3) * 1;

    raycaster.setFromCamera(mouse, camera);
    // objects.forEach((obj) => obj.material.color.set("#ff0000"));
    const intersects = raycaster.intersectObjects(objects);

    if (intersects[0]) {
      if (!currentIntersect) {
        console.log("mouse enter");

        currentIntersect = intersects[0].object;
      }
      // (
      //   intersects[0].object as unknown as { material: THREE.MeshBasicMaterial }
      // ).material.color.set("#0000ff");
    } else {
      if (currentIntersect) {
        console.log("mouse leave");
        (
          currentIntersect as unknown as { material: THREE.MeshBasicMaterial }
        ).material.color.set("#ff0000");
      }
      currentIntersect = null;
    }

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
