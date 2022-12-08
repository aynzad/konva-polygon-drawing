import { Vector2d } from 'konva/lib/types'

export interface IPoint extends Vector2d {
  id: number
}
export interface IPolygon {
  id: number
  points: IPoint[]
  fill: string
  closed: boolean
}
