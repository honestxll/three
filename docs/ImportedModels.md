# Imported Models

三维模型有许多的格式，但是最通用和即将成为标准的格式就是 `glTF` 格式，我们可以在 [github](https://github.com/KhronosGroup/glTF-Sample-Models) 上找到许多开源的三维模型用来学习

这个练习中，我们将使用 `GLTFLoader` 来加载三维模型，并使用 `AnimationMixer` 来创建动画

```ts
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
```

# 注意事项

1. 和以往不同，我们直接将模型文件放到了 `public` 目录下，因为我们的 `glTF` 文件会加载所依赖的材质和纹理文件
2. 另外我们使用的打包工具是 `vite`，`vite` 应该是不能直接使用 `import` 关键字来加载 `.gltf` 文件的，还需要额外配置插件，所以我们直接给资源文件放到 `public` 目录下就能轻松解决这个问题
3. 还有我们下载下来的 `gltf` 文件你会看到有 `gltf`、`gltf-binary`、`gltf-draco` 等等，他们之间是有区别的
   3.1 `gltf`：这是最基本的 gltf 文件格式，它包含了 3D 模型的几何、材质、纹理、动画和其他属性的信息，以及指向外部资源的链接。这个格式是文本格式，易于阅读和编辑。
   3.2 `gltf binary`：这是一种二进制格式的 gltf 文件，它将所有的 3D 模型数据和资源打包在一个文件中，以提高加载速度和性能。
   3.3 `gltf draco`：这是一种使用 Google 开发的 Draco 压缩算法压缩的 gltf 文件格式，它可以显著减小文件大小，提高加载速度和性能。
   3.4 `gltf embedded`：这是一种将所有的 3D 模型数据和资源嵌入到 gltf 文件中的格式，以便于在没有外部资源的情况下加载和使用。
   3.5 `gltf quantized`：这是一种使用量化技术压缩的 gltf 文件格式，它可以显著减小文件大小，提高加载速度和性能。

一般我们会直接使用 `gltf` 文件来加载模型，你可以根据你项目的实际情况来选择加载不同的文件，另外，使用 `gltf draco` 的话，我们还需要配合 [DRACOLoader](https://threejs.org/docs/index.html?q=gltf#examples/zh/loaders/GLTFLoader) 来加载，这个文档里有对应的代码示例
