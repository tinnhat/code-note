'use client'
import { Input } from '@/components/ui/input'
import Post from './components/post'
import { Button } from '@/components/ui/button'
import ModalAddNewCode from './components/ModalAdd'
import { useState } from 'react'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='min-h-screen w-full'>
      <div className='w-[80vw] m-auto'>
        <Input placeholder='Nhập từ khoá cần tìm' className='w-full mt-4 outline-none bg-white' />
        <div className='flex justify-end mt-2'>
          <Button variant={"secondary"} onClick={() => setShowModal(true)}>Add New</Button>
        </div>
        <div className='mt-10 flex flex-wrap gap-4'>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <ModalAddNewCode show={showModal} setShowModal={setShowModal} />
    </div>
  )
}
