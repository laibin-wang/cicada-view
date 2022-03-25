<template>
  <div class="casing-style">
    <!-- 水平方向 -->
    <wrapper
      :height="thick"
      :horizontal="true"
      :is-show-refer-line="showReferLine"
      :lines="lines.h"
      :offset="offsetLeft"
      :palette="palette"
      :shadow-start="shadow.x"
      :shadow-width="shadow.width"
      :start="startX"
      :thick="thick"
      :width="width"
      @on-line-change="onLineChange" />
    <!-- 竖直方向 -->
    <wrapper
      :height="height"
      :horizontal="false"
      :is-show-refer-line="showReferLine"
      :lines="lines.v"
      :offset="offsetTop"
      :palette="palette"
      :shadow-start="shadow.y"
      :shadow-width="shadow.height"
      :start="startY"
      :thick="thick"
      :width="thick"
      @on-line-change="onLineChange" />
    <div
      class="corner"
      :style="cornerStl">
      <svg
        :class="cornerActiveCls"
        height="16"
        version="1.1"
        viewBox="0 0 1024 1024"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
        @click="onCornerClick">
        <path
          v-if="showReferLine"
          d="M988 508c3.8-3.6 7.4-7 10.6-10.1 14.6-14.2 14.6-37.6 0-51.7C931.7 381.1 739.1 216 512 216 284.9 216 92.3 381.1 25.3 446.2c-14.6 14.2-14.6 37.6 0 51.7 3.2 3.2 6.8 6.5 10.6 10.1-5.1 4.8-9.7 9.2-13.7 13.1-12.8 12.6-12.8 33.2 0 45.7C86.2 629.6 281.3 800 512 800s425.8-170.4 489.8-233.2c12.8-12.6 12.8-33.2 0-45.7-4.1-3.9-8.7-8.3-13.8-13.1zM837.7 619.3C787.9 653.7 737.5 681 688 700.4 627.7 724 568.5 736 512 736c-56 0-114.6-11.8-174.3-35-49.3-19.1-99.3-46-148.8-80-33-22.7-61.4-45.5-83.9-65.1-7.3-6.4-7.3-17.8 0-24.2 21.8-19 49.3-41 81.4-63.2 49.7-34.4 100.1-61.6 149.7-81.1 4.4-1.7 8.7-3.3 13-4.9-28.2 35.4-45 80.3-45.1 129-0.2 115.5 92.4 208.3 207.7 208.5 115 0.2 208.3-93 208.3-208 0-48.9-16.9-93.8-45.1-129.4 3.8 1.4 7.6 2.8 11.4 4.3 49.3 19.1 99.3 46.1 148.8 80 33 22.7 61.4 45.5 83.9 65.1 7.3 6.4 7.3 17.8 0 24.2-21.8 18.9-49.3 41-81.3 63.1zM560 384c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80c0-9-1.5-17.6-4.2-25.6 13.2 22 20.2 47.3 20.2 73.6 0 38.5-15 74.6-42.2 101.8C586.6 641 550.5 656 512 656s-74.6-15-101.8-42.2C383 586.6 368 550.5 368 512s15-74.6 42.2-101.8C437.4 383 473.5 368 512 368c26.3 0 51.6 7 73.6 20.2-8-2.7-16.6-4.2-25.6-4.2z m16 80c0 8.8-7.2 16-16 16s-16-7.2-16-16 7.2-16 16-16 16 7.2 16 16z m395.3 15.8c-3.9 3.8-10.1 3.9-14.2 0.4C868.9 404.3 702.6 288 512 288c-190.6 0-356.9 116.3-445.1 192.2-4.1 3.5-10.3 3.4-14.2-0.4l-0.2-0.1c-4.4-4.2-4.4-11.2 0-15.3 24.8-23.7 64.7-58.9 115.6-94 51.8-35.8 104.3-64.2 156.2-84.5 64-25.1 127.1-37.8 187.6-37.8 60.2 0 123.1 12.6 186.8 37.5 51.7 20.2 104.1 48.4 155.8 84 51.3 35.3 91.8 71 116.9 94.9 4.4 4.2 4.4 11.1 0 15.3 0-0.1-0.1 0-0.1 0z" />
        <template v-else>
          <path
            d="M948.4288 470.7328c25.6 8.448 65.3312 61.44 65.5872 139.4176-50.1248-31.2832-108.2368 11.9296-114.432 28.4672-3.3792 7.7824 17.4592 17.92 14.7968 50.7904-8.96-9.472-53.1968-15.36-81.92-4.7104-112.64 40.192-144.9472 17.0496-144.9472 17.0496s176.6912-29.2864 260.9152-231.0144z" />
          <path
            d="M92.416 474.4192a110.3872 110.3872 0 0 1 46.08 4.6592 127.1296 127.1296 0 0 1 37.7856 20.48 300.6976 300.6976 0 0 1 25.6 22.8864l21.1968 20.8384a379.904 379.904 0 0 0 41.5232 35.2768 309.4016 309.4016 0 0 0 46.08 27.0848 386.4576 386.4576 0 0 0 51.2 19.712c8.8064 2.816 17.8176 5.12 26.88 7.4752l27.392 5.4784c4.5568 0.8704 9.1136 1.9968 13.7216 2.6624l13.8752 1.536 13.8752 1.6384a126.72 126.72 0 0 0 13.9264 1.2288l27.904 0.8704h7.0144l6.9632-0.3584L527.36 645.12l14.0288-0.6656c4.6592 0 9.216-1.1264 13.8752-1.6896 9.216-1.3312 18.5344-2.2528 27.7504-3.84l27.4432-5.8368 6.8608-1.4848 6.7072-1.9968 13.4656-4.0448 13.4656-3.9936c4.4544-1.4336 8.7552-3.328 13.1072-5.12l13.1584-5.12c4.3008-1.792 8.8576-3.1232 13.0048-5.12l25.6-12.1344a131.3792 131.3792 0 0 0 12.3392-6.7584l12.1856-7.0144c4.0448-2.4064 8.192-4.608 12.1344-7.1168l11.5712-7.9872 11.5712-7.9872c1.9456-1.3312 3.9424-2.6112 5.7856-4.0448l5.4784-4.4032 21.8112-17.7664 20.48-19.4048a445.1328 445.1328 0 0 0 68.1472-88.8832l0.3072-0.5632a27.8528 27.8528 0 0 1 48.5376 27.3408A502.5792 502.5792 0 0 1 870.7584 552.96l-22.528 22.5792-24.2688 20.48-6.0416 5.12c-2.0992 1.6384-4.3008 3.1232-6.4 4.7104l-12.8 9.472-13.056 9.3184c-4.352 2.9696-9.0112 5.5808-13.5168 8.3968l-13.568 8.3456c-4.608 2.7136-9.0112 5.6832-13.824 7.9872l-28.416 14.4384c-4.7104 2.56-9.728 4.3008-14.592 6.4512l-14.7456 6.0928c-5.12 1.9456-9.8304 4.1984-14.848 5.9392l-15.36 5.12-15.36 5.12-7.5776 2.4576-7.7824 1.8944-31.0784 7.4752c-10.24 2.048-21.0432 3.4304-31.5904 5.12-5.12 0.7168-10.24 1.8432-15.8208 2.2528l-15.9744 1.2288-15.9744 1.1776-7.9872 0.6144h-8.0384l-32.0512-0.256a151.1936 151.1936 0 0 1-15.9744-1.024l-15.616-1.792-16.128-1.28c-5.12-0.6144-10.5472-1.7408-15.8208-2.56l-31.5904-5.5808c-10.24-2.4576-20.8384-4.864-31.1808-7.8848a445.44 445.44 0 0 1-61.44-22.0672A378.88 378.88 0 0 1 221.9008 640a437.5552 437.5552 0 0 1-51.2-40.96c-15.36-14.08-29.7984-28.672-41.5744-37.2224a48.8448 48.8448 0 0 0-14.7456-7.8848 31.0784 31.0784 0 0 0-13.3632-0.7168 39.68 39.68 0 1 1-10.24-78.7456h0.512z" />
          <path
            d="M162.816 577.1264l-55.04 54.4768a22.1696 22.1696 0 0 1-34.7136-27.0336l39.2192-66.56a32.256 32.256 0 1 1 55.6544 32.7168 34.0992 34.0992 0 0 1-5.12 6.4zM599.4496 665.856l59.2896 65.3824a21.76 21.76 0 0 1-28.3648 32.6144l-72.96-49.7152a32.2048 32.2048 0 1 1 36.3008-53.248 31.488 31.488 0 0 1 5.7344 4.9664zM444.7232 680.0896l28.0576 82.2272a23.1936 23.1936 0 0 1-41.8816 19.3024l-44.288-74.752a32.1536 32.1536 0 1 1 55.3472-32.8192 35.5328 35.5328 0 0 1 2.7648 6.0416zM277.6576 656.896L230.4 729.856a23.1936 23.1936 0 0 1-40.96-20.9408l31.232-81.1008a32.2048 32.2048 0 0 1 60.0576 23.1424 38.0416 38.0416 0 0 1-3.072 5.9392zM107.52 395.7248c4.0448-3.2768 7.168-5.632 10.7008-8.2944s6.912-5.12 10.24-7.424c6.912-5.12 13.824-9.5744 20.8384-14.1312 14.0288-9.1648 28.3136-17.7152 42.8032-25.6A814.3872 814.3872 0 0 1 281.9072 296.96a695.3984 695.3984 0 0 1 193.6896-48.7936 622.0288 622.0288 0 0 1 100.5568-1.4848c8.3968 0.6144 16.7424 1.6896 25.088 2.5088 4.1984 0.4608 8.3456 0.8192 12.544 1.4336l12.3904 2.048c8.2944 1.4848 16.64 2.5088 24.832 4.4544l24.5248 5.6832A626.3296 626.3296 0 0 1 858.112 343.04a25.6 25.6 0 0 1-27.0336 43.1616h-0.3072a573.8496 573.8496 0 0 0-168.0896-70.9632l-22.3232-4.7616c-7.3728-1.5872-14.9504-2.3552-22.4768-3.584l-11.2128-1.6896c-3.7888-0.512-7.5776-0.7168-11.3664-1.0752-7.5776-0.6144-15.36-1.4848-22.6816-1.8944a562.7904 562.7904 0 0 0-90.9824 2.9184 634.88 634.88 0 0 0-176.384 47.616 738.6112 738.6112 0 0 0-81.92 41.3696C209.92 401.8688 196.8128 409.9584 184.32 418.56c-6.2976 4.2496-12.544 8.6016-18.6368 13.056-3.072 2.2528-6.0416 4.5056-9.0112 6.7584s-6.0416 4.7104-8.192 6.5024l-0.3072 0.3072a32 32 0 0 1-40.96-49.1008z" />
        </template>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRefs } from 'vue'
