export interface CanvasRulerOptions {
  ctx: CanvasRenderingContext2D
  start: number
  shadowStart: number
  shadowWidth: number
  horizontal: boolean
  palette: PaletteOptions
  ruler: RulerOptions
}

export interface PaletteOptions {
  bgColor: string
  fontColor: string
  shadowColor: string
  longfgColor: string
  shortfgColor: string
}

export interface RulerOptions {
  scale: number
  ratio: number
  width: number
  height: number
}
