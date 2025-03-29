import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { getPageNumbers } from '@/lib/functions'
import React from 'react'

interface PaginationMenuProps {
  currentPage: number
  totalPages: number
  handleChangePage: (page: number) => void
}

const PaginationMenu = ({ currentPage, totalPages, handleChangePage }: PaginationMenuProps) => {
  const pageNumbers = getPageNumbers(totalPages, currentPage)

  return (
    <Pagination>
      <PaginationContent className="gap-1 lg:gap-3 ">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleChangePage(currentPage - 1)
            }}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50 text-xs lg:text-sm" : "text-xs lg:text-sm"}
          />
        </PaginationItem>

        {pageNumbers.map((page, i) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis className='text-xs lg:text-sm' />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                href="#"
                className='text-xs lg:text-sm'
                onClick={(e) => {
                  e.preventDefault()
                  handleChangePage(Number(page))
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleChangePage(currentPage + 1)
            }}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-50 text-xs lg:text-sm" : "text-xs lg:text-sm"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationMenu