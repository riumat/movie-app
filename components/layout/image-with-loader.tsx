"use client"

import Image from 'next/image'
import React, { useState } from 'react'

const ImageWithLoader = ({ src }: { src: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse" />
        </div>
      )}
      <Image
        src={src}
        alt={"alt item"}
        fill
        className='rounded-lg z-30 object-cover'
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(false)}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        loading='lazy'
      />
    </>
  )
}

export default ImageWithLoader