import React from 'react'

const Background = () => {
  return (
    <div className={`absolute top-0 left-0  h-full w-full -z-20`}>
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b to-sky-800/60 via-sky-950/20 via-[60%] from-sky-950/15 -z-10" />
    </div>
  );
};

export default Background


