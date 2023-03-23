<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { onMounted } from "vue";
import * as dat from "dat.gui";

import imgDoorAmbientOcclusion from "@/assets/textures/door/Door_Wood_001_ambientOcclusion.jpg";
import imgDoorBaseColor from "@/assets/textures/door/Door_Wood_001_basecolor.jpg";
import imgDoorHeight from "@/assets/textures/door/Door_Wood_001_height.png";
import imgDoorMetallic from "@/assets/textures/door/Door_Wood_001_metallic.jpg";
import imgDoorNormal from "@/assets/textures/door/Door_Wood_001_normal.jpg";
import imgDoorOpacity from "@/assets/textures/door/Door_Wood_001_opacity.jpg";
import imgDoorRoughness from "@/assets/textures/door/Door_Wood_001_roughness.jpg";

import imgWallAmbientOcclusion from "@/assets/textures/bricks/ambientOcclusion.jpg";
import imgWallBaseColor from "@/assets/textures/bricks/color.jpg";
import imgWallNormal from "@/assets/textures/bricks/normal.jpg";
import imgWallRoughness from "@/assets/textures/bricks/roughness.jpg";

import imgGrassAmbientOcclusion from "@/assets/textures/grass/ambientOcclusion.jpg";
import imgGrassBaseColor from "@/assets/textures/grass/color.jpg";
import imgGrassNormal from "@/assets/textures/grass/normal.jpg";
import imgGrassRoughness from "@/assets/textures/grass/roughness.jpg";

const scene = new THREE.Scene();
const gui = new dat.GUI();

/**
 * Textures
 */
const textureDoorAmbientOcclusion = new THREE.TextureLoader().load(
  imgDoorAmbientOcclusion
);
const textureDoorBaseColor = new THREE.TextureLoader().load(imgDoorBaseColor);
const textureDoorHeight = new THREE.TextureLoader().load(imgDoorHeight);
const textureDoorMetallic = new THREE.TextureLoader().load(imgDoorMetallic);
const textureDoorNormal = new THREE.TextureLoader().load(imgDoorNormal);
const textureDoorOpacity = new THREE.TextureLoader().load(imgDoorOpacity);
const textureDoorRoughness = new THREE.TextureLoader().load(imgDoorRoughness);

const textureWallAmbientOcclusion = new THREE.TextureLoader().load(
  imgWallAmbientOcclusion
);
const textureWallBaseColor = new THREE.TextureLoader().load(imgWallBaseColor);
const textureWallNormal = new THREE.TextureLoader().load(imgWallNormal);
const textureWallRoughness = new THREE.TextureLoader().load(imgWallRoughness);

const textureGrassAmbientOcclusion = new THREE.TextureLoader().load(
  imgGrassAmbientOcclusion
);
const textureGrassBaseColor = new THREE.TextureLoader().load(imgGrassBaseColor);
const textureGrassNormal = new THREE.TextureLoader().load(imgGrassNormal);
const textureGrassRoughness = new THREE.TextureLoader().load(imgGrassRoughness);

[
  textureGrassAmbientOcclusion,
  textureGrassBaseColor,
  textureGrassNormal,
  textureGrassRoughness,
].forEach((i) => {
  i.repeat.set(8, 8);
  i.wrapS = THREE.RepeatWrapping;
  i.wrapT = THREE.RepeatWrapping;
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").name("环境光强度").min(0).max(1).step(0.001);
scene.add(ambientLight);

// MoonLight
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").name("月光强度").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").name("月光x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").name("月光y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").name("月光z").min(-5).max(5).step(0.001);

const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
scene.add(doorLight);
gui.add(doorLight, "intensity").name("门灯光强度").min(0).max(1).step(0.001);

// Ghost Lights
const ghostLight1 = new THREE.PointLight("#ff00ff", 2, 3);
gui.add(ghostLight1, "intensity").name("鬼1光强度").min(0).max(10).step(0.001);
const ghostLight2 = new THREE.PointLight("#00ffff", 2, 3);
gui.add(ghostLight2, "intensity").name("鬼2光强度").min(0).max(10).step(0.001);
const ghostLight3 = new THREE.PointLight("#ffff00", 2, 3);
gui.add(ghostLight3, "intensity").name("鬼3光强度").min(0).max(10).step(0.001);
scene.add(ghostLight1, ghostLight2, ghostLight3);

/**
 * Helpers
 */
const ghostLightHelper1 = new THREE.PointLightHelper(ghostLight1);
ghostLightHelper1.visible = false;
scene.add(ghostLightHelper1);
const ghostLightHelper2 = new THREE.PointLightHelper(ghostLight2);
ghostLightHelper2.visible = false;
scene.add(ghostLightHelper2);
const ghostLightHelper3 = new THREE.PointLightHelper(ghostLight3);
ghostLightHelper3.visible = false;
scene.add(ghostLightHelper3);
gui.add(ghostLightHelper1, "visible").name("鬼1框架显示");
gui.add(ghostLightHelper2, "visible").name("鬼2框架显示");
gui.add(ghostLightHelper3, "visible").name("鬼3框架显示");

/**
 * Objects
 */
const planeMaterial = new THREE.MeshStandardMaterial({ color: "#42b883" });
const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), planeMaterial);
planeMaterial.map = textureGrassBaseColor;
planeMaterial.aoMap = textureGrassAmbientOcclusion;
planeMaterial.roughnessMap = textureGrassRoughness;
planeMaterial.normalMap = textureGrassNormal;
plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

