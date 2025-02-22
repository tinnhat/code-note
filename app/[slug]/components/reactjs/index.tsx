/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { lintGutter } from '@codemirror/lint'
import {
  SandpackConsole,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react'
import CodeMirror from '@uiw/react-codemirror'
import { useEffect, useState } from 'react'
import ModalAddNewFile from '../Modal/AddNewFile'

interface CustomCodeEditorProps {
  activeFile: string
  files: {
    [key: string]: {
      code: string
    }
  }
  setFiles: any
}

const CustomCodeEditor = ({ activeFile, files, setFiles }: CustomCodeEditorProps) => {
  const { sandpack } = useSandpack()
  const [code, setCode] = useState(files[activeFile]?.code || '')

  useEffect(() => {
    setCode(files[activeFile]?.code || '')
  }, [activeFile, files])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    sandpack.updateFile(activeFile, newCode)
    setFiles((prevFiles: any) => ({
      ...prevFiles,
      [activeFile]: { code: newCode },
    }))
  }

  return (
    <CodeMirror
      value={code}
      height='100vh'
      theme='dark'
      onChange={handleCodeChange}
      extensions={[activeFile.endsWith('.css') ? css() : javascript(), lintGutter()]}
    />
  )
}

const EditorReact = () => {
  const [files, setFiles] = useState<{
    [key: string]: {
      code: string
    }
  }>({
    '/App.js': {
      code: `import React from 'react';
import './styles.css';
import Button from './button';

export default function App() {
  return (
    <div className="app">
      <h1>Hello React</h1>
      <Button>Click me</Button>
    </div>
  );
}`,
    },
    '/styles.css': {
      code: `.app {
  padding: 20px;
  text-align: center;
  height: 100vh;

}

body {
  background-color: #222;
  color: white;
  font-family: sans-serif;
}`,
    },
    '/button.jsx': {
      code: `import React from 'react'
export default function Button({ children }) {
      const onClick = () => {
        console.log('Button clicked!');
      };
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}`,
    },
  })

  const [activeFile, setActiveFile] = useState('/App.js')
  const [showModal, setShowModal] = useState(false)

  //save file
  // const saveFiles = () => {
  //   console.log('Saving files:', files)
  // }

  return (
    <>
      <div className='w-full h-full min-h-screen flex flex-col bg-gray-900 text-white p-4'>
        <SandpackProvider template='react' files={files}>
          {/* <SandpackLayout className="flex w-full h-full space-x-4"> */}
          <div className='flex w-full h-full gap-4'>
            <div className='w-1/2 h-full bg-gray-800 rounded p-2'>
              <div className='flex space-x-4 mb-2'>
                <div className='w-4/5'>
                  <Select defaultValue={activeFile} onValueChange={value => setActiveFile(value)}>
                    <SelectTrigger className='w-full bg-gray-700 text-white border-gray-600 hover:bg-gray-600 focus:ring-gray-500'>
                      <SelectValue placeholder='Select a file' />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-700 border-gray-600'>
                      {Object.keys(files).map(file => (
                        <SelectItem
                          key={file}
                          value={file}
                          className='text-white hover:bg-gray-600 focus:bg-gray-600'
                        >
                          {file}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='w-1/5 text-right'>
                  <Button onClick={() => setShowModal(true)}>Add</Button>
                </div>
              </div>

              <CustomCodeEditor activeFile={activeFile} files={files} setFiles={setFiles} />
            </div>

            <div className='w-1/2 h-screen bg-black p-2 rounded'>
              <SandpackPreview className='h-4/5' />
              <div className='h-1/5 bg-gray-900 rounded mt-4 overflow-auto'>
                <SandpackConsole className='h-full w-full' />
              </div>
            </div>
          </div>
        </SandpackProvider>
      </div>
      <ModalAddNewFile show={showModal} setShowModal={setShowModal} setFiles={setFiles} />
    </>
  )
}
export default EditorReact
