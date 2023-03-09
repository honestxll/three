<script setup lang="ts">
import { demoRoutes } from "./router";
</script>

<template>
  <div class="layout">
    <div class="navbar">
      <router-link
        :to="item.path"
        v-for="(item, index) in demoRoutes"
        :key="index"
        >{{ item.name }}</router-link
      >
    </div>
    <section class="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<style scoped></style>
