"use client"

import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image'
import React, { useState } from 'react'

const ImageWithLoader = ({ src, className,ratio }: { src: string, className?: string,ratio:number }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
      {!isImageLoaded && (
        <div className={`absolute inset-0 flex items-center justify-center rounded-sm ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse rounded-sm" />
        </div>
      )}
      <AspectRatio ratio={ratio} >
        <Image
          src={src}
          alt={"alt item"}
          fill
          className={`rounded-sm z-30 object-cover ${className}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='lazy'
        />
      </AspectRatio>
    </>
  )
}

export default ImageWithLoader