<template>
  <div class="casing-style">
    <!-- 水平方向 -->
    <wrapper
      :horizontal="true"
      :width="width"
      :height="thick"
      :is-show-refer-line="showReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startX"
      :lines="lines.h"
      :shadow-start="shadow.x"
      :shadow-width="shadow.width"
      :palette="palette"></wrapper>
    <!-- 竖直方向 -->
    <wrapper
      :horizontal="false"
      :width="thick"
      :height="height"
      :is-show-refer-line="showReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startY"
      :lines="lines.v"
      :shadow-start="shadow.y"
      :shadow-width="shadow.height"
      :palette="palette"></wrapper>

      <a class="corner" :class="cornerActiveCls" :style="cornerStl" @click="onCornerClick"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { ShadowType, lineType, PaletteOptions } from '../interface'
import { eye64, closeEye64 } from './cornerImg64'
import Wrapper from '../wrapper/index.vue'

export default defineComponent({
  name: 'Casing',
  components: { Wrapper },
  props: {
    ratio: {
      type: Number,
      default: 1
    },
    thick: {
      type: Number,
      default: 16
    },
    startX: {
      type: Number,
      default: 0
    },
    startY: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    shadow: {
      type: Object as PropType<ShadowType>,
      default: () => {
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      }
    },
    lines: {
      type: Object as PropType<lineType>,
      default: () => {
        return {
          h: [],
          v: []
        }
      }
    },
    isShowReferLine: {
      type: Boolean,
      default: false
    },
    palette: {
      type: Object as PropType<PaletteOptions>,
      default: () => {
        return {
          bgColor: 'rgba(225,225,225, 0)',
          fontColor: '#FFFFFF',
          shadowColor: '#E8E8E8',
          longfgColor: '#BABBBC',
          shortfgColor: '#C8CDD0'
        }
      }
    },
    cornerActive: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onCornerClick', 'handleLine'],
  setup(props, { emit }) {
    const showReferLine = ref(true)
    showReferLine.value = props.isShowReferLine

    const cornerActiveCls = computed(() => {
      return props.cornerActive ? ' active' : ''
    })

    const cornerStl = computed(() => {
      return {
        backgroundImage: showReferLine.value
          ? `url(${eye64})`
          : `url(${closeEye64})`,
        width: `${props.thick}px`,
        height: `${props.thick}px`,
        borderRight: '1px solid #DADADC',
        borderBottom: '1px solid #DADADC'
      }
    })

    const onCornerClick = (e: MouseEvent) => {
      showReferLine.value = !showReferLine.value
      emit('onCornerClick', e)
    }

    return {
      showReferLine,
      cornerActiveCls,
      cornerStl,
      onCornerClick
    }
  }
})
</script>

<style lang="postcss" scoped>
.casing-style {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 12px;
  pointer-events: none;
  span {
    line-height: 1;
  }
}
.corner {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  cursor: pointer;
  box-sizing: content-box;
  transition: all 0.2s ease-in-out;
}
.indicator {
  position: absolute;
  pointer-events: none;
  .value {
    position: absolute;
    background: white;
  }
}
.ruler {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
