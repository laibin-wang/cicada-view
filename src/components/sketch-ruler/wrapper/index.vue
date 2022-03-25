<template>
  <div
    :class="rwCls"
    :style="rwStl">
    <Scaleplate
      v-model:showIndicator="showIndicator"
      v-model:valueNum="valueNum"
      :height="height"
      :horizontal="horizontal"
      :palette="palette"
      :shadow-start="shadowStart"
      :shadow-width="shadowWidth"
      :start="start"
      :width="width"
      @on-add-line="addNewLine" />
    <div
      v-show="isShowReferLine"
      class="lines">
      <Line
        v-for="(v, i) in lines"
        :key="v + i"
        :horizontal="horizontal"
        :index="i"
        :is-show-refer-line="isShowReferLine"
        :start="start"
        :thick="thick"
        :value="v >> 0"
        @on-release="releaseLine"
        @on-remove="removeLine" />
    </div>
    <div
      v-show="showIndicator"
      class="indicator"
      :style="indicatorStl">
      <div class="value">
        {{ valueNum }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from 'vue'
import { WrapperOptions } from '../interface'
import Line from '../line/index.vue'
import Scaleplate from '../scaleplate/index.vue'

export default defineComponent({
  name: 'Wrapper',
  components: { Line, Scaleplate },
  props: {
    isShowReferLine: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 0
    },
    thick: {
      type: Number,
      default: 20
    },
    shadowStart: {
      type: Number,
      default: 0
    },
    shadowWidth: {
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
    start: {
      type: Number,
      default: 0
    },
    lineColor: {
      type: String,
      default: '#EB5648'
    },
    lines: {
      type: Array as PropType<WrapperOptions['lines']>,
      default: () => []
    },
    palette: {
      type: Object as PropType<WrapperOptions['palette']>,
      default: () => ({
        bgColor: 'rgba(225,225,225, 0)',
        fontColor: '#7D8694',
        shadowColor: '#E8E8E8',
        longfgColor: '#BABBBC',
        shortfgColor: '#C8CDD0'
      })
    }
  },
  emits: ['onLineChange'],
  setup (props, { emit }) {
    const showIndicator = ref(false)
    const valueNum = ref(0)
    const { lines } = toRefs(props)

    const rwCls = computed(() => {
      const clsName = props.horizontal ? 'h-wrapper' : 'v-wrapper'
      return clsName
    })

    const rwStl = computed(() => {
      if (props.horizontal) {
        return {
          width: `${props.width}px`, // `calc(100% - ${props.thick}px)`,
          height: `${props.thick + 1}px`,
          left: `${props.thick + props.offset}px`
        }
      }
      return {
        width: `${props.thick + 1}px`,
        height: `${props.height}px`, // `calc(100% - ${props.thick}px)`,
        top: `${props.thick + props.offset}px`
      }
    })

    const indicatorStl = computed(() => {
      const indicatorOffset = valueNum.value - props.start
      if (props.horizontal) {
        return {
          left: `${indicatorOffset}px`,
          borderLeft: `1px solid ${props.lineColor}`
        }
      }
      return {
        top: `${indicatorOffset}px`,
        borderBottom: `1px solid ${props.lineColor}`
      }
    })

    const addNewLine = (value: number): void => {
      lines.value.push(value)
      emit('onLineChange', lines.value, props.horizontal)
    }

    const removeLine = (index: number): void => {
      lines.value.splice(index, 1)
      emit('onLineChange', lines.value, props.horizontal)
    }

    const releaseLine = (value: number, index: number): void => {
      const offset = value - props.start
      const maxOffset = props.horizontal ? props.width : props.height

      if (offset < 0 || offset > maxOffset) {
        removeLine(index)
      } else {
        lines.value[index] = value
        emit('onLineChange', lines.value, props.horizontal)
      }
    }

    return {
      showIndicator,
      valueNum,
      rwCls,
      rwStl,
      indicatorStl,
      addNewLine,
      releaseLine,
      removeLine
    }
  }
})
</script>

<style lang="postcss">
.line {
  position: absolute;
}
.h-wrapper,
.v-wrapper {
  position: absolute;
  .lines {
    pointer-events: none;
  }
  &:hover .lines {
    pointer-events: auto;
  }
}
.h-wrapper {
  top: 0;
  .line {
    top: 0;
    height: 100vh;
    padding-left: 5px;
    .action {
      transform: translateX(-24px);
      .value {
        margin-left: 4px;
      }
    }
  }
  .indicator {
    top: 0;
    height: 100vw;
    .value {
      width: auto;
      padding: 0 2px;
      margin-top: 4px;
      margin-left: 4px;
    }
  }
}
.v-wrapper {
  left: 0;
  .line {
    left: 0;
    width: 100vw;
    padding-top: 5px;
    .action {
      transform: translateY(-24px);
      flex-direction: column;
      .value {
        margin-top: 4px;
      }
    }
  }
  .indicator {
    width: 100vw;
    .value {
      left: 0;
      width: auto;
      padding: 0 2px;
      margin-top: -5px;
      margin-left: 2px;
      transform: rotate(-90deg);
      transform-origin: 0 0;
    }
  }
}
</style>