import { ShadowType, linesType, PaletteOptions } from '../interface'
import Wrapper from '../wrapper/index.vue'

export default defineComponent({
  name: 'Casing',
  components: { Wrapper },
  props: {
    thick: {
      type: Number,
      default: 20
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
      default: () => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      })
    },
    lines: {
      type: Object as PropType<linesType>,
      default: () => ({
        h: [],
        v: []
      })
    },
    isShowReferLine: {
      type: Boolean,
      default: false
    },
    cornerActive: {
      type: Boolean,
      default: false
    },
    palette: {
      type: Object as PropType<PaletteOptions>,
      default: () => ({
        bgColor: 'rgba(225,225,225, 0)',
        fontColor: '#FFFFFF',
        shadowColor: '#E8E8E8',
        longfgColor: '#BABBBC',
        shortfgColor: '#C8CDD0'
      })
    }
  },
  emits: ['onCornerClick', 'lineChang'],
  setup (props, { emit }) {
    const { lines, isShowReferLine } = toRefs(props)
    const offsetTop = ref(0)
    const offsetLeft = ref(0)

    const showReferLine = ref(true)
    showReferLine.value = isShowReferLine.value

    const cornerActiveCls = computed(() =>
      props.cornerActive ? ' active' : ''
    )

    const cornerStl = computed(() => ({
      width: `${props.thick}px`,
      height: `${props.thick}px`
    }))

    const onCornerClick = (e: MouseEvent): void => {
      showReferLine.value = !showReferLine.value
      emit('onCornerClick', e)
    }

    const onLineChange = (ary: Array<number>, horizontal: boolean): void => {
      if (horizontal) {
        lines.h = [...ary]
      } else {
        lines.v = [...ary]
      }
      emit('lineChang', lines)
    }

    const setScroll = (offset: number, horizontal: boolean): void => {
      if (horizontal) {
        offsetLeft.value = -offset
      } else {
        offsetTop.value = -offset
      }
    }

    return {
      offsetLeft,
      offsetTop,
      setScroll,
      showReferLine,
      cornerActiveCls,
      cornerStl,
      onCornerClick,
      onLineChange
    }
  }
})
</script>

<style lang="postcss">
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
  border-right: 1px solid rgb(218, 218, 220);
  border-bottom: 1px solid rgb(218, 218, 220);
  background: #000;
  svg {
    fill: #fff;
  }
}
.indicator {
  position: absolute;
  pointer-events: none;
  .value {
    position: absolute;
    background: white;
  }
}
.scaleplate {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
