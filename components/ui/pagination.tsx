"use client"
import React from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";

interface PaginationProps {
  page: number;
  totalPages: number;
  handleChangePage: (page: number) => void;
}

const Pagination = ({ page, totalPages, handleChangePage }: PaginationProps) => {
  return (
    <div className="my-5 flex justify-center items-center space-x-4 bg-background text-foreground rounded-b-lg">
      <button
        onClick={() => handleChangePage(1)}
        disabled={page === 1}
        className="px-4 py-1 bg-gradient-to-l from-background to-border rounded disabled:opacity-50 active:scale-95 duration-100 flex items-center gap-1"
      >
        <MdFirstPage size={20}/>
        <p className='text-sm'>First</p>
      </button>
      <button
        onClick={() => handleChangePage(page - 1)}
        disabled={page === 1}
        className="px-4 py-1 bg-gradient-to-l from-background to-border rounded disabled:opacity-50 active:scale-95 duration-100 flex items-center gap-1"
      >
        <GrFormPrevious  size={20}/>
        <p className='text-sm'>Previous</p>
      </button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <button
        onClick={() => handleChangePage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-1 bg-gradient-to-r from-background to-border rounded disabled:opacity-50 active:scale-95 duration-100 flex items-center gap-1"
      >
        <p className='text-sm'>Next</p>
        <GrFormNext size={20} />
      </button>
      <button
        onClick={() => handleChangePage(totalPages)}
        disabled={page === totalPages}
        className="px-4 py-1 bg-gradient-to-r from-background to-border rounded disabled:opacity-50 active:scale-95 duration-100 flex items-center gap-1"
      >
        <p className='text-sm'>Last</p>
        <MdLastPage size={20} />
      </button>

    </div>
  )
}

export default Pagination