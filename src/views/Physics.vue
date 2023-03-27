<script setup lang="ts">
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import dat from "dat.gui";
import audio from "../assets/audios/mixkit-basketball-ball-hard-hit-2093.wav";
const scene = new THREE.Scene();
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
});
const gui = new dat.GUI();

// Objects
const material = new THREE.MeshStandardMaterial();

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0;
scene.add(plane);

const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
  mass: 0,
  shape: floorShape,
});
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI * 0.5);
world.addBody(floorBody);

/**
 * Sounds
 */
const hitSound = new Audio(audio);

function playSound(collision: any) {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();
  // console.log("impactStrength", impactStrength);
  const volume = impactStrength / 8;
  console.log("volume", volume);
  if (impactStrength < 1.5) return; // Min impact strength to make a sound

  hitSound.volume = volume > 1 ? 1 : volume;
  hitSound.currentTime = 0;
  hitSound.play();
}

// World Material
const defaultMaterial = new CANNON.Material("default");
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
);
world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;

const objectsToUpdate: { mesh: THREE.Mesh; body: CANNON.Body }[] = [];

const objectMaterial = new THREE.MeshStandardMaterial({ color: "#838383" });
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);

function createSphere(radius: number, position: THREE.Vector3 | CANNON.Vec3) {
  const mesh = new THREE.Mesh(sphereGeometry, objectMaterial);
  mesh.castShadow = true;
  mesh.scale.set(radius, radius, radius);
  mesh.position.copy(position as THREE.Vector3);
  scene.add(mesh);

  const body = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Sphere(radius),
  });
  body.position.copy(position as CANNON.Vec3);
  body.addEventListener("collide", playSound);
  world.addBody(body);

  const obj = {
    mesh,
    body,
  };
  objectsToUpdate.push(obj);

  return obj;
}

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
function createCube(
  width: number,
  height: number,
  depth: number,
  position: { x: number; y: number; z: number }
) {
  const mesh = new THREE.Mesh(cubeGeometry, objectMaterial);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = true;
  mesh.position.copy(position as THREE.Vector3);
  scene.add(mesh);

  const body = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(
      new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)
    ),
    material: defaultMaterial,
  });
  body.addEventListener("collide", playSound);
  body.position.copy(position as CANNON.Vec3);
  world.addBody(body);

  const obj = {
    mesh,
    body,
  };
  objectsToUpdate.push(obj);

  return obj;
}

createSphere(0.5, new THREE.Vector3(0, 3, 0));

/**
 * dat GUI debugger
 */
const guiDebuggerObject = {
  createSphere() {
    createSphere(Math.random() * 0.5, new THREE.Vector3(0, 3, 0));
  },
  createCube() {
    createCube(Math.random(), Math.random(), Math.random(), {
      x: (Math.random() - 0.5) * 3,
      y: 3,
      z: (Math.random() - 0.5) * 3,
    });
  },
};
gui.add(guiDebuggerObject, "createSphere").name("创建球体");
gui.add(guiDebuggerObject, "createCube").name("创建立方体");

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
gui.add(ambientLight, "intensity").name("环境光").min(0).max(1).step(0.001);
scene.add(ambientLight);
const light = new THREE.DirectionalLight("#999999", 0.5);
light.position.set(3, 3, 0);
scene.add(light);

/**
 * Shadows
 */
light.castShadow = true;
plane.receiveShadow = true;

// Helper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);
// const lightHelper = new THREE.DirectionalLightHelper(light, 0.2);
// scene.add(lightHelper);

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
  renderer.shadowMap.enabled = true;
  renderer.setSize(sizes.width, sizes.height);

  // OrbitControls
  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;
  control.update();

  const tick = () => {
    control.update();
    world.fixedStep();
    renderer.render(scene, camera);

    for (const object of objectsToUpdate) {
      object.mesh.position.copy(
        object.body.position as unknown as THREE.Vector3
      );
      object.mesh.quaternion.copy(
        object.body.quaternion as unknown as THREE.Quaternion
      );
    }

    window.requestAnimationFrame(tick);
  };
  tick();
});
</script>
<template>
  <canvas class="webgl"></canvas>
</template>
