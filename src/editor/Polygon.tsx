import { KonvaEventObject } from 'konva/lib/Node'
import { Circle, Line } from 'react-konva'

import { IPolygon } from '@src/types'

interface Props extends IPolygon {
  isDrawing: boolean
  onDragDot: (
    event: KonvaEventObject<DragEvent>,
    shapeId: number,
    dotId: number
  ) => void
}
export function Polygon({
  id,
  dots,
  closed,
  fill,
  isDrawing,
  onDragDot
}: Props) {
  return (
    <>
      <Line
        points={dots
          .map(dot => [dot.x, dot.y])
          .reduce((prev, current) => prev.concat(current))}
        fill={fill}
        stroke={'orange'}
        strokeWidth={1}
        draggable={false}
        closed={closed}
        dash={[]}
      />

      {dots.map(dot => (
        <Circle
          key={dot.id}
          x={dot.x}
          y={dot.y}
          radius={4}
          stroke="#ff0000"
          strokeWidth={1}
          onDragMove={e => onDragDot(e, id, dot.id)}
          draggable={!isDrawing}
        />
      ))}
    </>
  )
}
