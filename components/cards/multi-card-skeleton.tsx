const MultiCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full max-w-[170px] mx-auto">
      <div className="relative w-full max-h-64 pb-[150%] rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-border animate-pulse" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="h-4 bg-border rounded-full animate-pulse" />
        <div className="flex gap-2 justify-center">
          <div className="h-4 bg-border rounded-full animate-pulse w-2/3" />
          <div className="h-4 bg-border rounded-full animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default MultiCardSkeleton
