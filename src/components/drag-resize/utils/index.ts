import { ResizingHandle, ContainerProvider, ParentSize, ReferenceLineMap, HandleEvent, Position } from '../type'
import { ALL_HANDLES } from '../core/resizable'

export function filterHandles(handles: ResizingHandle[]): ResizingHandle[] {
  if (handles && handles.length > 0) {
    const result: ResizingHandle[] = []
    handles.forEach((item) => {
      if (ALL_HANDLES.includes(item) && !result.includes(item)) {
        result.push(item)
      }
    })
    return result
  } else {
    return []
  }
}

export function getId(): string {
  return String(Math.random()).substring(2) + String(Date.now())
}

export function getElSize(el: Element): { width: number; height: number } {
  const style = window.getComputedStyle(el)
  const width = parseFloat(style.getPropertyValue('width'))
  const height = parseFloat(style.getPropertyValue('height'))

  return { width, height }
}

export function calcAngle(element: HTMLElement, event: HandleEvent): number {
  const rect = element.getBoundingClientRect()

  const originX = rect.left + rect.width / 2
  const originY = rect.top + rect.height / 2

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

  // 获得中心点和鼠标坐标连线，与y轴正半轴之间的夹角
  const x = Math.abs(originX - clientX)
  const y = Math.abs(originY - clientY)
  const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  const cos = y / z
  const rad = Math.acos(cos) // 用反三角函数求弧度
  let angle = Math.floor(180 / (Math.PI / rad)) // 将弧度转换成角度

  if (clientX > originX && clientY > originY) {
    // 鼠标在第四象限
    angle = 180 - angle
  }

  if (clientX === originX && clientY > originY) {
    // 鼠标在y轴负方向上
    angle = 180
  }

  if (clientX > originX && clientY === originY) {
    // 鼠标在x轴正方向上
    angle = 90
  }

  if (clientX < originX && clientY > originY) {
    // 鼠标在第三象限
    angle = 180 + angle
  }

  if (clientX < originX && clientY === originY) {
    // 鼠标在x轴负方向
    angle = 270
  }

  if (clientX < originX && clientY < originY) {
    // 鼠标在第二象限
    angle = 360 - angle
  }

  return angle
}

export function getReferenceLineMap(
  containerProvider: ContainerProvider,
  parentSize: ParentSize,
  id?: string
): ReferenceLineMap | null {
  if (containerProvider.disabled.value) {
    return null
  }

  const referenceLine = {
    row: [] as number[],
    col: [] as number[]
  }
  const { parentWidth, parentHeight } = parentSize

  referenceLine.row.push(...containerProvider.adsorbRows)
  referenceLine.col.push(...containerProvider.adsorbCols)

  if (containerProvider.adsorbParent.value) {
    referenceLine.row.push(0, parentHeight.value, parentHeight.value / 2)
    referenceLine.col.push(0, parentWidth.value, parentWidth.value / 2)
  }

  const widgetPositionStore = containerProvider.getPositionStore(id)

  Object.values(widgetPositionStore).forEach((pos: Position): void => {
    referenceLine.row.push(pos.y, pos.y + pos.h, pos.y + pos.h / 2)
    referenceLine.col.push(pos.x, pos.x + pos.w, pos.x + pos.w / 2)
  })

  const referenceLineMap: ReferenceLineMap = {
    row: referenceLine.row.reduce((pre, cur) => {
      return { ...pre, [cur]: { min: cur - 5, max: cur + 5, value: cur } }
    }, {}),
    col: referenceLine.col.reduce((pre, cur) => {
      return { ...pre, [cur]: { min: cur - 5, max: cur + 5, value: cur } }
    }, {})
  }

  return referenceLineMap
}

export const addEvent = createEventListenerFunction('addEventListener')

export const removeEvent = createEventListenerFunction('removeEventListener')

function createEventListenerFunction(type: 'addEventListener' | 'removeEventListener'): any {
  return <K extends keyof HTMLElementEventMap>(el: HTMLElement, events: K | K[], handler: any) => {
    if (!el) {
      return
    }
    if (typeof events === 'string') {
      events = [events]
    }
    events.forEach((e) => el[type](e, handler, { passive: false }))
  }
}

export const IDENTITY = Symbol('DraggableResizable')
