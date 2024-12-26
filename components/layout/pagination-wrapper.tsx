"use client"
import Pagination from "@/components/ui/pagination"
import { useRouter } from "next/navigation";

const PaginationWrapper = ({ totalPages, query, page }: { totalPages: number, query: string, page: number }) => {
  const router = useRouter();

  const handleChangePage = (page: number) => {
    router.push(`/search?query=${query}&page=${page}`);
  }
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
    />
  )
}

export default PaginationWrapper