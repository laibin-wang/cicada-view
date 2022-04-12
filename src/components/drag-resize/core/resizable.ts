import { defineComponent, ref, toRef, h, Ref, inject } from 'vue'
import { ResizingHandle, ContainerProvider, UpdatePosition, GetPositionStore, SetMatchedLine } from '../types'
import { filterHandles, IDENTITY, getElSize } from '../utils'
import {
  initState,
  initParent,
  initLimitSizeAndMethods,
  initDraggableContainer,
  initRotateContainer,
  initResizeHandle,
  watchProps
} from '../hooks'

import './common.css'

export const ALL_HANDLES: ResizingHandle[] = ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br']

export const VdrProps = {
  initW: {
    type: Number,
    default: null
  },
  initH: {
    type: Number,
    default: null
  },
  w: {
    type: Number,
    default: 0
  },
  h: {
    type: Number,
    default: 0
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  z: {
    type: Number,
    default: 0
  },
  r: {
    type: Number,
    default: 0
  },
  rotatable: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: Boolean,
    default: true
  },
  resizable: {
    type: Boolean,
    default: true
  },
  disabledX: {
    type: Boolean,
    default: false
  },
  disabledY: {
    type: Boolean,
    default: false
  },
  disabledW: {
    type: Boolean,
    default: false
  },
  disabledH: {
    type: Boolean,
    default: false
  },
  minW: {
    type: Number,
    default: 20
  },
  minH: {
    type: Number,
    default: 20
  },
  active: {
    type: Boolean,
    default: false
  },
  parent: {
    type: Boolean,
    default: false
  },
  handles: {
    type: Array,
    default: ALL_HANDLES,
    validator: (handles: ResizingHandle[]): boolean => {
      return filterHandles(handles).length === handles.length
    }
  },
  classNameDraggable: {
    type: String,
    default: 'draggable'
  },
  classNameResizable: {
    type: String,
    default: 'resizable'
  },
  classNameDragging: {
    type: String,
    default: 'dragging'
  },
  classNameResizing: {
    type: String,
    default: 'resizing'
  },
  classNameActive: {
    type: String,
    default: 'active'
  },
  classNameHandle: {
    type: String,
    default: 'handle'
  },
  classNameRotator: {
    type: String,
    default: 'rotator'
  },
  lockAspectRatio: {
    type: Boolean,
    default: false
  },
  parentScaleX: {
    type: Number,
    default: 1
  },
  parentScaleY: {
    type: Number,
    default: 1
  },
  triggerKey: {
    type: String,
    default: 'left'
    // },
    // onChange: {
    //   type: Function,
    //   default: null
  }
}

const emits = [
  'activated',
  'deactivated',
  'drag-start',
  'resize-start',
  'dragging',
  'resizing',
  'drag-end',
  'rotating',
  'rotate-start',
  'rotate-end',
  'resize-end',
  'update:w',
  'update:h',
  'update:x',
  'update:y',
  'update:r',
  'update:active'
]

const VueResizable = defineComponent({
  name: 'Resizable',
  props: VdrProps,
  emits: emits,
  setup(props, { emit }) {
    const containerProps = initState(props, emit)
    const provideIdentity = inject('identity')
    let containerProvider: ContainerProvider | null = null

    if (provideIdentity === IDENTITY) {
      containerProvider = {
        updatePosition: inject<UpdatePosition>('updatePosition')!,
        getPositionStore: inject<GetPositionStore>('getPositionStore')!,
        disabled: inject<Ref<boolean>>('disabled')!,
        adsorbParent: inject<Ref<boolean>>('adsorbParent')!,
        adsorbCols: inject<number[]>('adsorbCols')!,
        adsorbRows: inject<number[]>('adsorbRows')!,
        setMatchedLine: inject<SetMatchedLine>('setMatchedLine')!
      }
    }

    const containerRef = ref<HTMLElement>()
    const parentSize = initParent(containerRef)
    const limitProps = initLimitSizeAndMethods(props, parentSize, containerProps)
    initDraggableContainer(
      containerRef,
      containerProps,
      limitProps,
      toRef(props, 'draggable'),
      emit,
      containerProvider,
      parentSize
    )

    const resizeHandle = initResizeHandle(containerProps, limitProps, parentSize, props, emit)
    const rotateHandle = initRotateContainer(containerRef, containerProps, props, emit)
    watchProps(props, limitProps)

    return {
      containerRef,
      containerProvider,
      ...containerProps,
      ...parentSize,
      ...limitProps,
      ...resizeHandle,
      ...rotateHandle
    }
  },
  computed: {
    style(): { [propName: string]: string | number } {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        top: `${this.top}px`,
        left: `${this.left}px`,
        zIndex: this.zIndex,
        transform: `rotate(${this.rotate}deg)`
      }
    },

    klass(): { [propName: string]: string | boolean } {
      return {
        [this.classNameActive]: this.enable,
        [this.classNameDragging]: this.dragging,
        [this.classNameResizing]: this.resizing,
        [this.classNameDraggable]: this.draggable,
        [this.classNameResizable]: this.resizable
      }
    }
  },
  mounted() {
    if (!this.containerRef) return
    this.containerRef.ondragstart = (): boolean => false
    const { width, height } = getElSize(this.containerRef)
    this.setWidth(this.initW === null ? this.w || width : this.initW)
    this.setHeight(this.initH === null ? this.h || height : this.initH)

    if (this.containerProvider) {
      this.containerProvider.updatePosition(this.id, {
        x: this.left,
        y: this.top,
        w: this.width,
        h: this.height,
        r: this.rotate
      })
    }
  },
  render() {
    const handlers = this.handlesFiltered.map((item) => {
      const handleClass = ['vdr-handle', `vdr-handle-${item}`, this.classNameHandle, `${this.classNameHandle}-${item}`]
      return h('div', {
        class: handleClass,
        style: { display: this.enable ? 'block' : 'none' },
        onMousedown: (e: MouseEvent) => this.resizeHandleDown(e, item),
        onTouchstart: (e: TouchEvent) => this.resizeHandleDown(e, item)
      })
    })

    return h(
      'div',
      {
        ref: 'containerRef',
        class: ['vdr-container', this.klass],
        style: this.style
      },
      [
        this.$slots.default && this.$slots.default(),
        ...handlers,
        h('div', {
          style: { display: this.rotatable && this.enable ? 'block' : 'none' },
          class: `vdr-rotator ${this.classNameRotator}`,
          onMousedown: (e: MouseEvent) => this.rotateHandle(e),
          onTouchstart: (e: TouchEvent) => this.rotateHandle(e)
        })
      ]
    )
  }
})

export default VueResizable
