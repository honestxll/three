<script setup lang="ts">
const onCollapse = (val: any, type: string) => {
  const content = type === "responsive" ? "触发响应式收缩" : "点击触发收缩";
};
</script>

<template>
  <div class="layout">
    <div class="navbar">
      <router-link to="/">Basic Scene</router-link>
    </div>
    <section class="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<style scoped>
</style>
