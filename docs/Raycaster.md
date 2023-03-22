# Raycaster

[光线投射器](https://threejs.org/docs/index.html#api/zh/core/Raycaster)，这个类用于进行 `raycasting`（光线投射）。 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

## 手动设置光线投射器的方向

下面是一个从 `-3 x` 投射到 `1 x` 的光线投射器

```ts
const raycaster = new THREE.Raycaster();
const origin = new THREE.Vector3(-3, 0, 0);
const direction = new THREE.Vector3(1, 0, 0);
direction.normalize();
raycaster.set(origin, direction);
```

## 让光线投射器方向从摄像头的位置射出，发射到鼠标所在的位置

```ts
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let currentIntersect: THREE.Object3D | null = null;

window.addEventListener("pointermove", (event) => {
  mouse.x = ((event.clientX - 200) / sizes.width) * 2 - 1;
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
```
