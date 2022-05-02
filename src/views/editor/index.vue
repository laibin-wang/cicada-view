<template>
  <div class="cicada-view-editor">
    <div class="head">
      <div class="head-left">
        <icon-svg />
        <span class="loader-txt">Cicada View</span>
      </div>
      <div class="head-middle">
        <span>大屏测试</span>
      </div>
      <div class="head-right" />
    </div>
    <div class="main">
      <Menubar />
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
            :style="{ width: `${viewW - 45}px`, height: `${viewH - 45}px` }">
            <div class="content">
              {{ lines }}
            </div>
          </div>
        </div>
        <AttrSetting />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SketchRuler from '@/components/sketch-ruler/index'
import { linesType } from '@/components/sketch-ruler/interface'
import IconSvg from '@/components/icon-svg/index.vue'
import AttrSetting from './components/drawerAttr.vue'
import Menubar from './menubar.vue'

export default defineComponent({
  name: 'Editor',
  components: { SketchRuler, IconSvg, AttrSetting, Menubar },
  setup () {
    const refSketch = ref(null)
    const lines = ref({})
    const viewH = 3000
    const viewW = 5000

    const onLineChange = (ary: linesType): void => {
      lines.value = ary
    }

    const handleWheel = (e: MouseEvent): void => {
      if (refSketch.value) {
        refSketch.value.setScroll((e.currentTarget as HTMLElement).scrollTop, false)
        refSketch.value.setScroll((e.currentTarget as HTMLElement).scrollLeft, true)
      }
    }

    const handleScroll = (e: MouseEvent): void => {
      if (refSketch.value) {
        refSketch.value.setScroll((e.currentTarget as HTMLElement).scrollTop, false)
        refSketch.value.setScroll((e.currentTarget as HTMLElement).scrollLeft, true)
      }
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
      font-size: 18px;
      font-weight: bold;
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
  .section-mark {
    position: relative;
    flex: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .section-box {
    position: relative;
    height: calc(100% - 45px);
    width: calc(100% - 45px);
    padding: 45px 0 0 45px;
    overflow: auto;
    .screen {
      background: url(@/assets/images/14-14.png) repeat;
    }
  }
}
</style>
