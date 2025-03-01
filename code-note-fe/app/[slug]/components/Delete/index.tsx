'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  _id: string
}

export default function DeletePost({ _id }: Props) {
  const router = useRouter()

  const handleDelete = async (_id: string) => {
    fetch(`http://localhost:4000/post/${_id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast.success('Delete successfully')
        router.push('/')
      })
      .catch(error => console.log(error))
  }
  return (
    <Button variant={'destructive'} onClick={() => handleDelete(_id)}>
      Delete
    </Button>
  )
}
