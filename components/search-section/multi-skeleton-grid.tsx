import MultiCardSkeleton from "@/components/cards/multi-card-skeleton"

const MultiSkeletonGrid = () => {
  return (
    <div className="mt-8 w-[90%] max-h-[85vh] bg-background/95 text-foreground rounded-lg pt-5 flex flex-col">
      <div className="px-2 grid grid-cols-2 lg:grid-cols-5 gap-5 justify-items-center overflow-y-auto overflow-x-hidden w-full flex-1 scrollbar-thin">
        {Array.from({ length: 20 }).map((_, index) => (
          <MultiCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export default MultiSkeletonGrid