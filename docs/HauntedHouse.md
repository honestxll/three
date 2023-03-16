# HauntedHouse

鬼屋小练习，这里我们用了两个新的知识点

- [Fog](https://threejs.org/docs/index.html?q=Fog#api/zh/scenes/Fog) 创建迷雾
- [Group](https://threejs.org/docs/index.html?q=Group#api/zh/objects/Group) 创建物体组

另外用到了一些三角函数的小技巧

```ts
for (let i = 0; i < 50; i++) {
  // 使墓碑围着房子排列一圈 PI * 2
  const angle = Math.PI * 2 * Math.random();
  // 使墓碑与房子保持一定的距离，并且不超过画布
  const radius = 3 + Math.random() * 6;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = Math.sin(angle) * radius;
  grave.position.z = Math.cos(angle) * radius;
  grave.position.y = 0.8 / 2 - 0.1;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}
```
