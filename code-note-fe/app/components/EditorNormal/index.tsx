'use client'
import React from 'react'
import MonacoEditor from '@monaco-editor/react'

type Props = {
  value: string
  onChange: (newValue: string) => void
  language: string
  theme: string
}

function EditorNormal({ value, onChange, language, theme }: Props) {
  return (
    <div>
      <h2 className='text-center uppercase'>{language}</h2>
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
      />
    </div>
  )
}

EditorNormal.propTypes = {}

export default EditorNormal
