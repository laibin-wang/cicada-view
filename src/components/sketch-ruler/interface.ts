export interface PaletteOptions {
  bgColor: string
  fontColor: string
  shadowColor: string
  longfgColor: string
  shortfgColor: string
}

export interface RulerOptions {
  ratio: number
  width: number
  height: number
}

export interface WrapperOptions {
  ratio: number
  width: number
  height: number
  horizontal: boolean
  palette: PaletteOptions
  thick: number
  start: number
  shadowStart: number
  shadowWidth: number
  isShowReferLine: boolean
  lines: Array<number>
}

export interface ShadowType {
  x: number
  y: number
  width: number
  height: number
}

export interface lineType {
  h: Array<number>
  v: Array<number>
}

export interface CanvasRulerOptions {
  ctx: CanvasRenderingContext2D
  start: number
  shadowStart: number
  shadowWidth: number
  horizontal: boolean
  palette: PaletteOptions
  ruler: RulerOptions
}