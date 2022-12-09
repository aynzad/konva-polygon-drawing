import { useDispatch, useSelector } from 'react-redux'
import { useCopyToClipboard } from 'react-use'

import { RootState } from '@src/store'
import { EditorState, hydrate } from '@src/layouts/editor/editorSlice'

import PromptDialog from '../PromptDialog'

interface Props {
  isOpenExportDialog: boolean
  onCloseExportDialog: () => void
  isOpenImportDialog: boolean
  onCloseImportDialog: () => void
}
export function ImportExport({
  isOpenExportDialog,
  onCloseExportDialog,
  isOpenImportDialog,
  onCloseImportDialog
}: Props) {
  const dispatch = useDispatch()
  const exportJson = useSelector((state: RootState) =>
    JSON.stringify(state.editor)
  )

  const [, copyToClipboard] = useCopyToClipboard()

  const handleCopyExportJson = (json: string) => {
    copyToClipboard(json)
  }

  const handleImportJson = (json: string) => {
    try {
      const importState = JSON.parse(json) as EditorState
      dispatch(hydrate(importState))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {isOpenExportDialog && (
        <PromptDialog
          open={true}
          onClose={onCloseExportDialog}
          onApply={handleCopyExportJson}
          title="Export"
          description="This is the state of your drawings in json format, you can copy and save it"
          buttonText="Copy json"
          textBoxReadonly
          textBoxInitialValue={exportJson}
        />
      )}

      {isOpenImportDialog && (
        <PromptDialog
          open
          onClose={onCloseImportDialog}
          onApply={handleImportJson}
          title="Import"
          description="Insert the json state of your drawing and click import to load your drawings"
          buttonText="Import states"
        />
      )}
    </>
  )
}
