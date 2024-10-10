import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth } from '@/utils/constants';
import { ProviderData } from '@/utils/types';

interface WatchProviderProps {
  providers: ProviderData;
}

const ProviderSection: React.FC<WatchProviderProps> = ({ providers }: { providers: ProviderData }) => {
  const flatrate = providers?.flatrate;
  const rent = providers?.rent;
  const buy = providers?.buy;

  if (!flatrate && !rent && !buy) {
    return (
      <div className="flex-1 h-full text-gray-100 flex items-center justify-center mx-16">
        <p className="text-xl">Not available in your region yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full text-gray-100 flex items-center gap-24 mx-16">
      
      {rent && rent.length > 0 && (
        <div className='flex flex-col gap-2 justify-center items-center flex-[33%]'>
          <p className='text-[14px]'>Available for rent at</p>
          <div className='flex gap-5 items-center mt-2'>
            {rent.slice(0, 5).filter((p) => (p.display_priority < 20)).map((provider) => (
              <div key={provider.provider_id} className="flex items-center w-[50px] h-[50px] rounded-md">
                <Image
                  src={`${imageUrl}${imgWidth.logo[92]}${provider.logo_path}`}
                  alt={provider.provider_name}
                  width={92}
                  height={92}
                  className="filter grayscale-[50%] brightness-125 rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {flatrate && flatrate.length > 0 && (
        <div className='flex flex-col gap-2 justify-center items-center flex-[33%]'>
          <p className='mb-3'>Streaming now</p>
          <div className='flex gap-5 items-center'>
            {flatrate.slice(0, 3).filter((p) => (p.display_priority < 20)).map((provider) => (
              <div key={provider.provider_id} className="flex items-center w-[70px] h-[70px] rounded-md">
                <Image
                  src={`${imageUrl}${imgWidth.logo[154]}${provider.logo_path}`}
                  alt={provider.provider_name}
                  width={154}
                  height={154}
                  className="filter grayscale-[50%] brightness-125 rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {buy && buy.length > 0 && (
        <div className='flex flex-col gap-2 justify-center items-center flex-[33%]'>
          <p className='text-[14px] '>Available for purchase at</p>
          <div className='flex gap-5 items-center mt-2' >
            {buy.slice(0, 5).filter((p) => (p.display_priority < 20)).map((provider) => (
              <div key={provider.provider_id} className="flex items-center w-[50px] h-[50px] rounded-md">
                <Image
                  src={`${imageUrl}${imgWidth.logo[92]}${provider.logo_path}`}
                  alt={provider.provider_name}
                  width={92}
                  height={92}
                  className="filter grayscale-[50%] brightness-125 rounded object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderSection;