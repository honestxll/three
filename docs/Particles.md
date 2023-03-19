# Particles

## DEMO1

给几何体添加 `PointsMaterial`，并且用 `Points` 创建几何

```ts
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const pointMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
});
const particles = new THREE.Points(sphereGeometry, pointMaterial);
scene.add(particles);
```

## DEMO2

使用 `BufferGeometry` 创建自定义几何体，再配合纹理贴图和三角函数做一个波浪效果

```ts
import textureCircle from "@/assets/textures/particles/transparent/circle_01.png";

const particleTexture = new THREE.TextureLoader().load(textureCircle);

const particleGeometry = new THREE.BufferGeometry();
const count = 50000;

const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
  alphaMap: particleTexture,
  transparent: true,
  color: "#ff88cc",
});
const particles = new THREE.Points(particleGeometry, particlesMaterial);
scene.add(particles);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  const arr = (particleGeometry.attributes.position as any).array;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = arr[i3];
    arr[i3 + 1] = Math.sin(elapsedTime + x);
    // arr[i + 1] = Math.sin(elapsedTime + x);
  }

  particleGeometry.attributes.position.needsUpdate = true;

  control.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
```

# 素材

免费的素材 [https://kenney.nl/assets/particle-pack](https://kenney.nl/assets/particle-pack)
