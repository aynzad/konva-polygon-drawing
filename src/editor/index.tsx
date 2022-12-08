import { useEffect, useRef } from 'react'
import type { Stage as StageType } from 'konva/lib/Stage'
import { Layer, Stage } from 'react-konva'
import { useDispatch } from 'react-redux'

import { Polygon } from '@src/components/Polygon'
import { Toolbox } from '@src/components/Toolbox'
import { useEditor } from '@src/hooks/use-editor'
import { useZoomStage } from '@src/hooks/use-zoom-stage'
import { isExist } from '@src/store/persist'
import { sagaActions } from '@src/store/saga'

export function Editor() {
  const dispatch = useDispatch()
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

  useEffect(() => {
    const isPreviousSessionExist = isExist()
    if (isPreviousSessionExist) {
      dispatch({ type: sagaActions.LOAD_STATE_SAGA })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    </>
  )
}
