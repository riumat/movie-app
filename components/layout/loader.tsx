"use client"
import { useTheme } from 'next-themes';
import React from 'react'
import { BeatLoader, HashLoader, RotateLoader } from 'react-spinners'

const Loader = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#ffffff" : "#000000"
  return (
    <RotateLoader color={color} size={15} />
  )
}

export default Loader