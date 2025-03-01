/* eslint-disable @typescript-eslint/no-explicit-any */
// import { generateDefaultComponent } from '@/app/utils/constant'
import { TYPE_CODE } from '@/app/utils/constant'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  show: boolean
  setShowModal: (value: boolean) => void
  refresh: () => void
  // setFiles: Dispatch<
  //   SetStateAction<{
  //     [key: string]: {
  //       code: string
  //     }
  //   }>
  // >
}

const defaultValueHTML = [
  {
    key: 'html',
    value: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
</body>
</html>`,
  },
  {
    key: 'css',
    value: `h1 {
  color: red;
  }`,
  },
  {
    key: 'js',
    value: `console.log("Hello World")`,
  },
]

const defaultValueReactJS = [
  {
    key: '/App.js',
    value: `import React from 'react';
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
  {
    key: '/styles.css',
    value: `.app {
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
  {
    key: '/button.js',
    value: `import React from 'react'
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
]

export default function ModalAddNewCode({ show, setShowModal, refresh }: Props) {
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(TYPE_CODE.HTML_CSS_JS)
  const handleClickSave = () => {
    if (!value || !description) {
      toast.error('Please enter title and description')
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: value,
        description,
        code: type === TYPE_CODE.HTML_CSS_JS ? defaultValueHTML : defaultValueReactJS,
        type,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast.success('Add new code successfully')
        setValue('')
        setDescription('')
        setShowModal(false)
        refresh()
      })
      .catch(error => console.log(error))
  }
  return (
    <Dialog open={show} onOpenChange={open => setShowModal(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Code</DialogTitle>
        </DialogHeader>
        <div className=''>
          <p className='font-semibold'>
            Title <span className='text-red-500'>*</span>
          </p>
          <Input placeholder='Enter title' value={value} onChange={e => setValue(e.target.value)} />
          <p className='font-semibold'>
            Description <span className='text-red-500'>*</span>
          </p>
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Enter description'
          />
          <div className='mt-2'>
            <p className='font-semibold'>
              Type <span className='text-red-500'>*</span>
            </p>
            <RadioGroup
              value={type}
              className='mt-2'
              onValueChange={(value: any) => setType(value)}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value={TYPE_CODE.HTML_CSS_JS} id={TYPE_CODE.HTML_CSS_JS} />
                <label htmlFor={TYPE_CODE.HTML_CSS_JS}>HTML/CSS/JS</label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value={TYPE_CODE.REACTJS} id={TYPE_CODE.REACTJS} />
                <label htmlFor={TYPE_CODE.REACTJS}>ReactJS</label>
              </div>
            </RadioGroup>
          </div>
          <p className='text-red-500 font-bold'>
            Note: Please go to the post to customize code base
          </p>
        </div>
        <DialogFooter className='mt-4'>
          <Button onClick={handleClickSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
