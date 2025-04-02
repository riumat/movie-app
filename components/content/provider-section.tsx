import React from 'react';
import Image from 'next/image';
import { imageUrl, imgWidth } from '@/lib/constants';
import { ProviderItem } from '@/lib/types/provider.types';

interface WatchProviderProps {
  providers: ProviderItem[];
}

const ProviderSection: React.FC<WatchProviderProps> = ({ providers }) => {

  return (
    <div className=" text-gray-100 flex justify-center items-start">

      {providers.length > 0 ? (
        <div className='grid grid-cols-5 gap-3 justify-items-center '>
          {providers.map((provider) => (
            <div key={provider.provider_id} className='flex flex-col items-center gap-2'>
              <div className="flex items-center w-[100px] h-[100px] rounded-md">
                <Image
                  src={`${imageUrl}${imgWidth.logo[154]}${provider.logo_path}`}
                  alt={provider.provider_name}
                  width={154}
                  height={154}
                  className="filter grayscale-[50%] brightness-125 rounded object-cover"
                />
              </div>
              <p className='text-sm text-center '>{provider.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 h-full text-gray-100 flex items-center justify-center mx-16">
          <p className="text-xl">Not available in your region yet</p>
        </div>
      )}

    </div>
  );
};

export default ProviderSection;
