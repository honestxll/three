# Geometry

`three.js` 中提供了十几种内置的几何图形，可以[点击查看](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)

你会发现一个神奇的现像，这些图形都是由三角形组合成的。为什么要这么做，有以下几个原因：

1. 三角形可以用一个平面表示，方便进行计算和渲染
2. 三角形的面积可以通过海龙公式（Heron's formula）计算，这个公式可以计算任意三角形的面积，而不需要知道三角形的高度
3. 三角形可以用于创建任何形状，只需要将三角形组合在一起

在 `Three.js` 中，几何体由顶点和面组成. 每个面都是由三个顶点组成的三角形. 通过组合不同的三角形，可以创建出各种形状的几何体，例如正方体、球体和圆柱体等.

在 `Three.js` 中，可以使用 `BufferGeometry` 类给一组连续的点创建几何体实例. 几何体只是一些数据，不能算一个 3D 对象，不能放在场景中. 一些继承自 `Object3D` 的类可以通过几何体数据构造成一个可放在场景中的 3D 对象.

总之，三角形是计算机图形学中最常用的基本图形之一，因为它具有很多优点，例如易于计算和渲染，以及可以用于创建任何形状的几何体。在 `Three.js` 中，几何体由三角形组成，可以使用 `BufferGeometry` 类创建。

假设我们要创建一个和 `x` 轴平行的一个正方形面，在三维空间中它肯定是由四个点组合而成，假设有一个点，它的 `y` 轴和其它三个点的 `y` 轴坐标不一样，那么就无法组成一个正方形面了。但是我们用三角形的形式组合物体就可以组成一个锥形。

# Demo

下面我们将创建一个锥形，需要注意的是我们需要设置一个 `双面显示` 的属性，否则我们的几何图形在旋转的时候，有的面可能显示不出来

```ts
const bufferGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  ...[-0.5, 0, -0.5], // vertex 0
  ...[0.5, 0, -0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[-0.5, 0, 0.5], // vertex 0
  ...[0.5, 0, 0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[-0.5, 0, -0.5], // vertex 0
  ...[-0.5, 0, 0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[0.5, 0, -0.5], // vertex 0
  ...[0.5, 0, 0.5], // vertex 1
  ...[0, 0.5, 0], // vertex 2
  ...[-0.5, 0, -0.5], // vertex 0
  ...[-0.5, 0, 0.5], // vertex 1
  ...[0.5, 0, 0.5], // vertex 2
  ...[0.5, 0, -0.5], // vertex 0
  ...[0.5, 0, 0.5], // vertex 1
  ...[-0.5, 0, -0.5], // vertex 2
]);
const positionsAttribute = new THREE.BufferAttribute(vertices, 3);
bufferGeometry.setAttribute("position", positionsAttribute);
const material = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  side: THREE.DoubleSide,
  // wireframe: true,
});
const mesh = new THREE.Mesh(bufferGeometry, material);
mesh.position.y = 0.5;
scene.add(mesh);
```
