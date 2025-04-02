import { backdropRatio, imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import ImageWithLoader from '@/components/layout/image-with-loader';


const OrizontalCard = ({ item }: { item: MovieData | TvData }) => {
  const imgSrc = item.backdrop_path ? `${imageUrl}${imgWidth.backdrop[780]}${item.backdrop_path}` : placeholders.multi;

  return (
    <div className={`relative max-w-[300px]`}>
      <div className='flex flex-col gap-3 rounded-sm bg-gradient-to-t from-muted/30 to-muted/60 '>
        <ImageWithLoader src={imgSrc} ratio={backdropRatio} className='' />
      </div>
    </div>
  );
};

export default OrizontalCard;
