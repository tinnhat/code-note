'use client'
import React from 'react'
import MonacoEditor from '@monaco-editor/react'

type Props = {
  value: string
  onChange: (newValue: string) => void
  language: string
  theme: string
  readOnly: boolean
}

function EditorNormal({ value, onChange, language, theme, readOnly }: Props) {
  
  return (
    <div>
      <MonacoEditor
        height='90vh'
        language={language}
        value={value}
        onChange={(newValue: string | undefined) => {
          if (newValue !== undefined) {
            onChange(newValue)
          }
        }}
        theme={theme}
        options={{
          readOnly,
        }}
      />
    </div>
  )
}

EditorNormal.propTypes = {}

export default React.memo(EditorNormal)
