# Debug

一些常见的 `debug` 库

- dat.gui
- control-panel
- ControlKit
- Guify
- Oui

`three.js` 官方使用的 `dat.gui` 做为调试库，所以我们当然首先的是它

# 安装

```bash
yarn add dat.gui
yarn add @types/dat.gui
```

# 使用

```ts
import * as dat from "dat.gui";
import gsap from "gsap";

const paramters = {
  color: "#ff0000",
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
const material = new THREE.MeshBasicMaterial({ color: paramters.color });

/**
 * Debugger
 */
const gui = new dat.GUI();
gui.add(axesHelper, "visible").name("axesHelper");

const floder = gui.addFolder("mesh");
floder.add(mesh.position, "x").min(-3).max(3).step(0.01).name("positionX");
floder.add(mesh, "visible").name("visible");
floder
  .addColor(paramters, "color")
  .onChange(() => {
    material.color.set(paramters.color);
  })
  .name("color");
floder.add(paramters, "spin").name("spin");
```
