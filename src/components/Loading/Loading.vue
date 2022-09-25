<template>
  <div class="loading-mask" v-if="option.visibled">
    <div class="loading-spinner">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" />
      </svg>
      <div class="text">{{ option.loadingText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 目前不支持从其他文件导入复杂类型和类型。将来可以支持类型导入
// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
interface Option {
  visibled: boolean;
  loadingText?: string;
}
interface Props {
  option: Option;
}
// withDefaults 帮助程序为默认值提供类型检查，并确保返回的 props 类型删除了已声明默认值的属性的可选标志
withDefaults(defineProps<Props>(), {
  option: () => {
    return {
      visibled: false,
      loadingText: '正在加载中...',
    };
  },
});
</script>

<style scoped lang="scss">
.loading-mask {
  position: absolute;
  z-index: 10000;
  background-color: hsla(0, 0%, 100%, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    height: 160px;
    text-align: center;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    .circular {
      height: 62px;
      width: 62px;
      animation: loading-rotate 2s linear infinite;
      .path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: #d1d1d2;
        stroke-linecap: round;
      }
      @keyframes loading-rotate {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes loading-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -40px;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -120px;
        }
      }
    }
    .text {
      padding: 20px;
      color: rgb(255, 255, 255);
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
