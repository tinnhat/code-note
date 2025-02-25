import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type Props = {
  item: Post
}
function Post({ item }: Props) {
  const router = useRouter()
  return (
    <div className='w-[calc(50%-8px)] flex flex-col shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow bg-white'>
      <h1 className='font-semibold'>{item.title}</h1>
      <p className='mt-2 line-clamp-4'>{item.description}</p>
      <Button onClick={() => router.push(`/${item._id}`)} className='w-fit'>Read more</Button>
    </div>
  )
}

Post.propTypes = {}

export default Post
