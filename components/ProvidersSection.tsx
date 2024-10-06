import React from 'react';
import Image from 'next/image';

interface WatchProviderProps {
  providers: {
    provider_id: number;
    provider_name: string;
    logo_path: string;
    display_priority: number;
  }[];
}

const ProviderSection: React.FC<WatchProviderProps> = ({ providers }) => {
  if (!providers || providers.length === 0) {
    return (
      <div className="p-2 text-gray-100">
        <p>Nessun provider disponibile</p>
      </div>
    );
  }

  return (
    <div className="p-2 text-gray-100 flex flex-col justify-center items-center gap-2">
      <p>Available for streaming at</p>
      <div className='flex gap-5 items-center'>
        {providers.slice(0, 3).filter((p) => (p.display_priority < 20)).map((provider) => (
          <div key={provider.provider_id} className="flex items-center space-x-2 mb-2 rounded-md">
            <Image
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              alt={provider.provider_name}
              width={40}
              height={40}
              className="filter grayscale-[80%] brightness-90 rounded"
            />

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderSection;
