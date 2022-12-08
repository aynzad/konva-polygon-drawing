import React from 'react'

import { Box, Tab, Tabs, Typography } from '@mui/material'
import RestoreDialog from '@src/components/RestoreDialog'
import { Editor } from '@src/tabs/editor'
import { Stats } from '@src/tabs/stats'

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
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography
          sx={{
            px: 2,
            fontWeight: 'bold'
          }}
          color="primary"
          variant="h6"
          component="h1"
        >
          🔹 Konva Polygon Drawing
        </Typography>
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
      {activeTab === 'stats' && <Stats />}

      <RestoreDialog />
    </Box>
  )
}

export default App
