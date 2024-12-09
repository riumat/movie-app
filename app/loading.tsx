"use client"
import { useTheme } from 'next-themes'
import { BeatLoader, RotateLoader } from 'react-spinners'

const Loading = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#ffffff" : "#000000"
  return (
    <div className="relative top-0 left-0 w-full h-screen bg-background z-50 flex items-center justify-center">
      <RotateLoader color={color} size={10} />
    </div>
  )
}

export default Loading
