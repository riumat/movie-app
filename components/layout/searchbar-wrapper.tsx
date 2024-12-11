import Searchbar from '@/components/ui/searchbar'
import React from 'react'

const SearchbarWrapper = () => {
  return (
    <div className='absolute top-0 w-screen flex justify-center  mt-2 z-40'>
      <Searchbar />
    </div>
  )
}

export default SearchbarWrapper