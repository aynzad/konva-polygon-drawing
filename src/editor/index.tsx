import { useRef } from 'react'
import type { Stage as StageType } from 'konva/lib/Stage'
import { Layer, Stage } from 'react-konva'

import { Polygon } from '@src/components/Polygon'
import RestoreDialog from '@src/components/RestoreDialog'
import { Toolbox } from '@src/components/Toolbox'
import { useEditor } from '@src/hooks/use-editor'
import { useZoomStage } from '@src/hooks/use-zoom-stage'

export function Editor() {
  const stageRef = useRef<StageType | null>(null)
  const {
    scale,
    position,
    reset: onResetZoom
  } = useZoomStage({ stage: stageRef?.current })

  const {
    polygons,
    isDrawing,
    handleUndo,
    handleRedo,
    handleAddPoint,
    handleDragPointMove,
    handleDragPointStart
  } = useEditor()

  return (
    <>
      <Toolbox
        hidden={isDrawing}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onResetZoom={onResetZoom}
      />
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
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
              isDrawing={isDrawing}
              {...polygon}
            />
          ))}
        </Layer>
      </Stage>
      <RestoreDialog />
    </>
  )
}
