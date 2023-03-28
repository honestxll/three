# Physics

`three.js` 有一个物理引擎插件叫做 [Physijs](https://chandlerprall.github.io/Physijs/)，它提供了非常易于使用的接口，它是建立于 [Ammo.js](https://www.npmjs.com/package/ammo.js) 之上的。

但是在这次的练习中，我们使用的是 [Cannon.js](https://www.npmjs.com/package/cannon-es)，这样做有两个好处

1. 更好的理解物理引擎是怎么样与 `three.js` 结合使用的
2. `Cannon.js` 相对与其它的物理引擎库更容易上手

# 注意事项

在这次的练习中有几个点需要解释一下

```ts
// 用于物体之间的碰撞反弹
world.broadphase = new CANNON.SAPBroadphase(world);
// 在物体不再运动的时候，不再去监听物体的事件，当物体再次发生碰撞的时候再次激活监听
world.allowSleep = true;
```

```ts
const tick = () => {
  // 更新物理世界的状态，这样才能让物理世界的状态和视觉世界的状态保持一致
  world.fixedStep();

  for (const object of objectsToUpdate) {
    // 更新 three.js 物体的位置
    object.mesh.position.copy(object.body.position as unknown as THREE.Vector3);
    // 更新 three.js 物体的旋转
    object.mesh.quaternion.copy(
      object.body.quaternion as unknown as THREE.Quaternion
    );
  }
};
```

## 3D 物理引擎库

- Ammo.js
- Cannon.js
- Oimo.js

## 2D 物理引擎库

- Matter.js
- P2.js
- Planck.js
- Box2D.js
