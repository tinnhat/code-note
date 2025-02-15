import { Input } from '@/components/ui/input'
import Post from './components/post'

export default function Home() {
  return (
    <div className='min-h-screen w-full'>
      <div className='w-[80vw] m-auto'>
        <Input placeholder='Nhập từ khoá cần tìm' className='w-full mt-4 outline-none bg-white' />
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
    </div>
  )
}
