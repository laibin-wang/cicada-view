<template>
  <div
    v-show="showLine"
    class="line"
    :style="[offset, borderCursor]"
    @mousedown="handleDown">
    <div
      class="action"
      :style="actionStyle">
      <span
        class="del"
        @click="handleRemove">&times;</span>
      <span class="value">{{ startV }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'Line',
  props: {
    index: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    start: {
      type: Number,
      default: 0
    },
    thick: {
      type: Number,
      default: 20
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    isShowReferLine: {
      type: Boolean,
      default: false
    },
    lineColor: {
      type: String,
      default: '#EB5648'
    }
  },
  emits: ['onMouseDown', 'onRelease', 'onRemove'],
  setup (props, { emit }) {
    const startV = ref(0)
    const showLine = ref(true)

    const setShowLine = (offset: number): void => {
      showLine.value = offset >= 0
    }

    onMounted(() => {
      startV.value = props.value
    })

    const offset = computed(() => {
      const offset = startV.value - props.start
      setShowLine(offset)

      if (props.horizontal) {
        return { left: `${offset}px` }
      } else {
        return { top: `${offset}px` }
      }
    })

    const borderCursor = computed(() => {
      const borderCss = `1px solid ${props.lineColor}`

      if (props.horizontal) {
        return {
          borderLeft: borderCss,
          cursor: props.isShowReferLine ? 'ew-resize' : 'none'
        }
      }
      return {
        borderTop: borderCss,
        cursor: props.isShowReferLine ? 'ns-resize' : 'none'
      }
    })

    const actionStyle = computed(() => {
      if (props.horizontal) {
        return { top: `${props.thick}px` }
      }
      return { left: `${props.thick}px` }
    })

    const handleDown = (e: MouseEvent): void => {
      const startD = props.horizontal ? e.clientX : e.clientY
      const initValue = startV.value

      emit('onMouseDown')

      const onMove = (e: MouseEvent): void => {
        const currentD = props.horizontal ? e.clientX : e.clientY
        const newValue = Math.round(initValue + (currentD - startD))
        startV.value = newValue
      }

      const onEnd = (): void => {
        emit('onRelease', startV.value, props.index)
        // 移除监听事件 mousemove， mouseup
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)
      }

      // 添加监听事件 mousemove， mouseup
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onEnd)
    }

    const handleRemove = (): void => {
      emit('onRemove', props.index)
    }

    return {
      startV,
      showLine,
      offset,
      borderCursor,
      actionStyle,
      handleDown,
      handleRemove
    }
  }
})
</script>

<style lang="postcss" scoped>
.line {
  position: absolute;
  pointer-events: auto;
  .action {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .value {
    pointer-events: none;
    transform: scale(0.83);
  }
  .del {
    padding: 3px 5px;
    cursor: pointer;
    visibility: hidden;
  }
  &:hover .del {
    visibility: visible;
  }
}
</style>
