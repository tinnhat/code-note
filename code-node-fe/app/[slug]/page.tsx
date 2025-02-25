'use client'
import { Button } from '@/components/ui/button'
// import EditorHtmlCssJS from './components/htmlCssJs'
import EditorReact from './components/reactjs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function DetailPage() {
  return (
    <div className='w-[90vw] m-auto'>
      <div className='flex flex-col items-center p-4 bg-gray-900 text-gray-100 h-full mt-5 rounded-lg'>
        <div>
          <div className='flex'>
            <h1 className='text-2xl font-bold w-4/5'>
              Css scroll snap - Responsive scroll ngang tren mobile
            </h1>
            {/* <Input/> */}
            <div className='w-1/5 flex items-center gap-4 justify-end'>
              <Button>Save</Button>
              <Button variant={'secondary'}>Edit</Button>
              <Button variant={'destructive'}>Delete</Button>
            </div>
          </div>
         
          {/* <Textarea/> */}
          <p className='text-xs mb-4'>13:00:00 - 22/12/2025</p>
          <p className='text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus deleniti, nisi nemo vero
            neque libero dolor magni recusandae illum iusto, porro exercitationem ex vel. Vitae vel
            delectus ipsam id adipisci! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eius qui eum laudantium repellat similique explicabo soluta amet sequi nam! Asperiores
            quia animi nam quae aperiam perferendis alias et ea quibusdam. Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Debitis repellat vero, nesciunt, sint nemo ea
            mollitia facere tempore voluptates harum minus numquam vitae commodi ratione, explicabo
            iste perferendis non. Illum?
          </p>
        </div>
        {/* <EditorHtmlCssJS /> */}
        <EditorReact/>

      </div>
    </div>
  )
}

DetailPage.propTypes = {}

export default DetailPage
