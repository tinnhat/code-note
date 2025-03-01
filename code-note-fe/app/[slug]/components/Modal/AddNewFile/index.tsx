import { generateDefaultComponent } from '@/app/utils/constant'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  show: boolean
  setShowModal: (value: boolean) => void
  setFiles: Dispatch<
    SetStateAction<{
      [key: string]: {
        code: string
      }
    }>
  >
}
export default function ModalAddNewFile({ show, setShowModal, setFiles }: Props) {
  const [value, setValue] = useState('')

  const handleClickSave = () => {
    // Validate for React component naming convention:
    // Must start with uppercase letter and only contain letters, numbers
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
      toast.error('Invalid file name')
      return
    }
    const convertValue = `/${value}.js`
    setFiles((prev: object) => ({
      ...prev,
      [convertValue]: { code: generateDefaultComponent(value) },
    }))
    setValue('')
    setShowModal(false)
  }
  return (
    <Dialog open={show} onOpenChange={open => setShowModal(open)}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New File</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col'>
          <p>
            Name of file <span className='text-red-500'>*</span>
          </p>
          <Input onChange={e => setValue(e.target.value)} value={value} />
          <p className='text-gray-500'>Example: Button, Navbar, Header, ...</p>
          <p className='text-xs text-red-400'>
            Note: You don&apos;t need to set name of file like: .jsx or .js
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleClickSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
