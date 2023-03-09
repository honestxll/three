# TransformObjects

物体的移动，在 `Three.js` 中每个物体都有一个 `xyz` 坐标，我们可以通过修改物体的坐标来实现物体的移动

```ts
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
cube1.position.x = -2;
```

也可以给物体设置一个组，通过改变组的坐标或者旋转统一的改变多个物体

```ts
const scene = new THREE.Scene();
const group = new THREE.Group();
group.rotation.y = 1;
scene.add(group);
// 创建 cube 1 2 3
group.add(cube1);
group.add(cube2);
group.add(cube3);
```

需要注意的是我们要在渲染器渲染拍照之前修改位置，在渲染器调用 `render` 方法之后就不生效了
