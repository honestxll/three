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
  {
    path: "/orbit-controls",
    name: "OrbitControls",
    component: () => import("@/views/OrbitControls.vue"),
  },
  {
    path: "/fullscreen-and-resize",
    name: "FullscreenAndResize",
    component: () => import("@/views/FullscreenAndResize.vue"),
  },
  {
    path: "/geometry",
    name: "Geometry",
    component: () => import("@/views/Geometry.vue"),
  },
  {
    path: "/debug",
    name: "Debug",
    component: () => import("@/views/Debug.vue"),
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
