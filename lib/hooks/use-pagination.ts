// hooks/usePagination.ts
import { useState } from 'react';

interface UsePagination {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const usePagination = (): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return { currentPage, setCurrentPage };
};

export default usePagination;
