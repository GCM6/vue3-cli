<template>
  <div class="index" @click="toNextPage">
    123123dddddddddddddddddddddddddddd
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
function toNextPage() {
  router.push({ path: '/recordFilling' });
}
</script>

<style scoped lang="scss"></style>
