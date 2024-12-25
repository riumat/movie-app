import ContentCard from "@/components/cards/content-card";
import MultiCard from "@/components/cards/multi-card";
import PersonCard from "@/components/cards/person-card";
import SimpleContentCard from "@/components/cards/simple-content-card";
import Link from "next/link";

interface MultiGridProps {
  searchResults: any[];
}

const MultiGrid = ({ searchResults }: MultiGridProps) => {
  if (!searchResults) {
    return;
  }

  return (
    <div className="flex-1 bg-background/95 text-foreground rounded-lg pt-5 px-3 flex flex-col pb-3 ">
      <div className="py-5 px-3 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-x-5 gap-y-10 overflow-x-hidden scrollbar-thin bg-background/95">
        {searchResults.map((item: any, index) => (
          <Link
            key={index}
            href={`/${item.media_type}/${item.id}`}
            className="flex flex-col items-center gap-2"
          >
            {item.media_type !== "person" &&
              (item.user ? (
                <ContentCard
                  key={`${index}-${item.id}-${item.type}`}
                  item={item}
                />
              ) : (
                <SimpleContentCard
                  key={`${index}-${item.id}-${item.type}`}
                  item={item}
                />
              ))}
            {item.media_type === "person" && (
              <PersonCard
                item={item}
              />
            )}

            <p className="font-light px-3 py-1 border border-foreground/30 rounded-xl  text-sm">{item.media_type}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MultiGrid