import Image from 'next/image';

const Loading = () => {
  return (
    <div className={`absolute top-0 left-0  h-full w-full -z-20 flex justify-center items-center`}>
      <div className="absolute w-full h-full top-0 left-0 bg-background -z-10" />
      <Image src='/logo-no-text.png' alt='logo' className='animate-pulse' width={300} height={300} />
    </div>
  )
}

export default Loading
