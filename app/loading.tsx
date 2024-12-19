"use client"
import { useTheme } from 'next-themes'
import { BeatLoader, RotateLoader } from 'react-spinners'

const Loading = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#ffffff" : "#000000"
  return (
    <div className={`absolute top-0 left-0  h-full w-full -z-20 flex justify-center items-center`}>
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b to-sky-800/60 via-sky-900/35 via-[60%] from-sky-900/25 -z-10" />
      <div className={`h-[100vh] content-[''] absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/blackorchid.png')] bg-repeat opacity-70 -z-10 `} />
      <RotateLoader color={color} size={10} className='z-10' />
    </div>
  )
}

export default Loading