// Fog
const fog = new THREE.Fog("#262837", 1, 15);
gui.add(fog, "near").name("雾近").min(0).max(20).step(0.001);
gui.add(fog, "far").name("雾远").min(0).max(20).step(0.001);
scene.fog = fog;

// House
const house = new THREE.Group();
scene.add(house);

// Walls
const wallMaterial = new THREE.MeshStandardMaterial();
const walls = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 4), wallMaterial);
wallMaterial.map = textureWallBaseColor;
wallMaterial.aoMap = textureWallAmbientOcclusion;
wallMaterial.roughnessMap = textureWallRoughness;
wallMaterial.normalMap = textureWallNormal;
walls.position.y = 2.5 / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.5 + 1 / 2;
roof.rotation.y = Math.PI * 0.25;
scene.add(roof);

// Door
const doorMaterial = new THREE.MeshStandardMaterial({
  color: "#aa7b7b",
  side: THREE.DoubleSide,
});
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  doorMaterial
);
doorMaterial.map = textureDoorBaseColor;
doorMaterial.aoMap = textureDoorAmbientOcclusion;
doorMaterial.aoMapIntensity = 1;
doorMaterial.displacementMap = textureDoorHeight;
doorMaterial.displacementScale = 0.1;
doorMaterial.metalnessMap = textureDoorMetallic;
doorMaterial.roughnessMap = textureDoorRoughness;
doorMaterial.normalMap = textureDoorNormal;
doorMaterial.transparent = true;
doorMaterial.alphaMap = textureDoorOpacity;
door.position.z = 2 + 0.001;
door.position.y = 2 / 2;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.25, 0.1, 2);
house.add(bush1);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.7, 0.1, 2.2);
house.add(bush2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.6, 0.6, 0.6);
bush3.position.set(-1.35, 0.1, 2);
house.add(bush3);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.2, 0.2, 0.2);
bush4.position.set(-2, 0.1, 2.3);
house.add(bush4);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.2, 0.2, 0.2);
bush5.position.set(-1.8, 0.1, 2.5);
house.add(bush5);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.PI * 2 * Math.random();
  const radius = 3 + Math.random() * 6;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = Math.sin(angle) * radius;
  grave.position.z = Math.cos(angle) * radius;
  grave.position.y = 0.8 / 2 - 0.1;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

// Helper
const axesHelper = new THREE.AxesHelper(10);
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

/**
 * Shadows
 */
house.children.forEach((i) => (i.castShadow = true));
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
doorLight.castShadow = true;
ghostLight1.castShadow = true;
ghostLight2.castShadow = true;
ghostLight3.castShadow = true;
graves.children.forEach((i) => (i.castShadow = true));
plane.receiveShadow = true;

// Renderer
onMounted(() => {
  const canvas: HTMLElement = document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setClearColor("#262837");
  renderer.shadowMap.enabled = true;

  // OrbitControls
  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;
  control.update();

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    ghostLight1.position.x = Math.sin(Math.PI * elapsedTime * 0.2) * 4;
    ghostLight1.position.z = Math.cos(Math.PI * elapsedTime * 0.2) * 4;
    ghostLight1.position.y = Math.sin(Math.PI * elapsedTime * 0.4) * 2;

    ghostLight2.position.x = -Math.sin(Math.PI * elapsedTime * 0.2) * 5;
    ghostLight2.position.z = -Math.cos(Math.PI * elapsedTime * 0.2) * 6;
    ghostLight2.position.y = -Math.cos(Math.PI * elapsedTime * 0.4) * 2;

    ghostLight3.position.x = -Math.sin(Math.PI * elapsedTime * 0.2) * 8;
    ghostLight3.position.z = -Math.cos(Math.PI * elapsedTime * 0.2) * 8;
    ghostLight3.position.y =
      Math.abs(Math.sin(Math.PI * elapsedTime * 0.2)) * 7;

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
