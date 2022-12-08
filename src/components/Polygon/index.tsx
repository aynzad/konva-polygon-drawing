import { KonvaEventObject } from 'konva/lib/Node'
import { Circle, Line } from 'react-konva'

import { IPolygon } from '@src/types'

interface Props extends IPolygon {
  isDrawing: boolean
  onDragPointStart: (
    event: KonvaEventObject<DragEvent>,
    shapeId: number,
    pointId: number
  ) => void
  onDragPointMove: (
    event: KonvaEventObject<DragEvent>,
    shapeId: number,
    pointId: number
  ) => void
}
export function Polygon({
  id,
  points,
  closed,
  fill,
  isDrawing,
  onDragPointStart,
  onDragPointMove
}: Props) {
  return (
    <>
      <Line
        points={points
          .map(point => [point.x, point.y])
          .reduce((prev, current) => prev.concat(current))}
        fill={fill}
        stroke={'orange'}
        strokeWidth={1}
        draggable={false}
        closed={closed}
        dash={[]}
      />

      {points.map(point => (
        <Circle
          key={point.id}
          x={point.x}
          y={point.y}
          radius={4}
          stroke="#ff0000"
          strokeWidth={1}
          onDragMove={e => onDragPointMove(e, id, point.id)}
          onDragStart={e => onDragPointStart(e, id, point.id)}
          draggable={!isDrawing}
        />
      ))}
    </>
  )
}
