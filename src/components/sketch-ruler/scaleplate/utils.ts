import { CanvasRulerOptions } from '../interface'

function getGridSize(scale: number) {
  if (scale <= 0.25) return 40
  if (scale <= 0.5) return 20
  if (scale <= 1) return 10
  if (scale <= 2) return 5
  if (scale <= 4) return 2
  return 1
}

const FONT_SCALE = 0.83

export const drawerCanvasRuler = (canvasRuler: CanvasRulerOptions) => {
  const { ctx, start, shadowStart, shadowWidth, horizontal, palette, ruler } = canvasRuler
  const { bgColor, fontColor, shadowColor, longfgColor, shortfgColor } = palette
  const { scale, ratio, width, height } = ruler

  // 缩放 ctx 画布清空
  ctx.scale(ratio, ratio)
  ctx.clearRect(0, 0, width, height)

  // 画刻度尺
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  // 阴影
  if (shadowWidth) {
    const shadowX = (shadowStart - start) * scale // 起点坐标
    const shadowW = shadowWidth * scale // 宽度
    ctx.fillStyle = shadowColor
    if (horizontal) {
      ctx.fillRect(shadowX, 0, shadowW, (height * 3) / 8)
    } else {
      ctx.fillRect(0, shadowX, (width * 3) / 8, shadowW)
    }
  }

  const gridSize = getGridSize(scale) // 每小格表示的宽度
  const gridPixel = gridSize * scale
  const gridSize10 = gridSize * 10 // 每大格表示的宽度
  const gridPixel10 = gridSize10 * scale

  const startValue = Math.floor(start / gridSize) * gridSize // 绘制起点的刻度(略小于start, 且是gridSize的整数倍)
  const startValue10 = Math.floor(start / gridSize10) * gridSize10 // 长间隔绘制起点的刻度(略小于start, 且是gridSize10的整数倍)

  const offsetX = ((startValue - start) / gridSize) * gridPixel // 起点刻度距离ctx原点(start)的px距离
  const offsetX10 = ((startValue10 - start) / gridSize10) * gridPixel10 // 长间隔起点刻度距离ctx原点(start)的px距离
  const endValue = start + Math.ceil((horizontal ? width : height) / scale) // 终点刻度(略超出标尺宽度即可)

  // 画刻度和文字
  ctx.beginPath() // clearRect并不能清除掉路径,如果不关闭路径下次绘制时会接着上次的绘制 重置ctx

  ctx.fillStyle = fontColor
  ctx.strokeStyle = longfgColor

  // 绘制长间隔和文字
  for (let value = startValue10, count = 0; value < endValue; value += gridSize10, count++) {
    const x = offsetX10 + count * gridPixel10 + 0.5
    if (horizontal) {
      ctx.moveTo(x, 0)
    } else {
      ctx.moveTo(0, x)
    }
    ctx.save()

    if (horizontal) {
      ctx.translate(x, height * 0.4)
    } else {
      ctx.translate(width * 0.4, x)
    }

    if (!horizontal) {
      ctx.rotate(-Math.PI / 2)
    }
    ctx.scale(FONT_SCALE / ratio, FONT_SCALE / ratio)
    ctx.fillText(value.toString(), 4 * ratio, 7 * ratio)
    ctx.restore()
    if (horizontal) {
      ctx.lineTo(x, (height * 9) / 16)
    } else {
      ctx.lineTo((width * 9) / 16, x)
    }
  }
  ctx.stroke()
  ctx.closePath()

  // 绘制短间隔
  ctx.beginPath()
  ctx.strokeStyle = shortfgColor
  for (let value = startValue, count = 0; value < endValue; value += gridSize, count++) {
    const x = offsetX + count * gridPixel + 0.5
    if (horizontal) {
      ctx.moveTo(x, 0)
    } else {
      ctx.moveTo(0, x)
    }
    // 如果为0 则说明是长的线
    if (value % gridSize10 !== 0) {
      if (horizontal) {
        ctx.lineTo(x, (height * 1) / 4)
      } else {
        ctx.lineTo((width * 1) / 4, x)
      }
    }
  }
  ctx.stroke()
  ctx.closePath()

  // 恢复ctx
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}