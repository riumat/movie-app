import { imageUrl, imgWidth, placeholders } from '@/lib/constants';
import { PeopleFollowed } from '@/lib/types/person.types';
import ImageWithLoader from '@/components/layout/image-with-loader';

const PeopleCard = ({ item }: { item: PeopleFollowed }) => {
  const imageSrc = item.profile_path ? `${imageUrl}${imgWidth.backdrop[300]}${item.profile_path}` : placeholders.profile;

  return (
    <div className=" flex items-center gap-3  relative justify-start ">
      <div className="flex justify-start relative w-40 h-40">
        <ImageWithLoader src={imageSrc} />
      </div>
      <div className=" flex flex-col items-center text-sm">
        <div className="font-semibold text-center mb-2 text-lg">{item.name}</div>

      </div>
    </div>
  );
};

export default PeopleCard;