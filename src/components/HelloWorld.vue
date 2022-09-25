<script setup lang="ts">
import { ref } from 'vue';
import { testFetch } from '@/api'
// defineProps<{ msg: string }>();

const count = ref(0);
async function fetchApi() {
  try {
    await testFetch();
  count.value ++;
  } catch (error) {
    console.log(error);
    
  }

}

</script>

<template>
  <div class="card">
    <button type="button" @click="fetchApi">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <strong class="text">{{ count }}</strong>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="scss">
.card {
  .text {
    color: $test-color;
  }
}
.read-the-docs {
  color: #888;
}
</style>
