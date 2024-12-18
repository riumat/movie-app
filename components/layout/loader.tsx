"use client"
import { useTheme } from 'next-themes';
import React from 'react'
import { RotateLoader } from 'react-spinners'

const Loader = () => {
  const { theme } = useTheme();
  const color = theme === "light" ? "#000000" : "#ffffff"
  return (
    <RotateLoader color={color} size={15} />
  )
}

export default Loader