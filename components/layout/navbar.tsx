import Searchbar from '@/components/ui/searchbar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const Navbar = () => {
  return (
    <div className='relative bg-transparent top-0 w-full  flex px-5 justify-between mt-3 z-40 items-center'>
      <SidebarTrigger className="z-50" />
      <Searchbar />
    </div>
  )
}

export default Navbar