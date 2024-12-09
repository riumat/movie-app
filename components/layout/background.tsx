import React from 'react'

const Background = () => {
  return (
    <div className={`absolute top-0 left-0  h-full w-full -z-20`}>
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-border via-background via-[50%] to-background -z-10" />
    </div>
  );
};

export default Background


