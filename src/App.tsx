import React from 'react'

import { Box, Tab,Tabs } from '@mui/material'

import { Counter } from './counter'
import { Editor } from './editor'

const tabs = {
  editor: 'Editor',
  stats: 'Stats'
}

type TabItems = keyof typeof tabs

function App() {
  const [activeTab, setActiveTab] = React.useState<TabItems>('editor')
  const handleTabChange = (_: unknown, newValue: TabItems) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Tabs">
          {Object.keys(tabs).map((key, index) => (
            <Tab
              value={key as TabItems}
              label={key}
              key={index}
              id={`tab-${key}`}
            />
          ))}
        </Tabs>
      </Box>

      {activeTab === 'editor' && <Editor />}
      {activeTab === 'stats' && <Counter />}
    </Box>
  )
}

export default App
