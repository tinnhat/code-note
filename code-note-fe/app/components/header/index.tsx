import Link from 'next/link'
import React from 'react'
function HeaderCus() {
  return (
    <div className='w-full h-12 flex items-center justify-center text-white bg-black uppercase'>
      <Link href={'/'}>Code Note</Link>
    </div>
  )
}

HeaderCus.propTypes = {}

export default HeaderCus
