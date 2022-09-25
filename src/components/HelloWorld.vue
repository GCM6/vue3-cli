<script setup lang="ts">
import { ref } from 'vue';
import { ImagePreview, Toast } from 'vant'
import { testFetch } from '@/api'
// defineProps<{ msg: string }>();
const currentDate = ref(new Date())
const count = ref(0);
const show = ref(false)
async function fetchApi() {
  try {
    // await testFetch();
  count.value ++;
  Toast('提示内容');
  } catch (error) {
    Toast('提示内容');
    console.log(error);
    
  }

}
function showPopup() {
  ImagePreview([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
]);
  // show.value = true
}
</script>

<template>
  <van-cell is-link @click="showPopup">展示弹出层</van-cell>

<van-popup v-model:show="show" position="bottom">
  <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  />
</van-popup>

<button type="button" @click="fetchApi">count is {{ count }}</button>

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
