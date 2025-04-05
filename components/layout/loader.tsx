"use client"
import { useTheme } from 'next-themes';
import React from 'react'
import { RotateLoader } from 'react-spinners'

const Loader = () => {
  const { theme } = useTheme();
  const color = theme === "light" ? "#000000" : "#ffffff"
  return (
    <div className='w-full h-full flex items-center justify-center'>
    <RotateLoader color={color} size={9} />
    </div>
  )
}

export default Loader