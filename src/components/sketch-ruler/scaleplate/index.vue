<template>
  <canvas
    ref="$canvas"
    class="scaleplate"
    @click="handle($event, 'click')"
    @mouseenter="handle($event, 'enter')"
    @mousemove="handle($event, 'move')"
    @mouseleave="$emit('update:showIndicator', false)"
  ></canvas>
</template>

<script lang="ts">
import { PaletteOptions, RulerOptions, CanvasRulerOptions } from '../interface'
import { drawerCanvasRuler } from './utils'
import { defineComponent, PropType, reactive, ref, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'Scaleplate',
  props: {
    showIndicator: Boolean,
    valueNum: Number,
    scale: {
      type: Number,
      default: 1
    },
    ratio: Number,
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    start: {
      type: Number,
      default: 0
    },
    shadowStart: {
      type: Number,
      default: 0
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    shadowWidth: {
      type: Number,
      default: 0
    },
    palette: {
      type: Object as PropType<PaletteOptions>,
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
  emits: ['onAddLine', 'update:showIndicator', 'update:valueNum'],
  setup(props, { emit }) {
    const state = reactive({
      canvasContext: null as CanvasRenderingContext2D | null
    })
    const $canvas = ref<HTMLCanvasElement | null>(null)
    let ratio = 1

    const initCanvasRef = () => {
      state.canvasContext = $canvas.value && $canvas.value.getContext('2d')
    }

    const updateCanvasContext = (ratio: number) => {
      if ($canvas.value) {
        $canvas.value.width = props.width * ratio
        $canvas.value.height = props.height * ratio
        const ctx = state.canvasContext
        if (ctx) {
          ctx.font = `${
            12 * ratio
          }px -apple-system,"Helvetica Neue", ".SFNSText-Regular", "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
          ctx.lineWidth = 1
          ctx.textBaseline = 'middle'
        }
      }
    }

    const drawRuler = (ratio: number) => {
      const ruler: RulerOptions = {
        scale: props.scale,
        ratio,
        width: props.width,
        height: props.height
      }

      if (state.canvasContext) {
        const options: CanvasRulerOptions = {
          ctx: state.canvasContext,
          ruler,
          palette: props.palette,
          start: props.start,
          shadowStart: props.shadowStart,
          shadowWidth: props.shadowWidth,
          horizontal: props.horizontal
        }
        drawerCanvasRuler(options)
      }
    }

    onMounted(() => {
      ratio = props.ratio || window.devicePixelRatio || 1
      initCanvasRef()
      updateCanvasContext(ratio)
      drawRuler(ratio)
    })

    watch(
      () => props.start,
      () => drawRuler(ratio)
    )

    watch([() => props.width, () => props.height], () => {
      updateCanvasContext(ratio)
      drawRuler(ratio)
    })

    const handle = (e: MouseEvent, key: string) => {
      const getValueByOffset = (offset: number, start: number, scale: number) =>
        Math.round(start + offset / scale)
      const offset = props.horizontal ? e.offsetX : e.offsetY
      const value = getValueByOffset(offset, props.start, props.scale)

      switch (key) {
        case 'click':
          emit('onAddLine', value)
          break
        case 'enter':
          emit('update:valueNum', value)
          emit('update:showIndicator', true)
          break
        default:
          emit('update:valueNum', value)
          break
      }
    }

    return {
      handle,
      $canvas
    }
  }
})
</script>
