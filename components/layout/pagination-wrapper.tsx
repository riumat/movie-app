"use client"
import Pagination from "@/components/ui/pagination"
import { useFilterState } from "@/lib/hooks/use-filter-state"

const PaginationWrapper = ({ totalPages }: { totalPages: number }) => {
  const { filters, handlers } = useFilterState();
  return (
    <Pagination
      page={filters.page}
      totalPages={totalPages}
      handleChangePage={handlers.handleChangePage}
    />
  )
}

export default PaginationWrapper