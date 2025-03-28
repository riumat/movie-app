"use client"
import { FiltersSidebar } from '@/components/content/filters-sidebar'
import PaginationMenu from '@/components/ui/pagination-menu'
import { useFilterState } from '@/lib/hooks/use-filter-state'
import React, { ReactNode } from 'react'

const FiltersSection = ({ children, props }: { children: ReactNode, props: any }) => {
  const { filters, handlers } = useFilterState();
  return (
    <>
      <div className='flex flex-grow overflow-hidden w-full gap-10  '>
        {children}
        <FiltersSidebar
          genres={props.genres}
          providers={props.providers}
          media={props.media}
          handlers={handlers}
          filters={filters}
        />
      </div>
      <div className='rounded-lg bg-background/95 py-3 w-full flex justify-center'>
        <PaginationMenu
          currentPage={filters.page}
          totalPages={props.totalPages}
          handleChangePage={handlers.handleChangePage}
        />
      </div>
    </>
  )
}

export default FiltersSection