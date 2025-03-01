'use client'
import EditorNormal from '@/app/components/EditorNormal'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'

type Props = {
  code: CodeItem[]
  edit: boolean
  onCodeChange?: (code: CodeItem[]) => void
}

const EditorHtmlCssJS = ({ code, edit, onCodeChange }: Props) => {
  const [htmlValue, setHtmlValue] = useState<CodeItem>({
    key: 'html',
    value: '',
  })
  const [cssValue, setCssValue] = useState<CodeItem>({
    key: 'css',
    value: '',
  })
  const [javascriptValue, setJavascriptValue] = useState<CodeItem>({
    key: 'js',
    value: '',
  })
  const [logs, setLogs] = useState<string[]>([]) // Lưu trữ các logs

  const [srcDoc, setSrcDoc] = useState('') // Nội dung iframe

  // Override console.log to capture logs
  const captureLogs = () => {
    const originalConsoleLog = console.log
    console.log = (...args) => {
      setLogs(prevLogs => [...prevLogs, args.join(' ')])
      originalConsoleLog(...args)
    }
  }

  useEffect(() => {
    setHtmlValue({
      key: 'html',
      value: code[0].value,
    })
    setCssValue({
      key: 'css',
      value: code[1].value,
    })
    setJavascriptValue({
      key: 'js',
      value: code[2].value,
    })
  }, [edit])

  useEffect(() => {
    runCode()
  }, [code])

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange([htmlValue, cssValue, javascriptValue])
    }
  }, [htmlValue.value, cssValue.value, javascriptValue.value])

  const runCode = () => {
    setLogs([]) // Clear previous logs
    captureLogs() // Override console.log
    setSrcDoc(`
          <html>
           <head><style>${cssValue.value}</style></head>
           <body>${htmlValue.value}<script>${javascriptValue.value}<\/script></body>
         </html>
         `)
    try {
      // Use eval to run the code (⚠ Be careful with untrusted code)
      eval(javascriptValue.value)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLogs([`Error: ${error.message}`])
      } else {
        setLogs([`An unknown error occurred`])
      }
    }
  }

  const onChangeHtml = (newValue: string): void => {
    setHtmlValue({
      key: 'html',
      value: newValue,
    })
  }
  const onChangeCss = (newValue: string): void => {
    setCssValue({
      key: 'css',
      value: newValue,
    })
  }
  const onChangeJavascript = (newValue: string): void => {
    setJavascriptValue({
      key: 'js',
      value: newValue,
    })
  }

  const handleClearLogs = () => {
    setLogs([])
  }

  return (
    <div className='flex gap-6 w-full h-screen mt-5'>
      {/* Left Side: Code Editor */}
      <div className='w-1/2 flex flex-col h-full bg-gray-800 p-4 rounded-lg shadow-lg'>
        <Tabs defaultValue='html' className='w-full'>
          <TabsList className='bg-gray-700 text-gray-100'>
            <TabsTrigger value='html'>Html</TabsTrigger>
            <TabsTrigger value='css'>Css</TabsTrigger>
            <TabsTrigger value='javascript'>Javascript</TabsTrigger>
          </TabsList>
          <div className='flex-grow'>
            <TabsContent value='html' className='h-full'>
              <EditorNormal
                value={htmlValue.value}
                onChange={onChangeHtml}
                language='html'
                theme='vs-dark'
                readOnly={!edit}
              />
            </TabsContent>
            <TabsContent value='css' className='h-full'>
              <EditorNormal
                value={cssValue.value}
                onChange={onChangeCss}
                language='css'
                theme='vs-dark'
                readOnly={!edit}
              />
            </TabsContent>
            <TabsContent value='javascript' className='h-full'>
              <EditorNormal
                value={javascriptValue.value}
                onChange={onChangeJavascript}
                language='javascript'
                theme='vs-dark'
                readOnly={!edit}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Right Side: Preview & Console */}
      <div className='w-1/2 flex flex-col h-full'>
        {/* Preview Section */}
        <div className='flex-grow flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg'>
          <Button
            onClick={runCode}
            className='w-fit bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          >
            Run Code
          </Button>
          <h2 className='text-center text-gray-300 mt-2'>Preview</h2>
          <div className='bg-white flex-grow border border-gray-700 rounded'>
            <iframe title='Preview' srcDoc={srcDoc} className='w-full h-full' />
          </div>
        </div>

        {/* Console Output Section */}
        <div className='h-1/5 mt-4 bg-gray-800 text-gray-100 px-2 pb-2 overflow-auto border border-gray-700 rounded'>
          {/* Phần sticky chứa tiêu đề và nút */}
          <div className='sticky top-0 bg-gray-800 z-10 border-b p-1 border-gray-700'>
            <div className='flex justify-between items-center'>
              <h3 className='text-sm font-bold text-gray-300'>Console Output:</h3>
              <Button onClick={handleClearLogs} variant='secondary' size='sm'>
                Clear Log
              </Button>
            </div>
          </div>

          {/* Phần nội dung log có thể cuộn */}
          <div className='mt-2'>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className='text-green-400'>
                  {log}
                </div>
              ))
            ) : (
              <div className='text-gray-500'>No logs available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(EditorHtmlCssJS)
