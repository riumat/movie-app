import PageSelector from "@/components/ui/pagination"
import Searchbar from "@/components/ui/searchbar"

interface MultiWrapperProps {
  handleQuery: (query: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  children: React.ReactNode;
}

const MultiWrapper = ({ handleQuery, currentPage, setCurrentPage, totalPages, children }: MultiWrapperProps) => {
  return (
    <div className="relative h-full z-10 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-8 h-10 text-sm">
        <Searchbar onSearch={handleQuery} />
      </div>
      <div className="mt-8 w-[90%] max-h-[80vh] bg-background/95 text-foreground rounded-lg pt-5 flex flex-col">
        <div className="px-2 grid grid-cols-2 lg:grid-cols-5 gap-5 justify-items-center overflow-y-auto overflow-x-hidden w-full flex-1 scrollbar-thin">
          {children}
        </div>
        <PageSelector
          page={currentPage}
          setPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default MultiWrapper