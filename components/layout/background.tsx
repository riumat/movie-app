import React from 'react'

//https://www.toptal.com/designers/subtlepatterns/uploads/blackorchid.png
//bg-[url('https://img.freepik.com/free-vector/gradient-black-backgrounds-with-golden-frames_23-2149150610.jpg?t=st=1735122179~exp=1735125779~hmac=e0904bf964766ba2b0911bcf9232d06f472c6256629483c9bb06988020d11c75&w=1060')]

const Background = () => {
  return (
    <div className={`absolute top-0 left-0  h-full w-full -z-20`}>
      <div className="absolute w-full h-full top-0 left-0 bg-background /*gradient-to-b to-amber-400/40 via-amber-400/35 via-[60%] from-amber-400/25 */ -z-10" />
     {/*  <div className={`h-[100vh] content-[''] absolute inset-0  bg-repeat opacity-70 -z-10 `} /> */}
    </div>
  );
};

export default Background


