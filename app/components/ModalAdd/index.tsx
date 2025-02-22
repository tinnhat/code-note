// import { generateDefaultComponent } from '@/app/utils/constant'
import EditorHtmlCssJS from '@/app/[slug]/components/htmlCssJs'
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
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  show: boolean
  setShowModal: (value: boolean) => void
  // setFiles: Dispatch<
  //   SetStateAction<{
  //     [key: string]: {
  //       code: string
  //     }
  //   }>
  // >
}
export default function ModalAddNewCode({ show, setShowModal }: Props) {
  const [value, setValue] = useState('')

  const handleClickSave = () => {
    // Validate for React component naming convention:
    // Must start with uppercase letter and only contain letters, numbers
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
      return
    }
    // setFiles((prev: object) => ({
    //   ...prev,
    //   [value]: { code: generateDefaultComponent(value) },
    // }))
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
          <Textarea placeholder='Enter description' />
          <div className='mt-2'>
            <p className='font-semibold'>
              Type <span className='text-red-500'>*</span>
            </p>
            <RadioGroup defaultValue='html-css-js' className='mt-2'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='html-css-js' id='html-css-js' />
                <label htmlFor='html-css-js'>HTML/CSS/JS</label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='reactjs' id='reactjs' />
                <label htmlFor='reactjs'>ReactJS</label>
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
