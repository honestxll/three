# MouseMove

这个 `demo` 主要分为两个部份

1. 实时监听鼠标移动的位置并告诉 `tick`
2. 用三角函数巧妙的修改 `xyz` 坐标实现类似卫星的轨道移动

```ts
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = -(event.clientY / window.innerHeight - 0.5);
  console.log(cursor);
});
```

```ts
const tick = () => {
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = Math.sin(cursor.y * Math.PI * 1) * 3;

  camera.lookAt(mesh.position);
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
```
