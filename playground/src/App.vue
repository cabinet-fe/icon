<template>
  <span v-for="(Icon, key) in icons" :key="key" class="icon-box">
    <component :is="Icon"  class="icon" />
    <div >
      {{ key }}
    </div>
  </span>
</template>

<script lang="ts" setup>
import { icons } from 'icon-ultra/vue'
</script>

<style>
.icon-box {
  display: inline-block;
  width: 120px;
  height: 80px;
  font-size: 14px; text-align: center;
}

.icon {
  height: 48px;
  color: #409eff;
}
</style>
