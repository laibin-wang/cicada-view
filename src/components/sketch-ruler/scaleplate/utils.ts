import { CanvasRulerOptions } from '../interface'

export const drawerCanvasRuler = (canvasRuler: CanvasRulerOptions): void => {
  const { ctx, start, shadowStart, shadowWidth, horizontal, palette, ruler } =
    canvasRuler
  const { bgColor, fontColor, shadowColor, longfgColor, shortfgColor } = palette
  const { width, height } = ruler

  // 画刻度尺
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)

  // 阴影
  if (shadowWidth) {
    const shadowX = shadowStart - start // 起点坐标
    const shadowW = shadowWidth // 宽度
    ctx.fillStyle = shadowColor
    if (horizontal) {
      ctx.fillRect(shadowX, 0, shadowW, (height * 3) / 8)
    } else {
      ctx.fillRect(0, shadowX, (width * 3) / 8, shadowW)
    }
  }

  const gridSize = 5 // 每小格表示的宽度
  const gridSize5 = gridSize * 5 // 每大格表示的宽度

  const startValue = (start / gridSize) * gridSize // 绘制起点的刻度(略小于start, 且是gridSize的整数倍)
  const startValue5 = (start / gridSize5) * gridSize5 // 长间隔绘制起点的刻度(略小于start, 且是gridSize5的整数倍)

  const offsetX = ((startValue - start) / gridSize) * gridSize // 起点刻度距离ctx原点(start)的px距离
  const offsetX10 = ((startValue5 - start) / gridSize5) * gridSize5 // 长间隔起点刻度距离ctx原点(start)的px距离
  const endValue = start + (horizontal ? width : height) // 终点刻度(略超出标尺宽度即可)

  // 画刻度和文字
  ctx.beginPath() // clearRect并不能清除掉路径,如果不关闭路径下次绘制时会接着上次的绘制 重置ctx

  ctx.fillStyle = fontColor
  ctx.strokeStyle = longfgColor

  // 绘制长间隔和文字
  for (
    let value = startValue5, count = 0;
    value < endValue;
    value += gridSize5, count++
  ) {
    if (value === 0 || value % (gridSize5 * 2) === 0) {
      const x = offsetX10 + count * gridSize5
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
        ctx.rotate(-Math.PI / 2)
      }

      ctx.fillText(value.toString(), 4, 7)
      ctx.restore()
      if (horizontal) {
        ctx.lineTo(x, height)
      } else {
        ctx.lineTo((width * 9) / 16, x)
      }
    }
  }
  ctx.stroke()
  ctx.closePath()

  // 绘制短间隔
  ctx.beginPath()
  ctx.strokeStyle = shortfgColor
  for (
    let value = startValue, count = 0;
    value < endValue;
    value += gridSize, count++
  ) {
    const x = offsetX + count * gridSize + 0.5
    if (horizontal) {
      ctx.moveTo(x, 0)
      if (value % (gridSize5 * 2) !== 0) {
        ctx.lineTo(x, (height * 1) / 4)
      }
    } else {
      ctx.moveTo(0, x)
      if (value % (gridSize5 * 2) !== 0) {
        ctx.lineTo((width * 1) / 4, x)
      }
    }
  }
  ctx.stroke()
  ctx.closePath()

  // 恢复ctx
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
