export interface IDot {
  id: number
  x: number
  y: number
}
export interface IPolygon {
  id: number
  dots: IDot[]
  fill: string
  closed: boolean
}
