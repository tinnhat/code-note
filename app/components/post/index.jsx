import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@/components/ui/button'
function Post(props) {
  return (
    <div className='w-[calc(50%-8px)] flex flex-col shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow bg-white'>
      <h1 className='font-semibold'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad, animi temporibus ullam
        atque ratione excepturi accusamus obcaecati ex enim corrupti odio! Dolor harum non
        consectetur. Cupiditate minima error nisi.
      </h1>
      <p className='mt-2 line-clamp-4'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, a inventore modi officiis
        soluta doloribus facere veritatis. Repudiandae sed maxime laudantium, saepe at tempore
        cumque rerum obcaecati, nobis blanditiis impedit. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Saepe, a inventore modi officiis soluta doloribus facere veritatis.
        Repudiandae sed maxime laudantium, saepe at tempore cumque rerum obcaecati, nobis blanditiis
        impedit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, a inventore modi
        officiis soluta doloribus facere veritatis. Repudiandae sed maxime laudantium, saepe at
        tempore cumque rerum obcaecati, nobis blanditiis impedit.
      </p>
      <Button className='w-fit mt-2'>Read more</Button>
    </div>
  )
}

Post.propTypes = {}

export default Post
