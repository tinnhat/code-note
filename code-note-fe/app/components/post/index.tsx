import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {
  item: Post
  refresh: () => void
}
function Post({ item, refresh }: Props) {
  const router = useRouter()
  return (
    <div className='w-[calc(50%-8px)] flex flex-col shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow bg-white relative'>
      <Button
        variant='destructive'
        className='absolute top-2 right-2'
        onClick={async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${item._id}`, {
            method: 'DELETE',
          })
          if (response.ok) {
            toast.success('Delete successfully')
            refresh()
          }
        }}
      >
        X
      </Button>
      <h1 className='font-semibold'>{item.title}</h1>
      <p className='mt-2 line-clamp-4'>{item.description}</p>
      <Button onClick={() => router.push(`/${item._id}`)} className='w-fit'>
        Read more
      </Button>
    </div>
  )
}

Post.propTypes = {}

export default Post
