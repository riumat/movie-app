"use client"
import RatingCard from "@/components/cards/rating-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Pagination from "@/components/ui/pagination";
import { ProfileData } from "@/lib/types/user";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BeatLoader } from "react-spinners";


const RatingModal = ({ userData }: { userData: ProfileData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleList = async (page: number) => {
    setIsLoading(true);
    await axios.get(`/api/user/rating?page=${page}`)
      .then((res) => {
        console.log(res.data)
        setList(res.data.list)
        setTotalPages(res.data.totalPages)
      })
      .finally(() => setIsLoading(false))
      .catch(err => {
        console.error(err);
      });

  }

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    handleList(newPage);
  }
  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => handleList(page)} >
        <Button className="flex flex-col gap-1 items-center relative h-full px-7 py-3" variant={"outline"}>
          <p className="font-light text-xl">Rated</p>
          <p className="font-bold text-5xl">{userData.rated}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] h-[82vh] overflow-hidden flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Ratings</DialogTitle>
        </DialogHeader>
        <div className="h-full flex flex-col gap-5  overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <BeatLoader color='#ffffff' size={10} />
              </div>
            ) : (
              <>
                {list.length > 0 && (
                  list.sort((a, b) => b.rating - a.rating).map((item) => (
                    <Link key={item.id} href={`/${item.type}/${item.id}`} className="py-3 rounded-lg hover:bg-secondary ">
                      <RatingCard item={item} />
                    </Link>
                  ))
                )}
              </>
            )}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RatingModal
