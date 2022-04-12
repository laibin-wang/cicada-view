<template>
  <div>
    <div> x:{{ x }} <button @click="x += 10"> + </button><button @click="x -= 10"> - </button> </div>
    <div> y:{{ y }}<button @click="y += 10"> + </button><button @click="y -= 10"> - </button> </div>
    <div> w:{{ w }}<button @click="w += 10"> + </button><button @click="w -= 10"> - </button> </div>
    <div> h: {{ h }}<button @click="h += 10"> + </button><button @click="h -= 10"> - </button> </div>
    <div>active:{{ active }}<br /></div>
    <div class="parent">
      <DragResizer
        v-model:active="active"
        v-model:h="h"
        v-model:r="rotate"
        v-model:w="w"
        v-model:x="x"
        v-model:y="y"
        :draggable="true"
        :init-h="120"
        :init-w="110"
        :resizable="true"
        :z="zIndex"
      >
        <!-- @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-end="print('drag-end')"
        @drag-start="print('drag-start')"
        @dragging="print('dragging')"
        @resize-start="print('resize-start')"
        @resizing="print('resizing')"
        @resize-end="print('resize-end')"
        @rotating="print('rotating')"
        @rotate-end="print('rotat-end')"
        @rotate-start="print('rotat-start')"> -->
        This is a test example
      </DragResizer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { DragResizer } from '@/components/drag-resize/index'

export default defineComponent({
  name: 'Survey',
  // methods: {
  //   print (val) {
  //     const str = ''
  //     str = val
  //   }
  // },
  components: {
    DragResizer
  },
  data() {
    return {
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      zIndex: 1,
      active: false,
      draggable: true,
      resizable: true,
      rotate: 0
    }
  }
})
</script>

<style lang="postcss" scoped>
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
  color: #fff;
}
</style>
