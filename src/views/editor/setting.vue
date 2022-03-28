<template>
  <div
    class="setting"
    :class="show ? 'active' : ''">
    <IconSvg
      class="btn"
      name="shuangjiantou"
      @click="handleDradwer" />
    <div>aaa</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconSvg from '@/components/icon-svg/index.vue'

export default defineComponent({
  name: 'Editor',
  components: { IconSvg },
  setup () {
    const show = ref(false)
    const handleDradwer = (): void => {
      show.value = !show.value
    }

    return {
      show,
      handleDradwer
    }
  }
})
</script>

<style lang="postcss" scoped>
.setting {
  position: relative;
  height: 100%;
  width: 0;
  background: #24282e;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  &.active {
    width: 340px;
  }
  svg.btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -32px;
    fill: #fff;
    padding: 6px;
    background: #24282e;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 12px 0;
    &:hover {
      fill: var(--color-primary);
    }
  }
}
</style>
