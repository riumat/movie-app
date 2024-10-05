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

const PageSelector: React.FC<HeroProps> = ({ page, setPage, totalPages }) => {
  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        <MdFirstPage />
      </button>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        <GrFormPrevious />
      </button>
      <span className="text-white">Page {page} of {totalPages}</span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        <GrFormNext />
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        <MdLastPage />
      </button>

    </div>
  )
}

export default PageSelector