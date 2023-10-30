<template>
  <div>
    <div>
      从icon-ultra中导出对应的图标即可, 导出名就是下方的图标名
    </div>
    <span v-for="(Icon, key) in icons" :key="key" class="icon-box">
      <component :is="Icon" class="icon" />
      <div>
        {{ key }}
      </div>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { icons } from 'icon-ultra/global'
</script>

<style>
.icon-box {
  display: inline-block;
  width: 120px;
  height: 80px;
  font-size: 14px;
  text-align: center;
}

.icon {
  height: 48px;
  color: #409eff;
  border-radius: 4px;
  background-color: #eee;
}
</style>
