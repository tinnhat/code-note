/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { TYPE_CODE } from '../utils/constant'
import DeletePost from './components/Delete'
import EditorHtmlCssJS from './components/htmlCssJs'
import EditorReact from './components/reactjs'

export default function DetailPage() {
  const [edit, setEdit] = useState(false)
  const [defaultPost, setDefaultPost] = useState<Post | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const params = useParams() // Lấy params từ URL
  const { slug } = params // slug là id của post

  async function fetchPost(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
      cache: 'no-store', // Tắt cache để lấy dữ liệu mới nhất
    })
    if (!res.ok) throw new Error('Post not found')
    return res.json()
  }

  useEffect(() => {
    if (typeof slug === 'string') {
      fetchPost(slug)
        .then(data => {
          setPost(data)
          setDefaultPost(data)
        })
        .catch(error => {
          console.error('Error fetching post:', error)
        })
    }
  }, [slug])

  if (!post) {
    return <div>Post not found</div>
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    key: string
  ) => {
    setPost({
      ...post,
      [key]: e.target.value,
    })
  }

  const handleRevert = () => {
    setPost(defaultPost)
    setEdit(false)
  }

  const handleSave = (post: Post) => {
    const dataSubmit = {
      title: post.title,
      description: post.description,
      code: post.code,
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSubmit),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast.success('Update successfully')
        setEdit(false)
      })
      .catch(error => console.log(error))
  }

  const handleCodeChange = (newCode: CodeItem[]) => {
    const clonePost = { ...post }
    clonePost.code = newCode
    setPost(clonePost)
  }

  return (
    <div className='w-[90vw] m-auto'>
      <div className='flex flex-col p-4 bg-gray-900 text-gray-100 h-full mt-5 rounded-lg'>
        <div className='flex justify-between w-full'>
          {!edit ? (
            <h1 className='text-2xl font-bold w-4/5'>{post.title}</h1>
          ) : (
            <Input
              className='w-4/5 mr-6 p-1'
              value={post.title}
              onChange={e => handleChange(e, 'title')}
            />
          )}

          <div className='w-1/5 flex items-center gap-4 justify-end'>
            <Button onClick={() => handleSave(post)}>Save</Button>
            {!edit ? (
              <Button variant={'secondary'} onClick={() => setEdit(true)}>
                Edit
              </Button>
            ) : (
              <Button variant={'secondary'} onClick={handleRevert}>
                Cancel
              </Button>
            )}

            <DeletePost _id={post._id} />
          </div>
        </div>
        {!edit ? (
          <p className='text-left'>{post.description}</p>
        ) : (
          <Textarea
            className='p-1 mt-2'
            value={post.description}
            onChange={e => handleChange(e, 'description')}
          />
        )}

        {post.type === TYPE_CODE.HTML_CSS_JS && (
          <EditorHtmlCssJS code={post.code} edit={edit} onCodeChange={handleCodeChange} />
        )}
        {post.type === TYPE_CODE.REACTJS && (
          <EditorReact code={post.code} edit={edit} setPost={setPost} />
        )}
      </div>
    </div>
  )
}

DetailPage.propTypes = {}
