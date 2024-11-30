import React from 'react';
import Link from 'next/link';
import WorkingPersonCard from '@/components/cards/working-person-card';
import { CastItem } from '@/lib/types/cast';
import { CrewItem } from '@/lib/types/crew';

type PersonListProps = {
  personList: (CastItem | CrewItem)[];
}

const CreditsList: React.FC<PersonListProps> = ({ personList }) => {
  const getDescription = (person: CastItem | CrewItem): string => {
    if ('character' in person) {
      return person.character;
    }
    if ('job' in person) {
      return person.job;
    }
    return 'Creator';
  };

  return (
    <div className="h-full">
      {personList.length > 0 && (
        <div className='flex flex-col gap-4 items-center justify-items-center h-full overflow-y-auto scrollbar-thin flex-1'>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-10">
            {personList.slice(0, 50).map(person => (
              <Link
                key={person.id}
                href={`/person/${person.id}`}
              >
                <WorkingPersonCard
                  name={person.name}
                  imagePath={person.profile_path}
                  desc={getDescription(person)}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsList;