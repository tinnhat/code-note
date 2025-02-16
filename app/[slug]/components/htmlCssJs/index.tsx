import EditorNormal from '@/app/components/EditorNormal'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'


const EditorHtmlCssJS = () => {
  const [htmlValue, setHtmlValue] = useState('')
  const [cssValue, setCssValue] = useState('')
  const [javascriptValue, setJavascriptValue] = useState('')
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

  const runCode = () => {
    setLogs([]) // Clear previous logs
    captureLogs() // Override console.log
    setSrcDoc(`
          <html>
           <head><style>${cssValue}</style></head>
           <body>${htmlValue}<script>${javascriptValue}<\/script></body>
         </html>
         `)
    try {
      // Use eval to run the code (⚠ Be careful with untrusted code)
      eval(javascriptValue)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLogs([`Error: ${error.message}`])
      } else {
        setLogs([`An unknown error occurred`])
      }
    }
  }

  // const runCode = () => {
  //   setSrcDoc(`
  //     <html>
  //       <head><style>${cssValue}</style></head>
  //       <body>${htmlValue}<script>${javascriptValue}<\/script></body>
  //     </html>
  //   `)
  // }

  const onChangeHtml = (newValue: string): void => {
    setHtmlValue(newValue)
  }
  const onChangeCss = (newValue: string): void => {
    setCssValue(newValue)
  }
  const onChangeJavascript = (newValue: string): void => {
    setJavascriptValue(newValue)
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
                value={htmlValue}
                onChange={onChangeHtml}
                language='html'
                theme='vs-dark'
              />
            </TabsContent>
            <TabsContent value='css' className='h-full'>
              <EditorNormal
                value={cssValue}
                onChange={onChangeCss}
                language='css'
                theme='vs-dark'
              />
            </TabsContent>
            <TabsContent value='javascript' className='h-full'>
              <EditorNormal
                value={javascriptValue}
                onChange={onChangeJavascript}
                language='javascript'
                theme='vs-dark'
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
        <div className='h-1/5 mt-4 bg-gray-800 text-gray-100 p-2 overflow-auto border border-gray-700 rounded'>
          <h3 className='text-sm font-bold text-gray-300'>Console Output:</h3>
          {logs.map((log, index) => (
            <div key={index} className='text-green-400'>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default EditorHtmlCssJS