import { KonvaEventObject } from 'konva/lib/Node'
import { Circle, Group, Line } from 'react-konva'

import { IPolygon } from '@src/types'
import { changeStageCursor } from '@src/utils/change-stage-cursor'

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
  onDragPolygonStart: (
    event: KonvaEventObject<DragEvent>,
    shapeId: number
  ) => void
  onDragPolygonEnd: (
    event: KonvaEventObject<DragEvent>,
    shapeId: number
  ) => void
}
export function Polygon({
  id,
  points,
  closed,
  fill,
  isDrawing,
  onDragPointStart,
  onDragPointMove,
  onDragPolygonStart,
  onDragPolygonEnd
}: Props) {
  return (
    <>
      <Group
        name="polygon"
        draggable={!isDrawing && closed}
        onMouseEnter={e => changeStageCursor(e, isDrawing, 'move')}
        onMouseLeave={e => changeStageCursor(e, isDrawing)}
        onDragEnd={e => onDragPolygonEnd(e, id)}
        onDragStart={e => onDragPolygonStart(e, id)}
      >
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
            onMouseEnter={e => changeStageCursor(e, isDrawing, 'crosshair')}
            onMouseLeave={e => changeStageCursor(e, isDrawing)}
            onDragMove={e => onDragPointMove(e, id, point.id)}
            onDragStart={e => onDragPointStart(e, id, point.id)}
            onDragEnd={e => changeStageCursor(e, isDrawing)}
            draggable={!isDrawing}
          />
        ))}
      </Group>
    </>
  )
}
