# FullscreenAndResize

这个 `demo` 里有两个知识点

1. 使用 `canvas.requestFullscreen` 将画布的内容全屏展示
2. 监听 `window` 的 `resize` 事件，设置像素比，解决在不同屏幕上的像素比不一样导致的画面模糊问题

```ts
window.addEventListener("dblclick", () => {
  type DocumentType = Document & {
    webkitExitFullscreen: Function;
    webkitFullscreenElement: Element;
  };
  const fullscreenElement =
    document.fullscreenElement ||
    (document as DocumentType).webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      updateCanvasSize();
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    sizes.width = 800;
    sizes.height = 600;
    updateCanvasSize();
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as DocumentType).webkitExitFullscreen) {
      (document as DocumentType).webkitExitFullscreen();
    }
  }
});
```

```ts
window.addEventListener("resize", () => {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```
