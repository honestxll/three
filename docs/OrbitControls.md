# OrbitControls

`Orbit controls`（轨道控制器）可以使得相机围绕目标进行轨道运动。
`OrbitControls` 是一个附加组件，必须显式导入。 [参考 Installation / Addons](https://threejs.org/docs/#manual/en/introduction/Installation).

因为 `three` 是用 `js` 写的，而社区的 `@types/three` 没有给这些附加组件做类型定义，所以如果我们想在 `ts` 中使用的话，需要手动的给他做个类型定义

```ts vite-env.d.ts
declare module "three/addons/controls/OrbitControls" {
  export * from "three/examples/jsm/controls/OrbitControls";
}
```

之后就可以在渲染的时候进行控制了，另外需要注意的是 `document.querySelector` 默认返回的是一个 `Element`，而 `OrbitControls` 的第二参数类型要求是 `HtmlElement`，所以需要手动设置一下 `canvas` 的类型

```ts
onMounted(() => {
  const canvas: HTMLElement = document.querySelector(".webgl")!;
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  // OrbitControls
  const control = new OrbitControls(camera, canvas);
  control.enableDamping = true;
  control.update();

  const tick = () => {
    control.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
});
```
