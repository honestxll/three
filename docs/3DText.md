# 3DText

看一下怎么在 `three` 中使用文字

## FontLoader

加载字体类，在新版本的 `three` 中这个 `api` 已经被移到 `addons` 中了，所以我们使用的使用需要像这样引用

```ts
import { FontLoader } from "three/addons/loaders/FontLoader";
```

然后在 `vite-env.d.ts` 文件中添加这个模块定义

```ts
declare module "three/addons/loaders/FontLoader" {
  export * from "three/examples/jsm/loaders/FontLoader";
}
```

用法如下

```ts
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // todo
  // 配合 TextGeometry 来创建文字几何
});
```

## TextGeometry

文字几何，和 `FontLoader` 一样，这个 `api` 也是在 `addons` 中

```ts
import { TextGeometry } from "three/addons/geometries/TextGeometry";
```

**vite-env.d.ts**

```ts
declare module "three/addons/geometries/TextGeometry" {
  export * from "three/examples/jsm/geometries/TextGeometry";
}
```

## 完整 demo

```ts
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
```
