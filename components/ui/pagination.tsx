"use client"
import React from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";

interface HeroProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<HeroProps> = ({ page, setPage, totalPages }) => {
  return (
    <div className="my-5 flex justify-center items-center space-x-4 bg-background text-foreground rounded-b-lg">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gradient-to-l from-background to-border rounded disabled:opacity-50 active:scale-90 duration-150"
      >
        <MdFirstPage />
      </button>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gradient-to-l from-background to-border rounded disabled:opacity-50 active:scale-90 duration-150"
      >
        <GrFormPrevious />
      </button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gradient-to-r from-background to-border rounded disabled:opacity-50 active:scale-90 duration-150"
      >
        <GrFormNext />
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gradient-to-r from-background to-border rounded disabled:opacity-50 active:scale-90 duration-150"
      >
        <MdLastPage />
      </button>

    </div>
  )
}

export default Pagination