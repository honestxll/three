/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "three/addons/controls/OrbitControls" {
  export * from "three/examples/jsm/controls/OrbitControls";
}

declare module "three/addons/loaders/FontLoader" {
  export * from "three/examples/jsm/loaders/FontLoader";
}

declare module "three/addons/geometries/TextGeometry" {
  export * from "three/examples/jsm/geometries/TextGeometry";
}

declare module "three/addons/loaders/GLTFLoader" {
  export * from "three/examples/jsm/loaders/GLTFLoader";
}
