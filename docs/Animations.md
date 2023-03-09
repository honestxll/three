# Animations

核心主要是使用 `requestAnimationRequest` 这个 `API` 做帧动画，也可以使用 `gsap` 来修改物体的 `position`

```ts
const tick = () => {
  // Update objects
  mesh.rotation.y += 0.01;
  const elapsedTime = clock.getElapsedTime();
  camera.position.y = Math.sin(elapsedTime);
  camera.position.x = Math.cos(elapsedTime);
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
```

```ts
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 });
gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 });
```
