"use client"
import PaginationMenu from "@/components/ui/pagination-menu";
import { useRouter } from "next/navigation";

const PaginationWrapper = ({ totalPages, query, currentPage }: { totalPages: number, query: string, currentPage: number }) => {
  const router = useRouter();

  const handleChangePage = (page: number) => {
    router.push(`/search?query=${query}&page=${page}`);
  }

  return (
    <PaginationMenu
      currentPage={currentPage}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
    />
  )
}

export default PaginationWrapper