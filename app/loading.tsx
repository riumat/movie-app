import { FC } from 'react'
import { BeatLoader } from 'react-spinners'

const Loading: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black z-50 flex items-center justify-center">
      <BeatLoader color="#ffffff" size={10} />
    </div>
  )
}

export default Loading
