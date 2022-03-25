<template>
  <div class="cicada-view-editor">
    <div class="head">
      <div class="head-left">
        <icon-svg />
        <span>Cicada View</span>
      </div>
      <div class="head-middle">
        <span>大屏测试</span>
      </div>
      <div class="head-right" />
    </div>
    <div class="main">
      <div class="menu">
        <div class="menu_anticon">
          anticon
        </div>
        <div class="menu_components">
          module
        </div>
      </div>
      <div class="section-mark">
        <sketch-ruler
          ref="refSketch"
          :height="viewH"
          :is-show-refer-line="true"
          :is-show-ruler="true"
          :lines="lines"
          :start-x="-25"
          :start-y="-25"
          :width="viewW"
          @line-change="onLineChange" />
        <div
          class="section-box"
          @scroll="handleScroll"
          @wheel="handleWheel">
          <div
            class="screen"
            :style="{ width: `${viewW}px`, height: `${viewH}px` }">
            {{ lines }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { linesType } from '@/components/sketch-ruler/interface'
import SketchRuler from '@/components/sketch-ruler/index'
import IconSvg from '@/components/icon-svg/index.vue'

export default defineComponent({
  name: 'Editor',
  components: { SketchRuler, IconSvg },
  setup () {
    const refSketch = ref(null)
    const lines: linesType = ref({})
    const viewH = 3000
    const viewW = 5000

    const onLineChange = (ary: linesType): void => {
      lines.value = ary
    }

    const handleWheel = (e: MouseEvent): void => {
      refSketch.value.setScroll(e.currentTarget.scrollTop, false)
      refSketch.value.setScroll(e.currentTarget.scrollLeft, true)
    }

    const handleScroll = (e: MouseEvent): void => {
      refSketch.value.setScroll(e.currentTarget.scrollTop, false)
      refSketch.value.setScroll(e.currentTarget.scrollLeft, true)
    }

    return {
      lines,
      viewH,
      viewW,
      refSketch,
      onLineChange,
      handleWheel,
      handleScroll
    }
  }
})
</script>

<style lang="postcss" scoped>
.cicada-view-editor {
  position: relative;
  height: 100%;
  width: 100%;
  .head {
    position: relative;
    height: 40px;
    width: 100%;
    &-left {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      height: 40px;
    }
    .cicada__icon {
      padding: 0 8px;
      width: 1.5em;
      height: 1.5em;
    }
    span {
      color: #fff;
      font-size: 16px;
    }
    &-middle {
      position: relative;
      text-align: center;
      width: 100%;
      line-height: 40px;
      height: 40px;
    }
  }
  .main {
    position: relative;
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
  }
  .menu {
    display: flex;
    z-index: 3;
    &_anticon {
      width: 40px;
      background-color: #141414;
    }
    &_components {
      width: 160px;
      background-color: #24282e;
    }
  }
  .section-mark {
    position: relative;
    flex: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .section-box {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
}
</style>
