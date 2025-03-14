"use client"
import { FiltersSidebar } from '@/components/content/filters-sidebar'
import Pagination from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { useFilterState } from '@/lib/hooks/use-filter-state'
import React from 'react'

const FiltersSection = ({ children, props }: { children: any, props: any }) => {
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
        <Pagination
          page={filters.page}
          handleChangePage={handlers.handleChangePage}
          totalPages={props.totalPages}
        />
      </div>
    </>
  )
}

export default FiltersSection