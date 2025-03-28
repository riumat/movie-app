import { imageUrl, imgWidth, placeholders, posterRatio } from '@/lib/constants';
import { MovieData } from '@/lib/types/movie.types';
import { TvData } from '@/lib/types/tv.types';
import ImageWithLoader from '@/components/layout/image-with-loader';
import { PersonResult } from '@/lib/types/person.types';


const VerticalCard = ({ item }: { item: MovieData | TvData | PersonResult }) => {
  const path = item.media_type === "person" ? item.profile_path : item.poster_path
  const imgSrc = path ? `${imageUrl}${imgWidth.poster[780]}${path}` : placeholders.multi;

  return (
    <div className={`relative max-w-[300px]`}>
      <div className='flex flex-col gap-3 rounded-sm bg-gradient-to-t from-muted/30 to-muted/60 '>
        <ImageWithLoader src={imgSrc} ratio={posterRatio} className='' />
      </div>
    </div>
  );
};

export default VerticalCard;
