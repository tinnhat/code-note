'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import ModalAddNewCode from './components/ModalAdd'
import Post from './components/post'

export default function Home() {
  const [listPost, setListPost] = useState([])
  const [showModal, setShowModal] = useState(false)

  const getAllPost = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setListPost(data))
      .catch(error => console.log(error))
  }
  useEffect(() => {
    getAllPost()
  }, [])

  return (
    <div className='min-h-screen w-full'>
      <div className='w-[80vw] m-auto'>
        <div className='flex justify-end mt-2'>
          <Button variant={'secondary'} onClick={() => setShowModal(true)}>
            Add New
          </Button>
        </div>
        <div className='mt-10 flex flex-wrap gap-4'>
          {listPost && listPost.map((item, idx) => (
            <Post item={item} key={idx} refresh={getAllPost} />
          ))}
        </div>
      </div>
      <ModalAddNewCode show={showModal} setShowModal={setShowModal} refresh={getAllPost} />
    </div>
  )
}
