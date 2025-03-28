"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";

interface PaginationProps {
  page: number;
  totalPages: number;
  handleChangePage: (page: number) => void;
}

const getPaginationArray = (currentPage: number, totalPages: number) => {
  const groupSize = 4;
  let start = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  let end = Math.min(start + groupSize - 1, totalPages);
  
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}

const Pagination = ({ page, totalPages, handleChangePage }: PaginationProps) => {
  const [renderedPages, setRenderedPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    const rendered = getPaginationArray(page, totalPages);
    setRenderedPages(rendered);
    setCurrentPage(page);
    console.log(rendered);
  }, [page]);

  const onChange = (pageSelected: number) => {
    const rendered = getPaginationArray(pageSelected, totalPages);
    setRenderedPages(rendered);
    setCurrentPage(pageSelected);
    handleChangePage(pageSelected);
  }

  return (
    <div className=" flex justify-center items-center space-x-4 text-foreground rounded-b-lg">

      <Button
        size={"sm"}
        variant={"outline"}
        className='px-3'
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GrFormPrevious />
      </Button>
      {totalPages > 5 && (
        renderedPages.map((p) => (
          <Button
            key={p}
            size={"sm"}
            variant={currentPage === p ? "default" : "outline"}
            className='px-3'
            onClick={() => onChange(p)}
            disabled={currentPage === p}
          >
            {p}
          </Button>
        ))
      )}

      <Button
        size={"sm"}
        variant={"outline"}
        className='px-3'
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <GrFormNext />
      </Button>


    </div>
  )
}

export default Pagination