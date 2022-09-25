<template>
  <div class="index-page">
    <div class="main" @click="test"></div>
    <HelloWorld />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import {
  ref,
  reactive,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance; //获取全局
// proxy?.$loading.showLoading();
setTimeout(() => {
  proxy?.$loading.hideLoading();
}, 2000);
function test() {
  console.log('触发');
}
</script>

<style scoped lang="scss">
.main {
  width: 690px;
  height: 600px;
  background: yellowgreen;
  margin: 30px auto;
  box-sizing: border-box;
}
.index-page {
  // height: calc(100% - 200px);
}
</style>
