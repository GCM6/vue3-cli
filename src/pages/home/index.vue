<template>
  <div class="index" @click="toNextPage">
    {{ pageText }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
console.log('router', router);

const pageText = ref('home');
function toNextPage() {
  // router.push('statusReport');
  router.push({ path: '/StatusReport' });
}
</script>

<style scoped lang="scss"></style>
