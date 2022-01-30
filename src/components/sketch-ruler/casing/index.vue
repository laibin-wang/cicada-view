<template>
  <div :class="rwCls" :style="rwStl">
    <scaleplate
      :horizontal="horizontal"
      :scale="scale"
      :width="width"
      :height="height"
      :start="start"
      :ratio="ratio"
      :shadow-start="shadowStart"
      :shadow-width="shadowWidth"
      :palette="palette"
      v-model:valueNum="valueNum"
      v-model:showIndicator="showIndicator"
      @on-add-line="addNewLine"></scaleplate>
    <div v-show="isShowReferLine" class="lines">
      <line
        v-for="(v, i) in lines"
        :key="v + i"
        :scale="scale"
        :start="start"
        :thick="thick"
        :palette="palette"
        :horizontal="horizontal"
        :is-show-refer-line="isShowReferLine"
        @on-remove="removeLine"
        @on-release="releaseLine"
        :value="v >> 0"></line>
    </div>
    <div v-show="showIndicator" class="indicator" :style="indicatorStl">
      <div class="value">{{ valueNum }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { CasingOptions } from '../interface'
import Line from '../line/index.vue'
import Scaleplate from '../scaleplate/index.vue'

export default defineComponent({
  name: 'CasingRuler',
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
    thick: {
      type: Number,
      default: 16
    },
    ratio: {
      type: Number,
      default: 1
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
    scale: {
      type: Number,
      validator: (value: any) => value > 0,
      default: 1
    },
    lineColor: {
      type: String,
      default: '#EB5648'
    },
    lines: {
      type: Array as PropType<CasingOptions['lines']>,
      default: () => []
    },
    palette: {
      type: Object as PropType<CasingOptions['palette']>,
      default: () => {
        return {
          bgColor: 'rgba(225,225,225, 0)',
          fontColor: '#7D8694',
          shadowColor: '#E8E8E8',
          longfgColor: '#BABBBC',
          shortfgColor: '#C8CDD0'
        }
      }
    }
  },
  setup(props) {
    const showIndicator = ref(false)
    const valueNum = ref(0)

    const rwCls = computed(() => {
      const clsName = props.horizontal ? 'h-casing' : 'v-casing'
      return clsName
    })

    const rwStl = computed(() => {
      if (props.horizontal) {
        return {
          width: `calc(100% - ${props.thick}px)`,
          height: `${props.thick! + 1}px`,
          left: `${props.thick}px`
        }
      } else {
        return {
          width: `${props.thick + 1}px`,
          height: `calc(100% - ${props.thick}px)`,
          top: `${props.thick}px`
        }
      }
    })

    const indicatorStl = computed(() => {
      const indicatorOffset = (valueNum.value - props.start) * props.scale
      if (props.horizontal) {
        return {
          left: `${indicatorOffset}px`,
          borderLeft: `1px solid ${props.lineColor}`
        }
      } else {
        return {
          top: `${indicatorOffset}px`,
          borderBottom: `1px solid ${props.lineColor}`
        }
      }
    })

    const addNewLine = (value: number) => {
      props.lines.push(value)
    }

    const removeLine = (index: number) => {
      props.lines.splice(index, 1)
    }

    const releaseLine = (value: number, index: number) => {
      const offset = value - props.start
      const maxOffset =(props.horizontal ? props.width : props.height) / props.scale

      if (offset < 0 || offset > maxOffset) {
        removeLine(index)
      } else {
        props.lines[index] = value
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

<style lang="postcss" scoped>
.line {
  position: absolute;
}
.h-casing,
.v-casing {
  position: absolute;
  .lines {
    pointer-events: none;
  }
  &:hover .lines {
    pointer-events: auto;
  }
}
.h-casing {
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
.v-casing {
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
