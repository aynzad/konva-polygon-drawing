import { useRef } from 'react'
import type { Stage as StageType } from 'konva/lib/Stage'
import { Layer, Stage } from 'react-konva'

import { Box } from '@mui/material'
import { DrawingAlert } from '@src/components/DrawingAlert'
import { Polygon } from '@src/components/Polygon'
import { Toolbox } from '@src/components/Toolbox'
import { useEditor } from '@src/hooks/use-editor'
import { useResizeStage } from '@src/hooks/use-resize-stage'
import { useZoomStage } from '@src/hooks/use-zoom-stage'

export function Editor() {
  const stageRef = useRef<StageType | null>(null)

  const {
    scale,
    position,
    reset: onResetZoom
  } = useZoomStage({ stage: stageRef?.current })
  const { width, height } = useResizeStage()

  const {
    polygons,
    isDrawing,
    handleUndo,
    handleRedo,
    handleAddPoint,
    handleDragPointMove,
    handleDragPointStart,
    handleDragPolygonEnd,
    handleDragPolygonStart
  } = useEditor()

  return (
    <>
      <Toolbox
        disabled={isDrawing}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onResetZoom={onResetZoom}
      />
      <Box sx={{ cursor: 'pointer' }}>
        <Stage
          width={width}
          height={height}
          ref={stageRef}
          onClick={handleAddPoint}
          scale={scale}
          position={position}
        >
          <Layer>
            {polygons.map(polygon => (
              <Polygon
                key={polygon.id}
                onDragPointMove={handleDragPointMove}
                onDragPointStart={handleDragPointStart}
                onDragPolygonStart={handleDragPolygonStart}
                onDragPolygonEnd={handleDragPolygonEnd}
                isDrawing={isDrawing}
                {...polygon}
              />
            ))}
          </Layer>
        </Stage>
      </Box>
      {isDrawing && <DrawingAlert />}
    </>
  )
}
