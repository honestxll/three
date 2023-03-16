# Shadows

要开启阴影，需要设置以下属性

- 给光的 `castShadow` 属性设置成 `true`
- 给物体的 `castShadow` 属性设置成 `true`
- 给接收到阴影投影的物体的 `receiveShadow` 属性设置成 `true`
- 给渲染器的 `renderer.shadowMap.enabled` 属性设置成 `true`
- 给控制器的 `enableDamping` 属性设置成 `true`
- 给物体使用 `PBR` 渲染，`demo` 中我们用的是 [MeshStandardMaterial 材质](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial)

```ts
// Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
directionalLight.castShadow = true;

// Mesh
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

// Receive Shadow Mesh
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.receiveShadow = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.shadowMap.enabled = true;

// Control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.update();
```

# demo 实例

在这个 `demo` 中，我们用三角函数的 `sin` 和 `cos` 实现了球体的圆周运动，用 `sin` 和取绝对值的方式，实现了球体的从上往下的跳动
