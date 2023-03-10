import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const demoRoutes: RouteRecordRaw[] = [
  {
    path: "/basic-scene",
    name: "Basic Scene",
    component: () => import("@/views/BasicScene.vue"),
  },
  {
    path: "/transform-objects",
    name: "Transform Objects",
    component: () => import("@/views/TransformObjects.vue"),
  },
  {
    path: "/animations",
    name: "Animations",
    component: () => import("@/views/Animations.vue"),
  },
  {
    path: "/mouse-move",
    name: "MouseMove",
    component: () => import("@/views/MouseMove.vue"),
  },
];

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    redirect: "/basic-scene",
  },
  ...demoRoutes,
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
