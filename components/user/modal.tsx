"use client"
import ContentUserCard from "@/components/cards/content-user-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Pagination from "@/components/ui/pagination";
import { formatDate, movieCount, tvCount } from "@/lib/functions";
import { ProfileData } from "@/lib/types/user";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BeatLoader } from "react-spinners";


const modalType = (modal: string) => {
  switch (modal) {
    case "movie":
      return "/api/user/movie"
    case "tv":
      return "/api/user/tv"
    case "review":
      return "/api/user/review"
    case "rated":
      return "/api/user/rating"
    default:
      return "/api/user/movie"
  }
}

const TriggerType = (modal: string, userData: ProfileData) => {
  switch (modal) {
    case "movie":
      return (
        <Button className="flex flex-col gap-1 items-center relative  h-full px-7 py-3" variant={"outline"} >
          <p className="font-light text-xl">Movies</p>
          <p className="font-bold text-5xl">{movieCount(userData.watched)}</p>
        </Button >
      )
    case "tv":
      return (
        <Button className="flex flex-col gap-1 items-center relative h-full px-7 py-3" variant={"outline"}>
          <p className="font-light text-xl">Tv Shows</p>
          <p className="font-bold text-5xl">{tvCount(userData.watched)}</p>
        </Button>
      )
    case "review":
      return (
        <Button className="flex flex-col gap-1 items-center relative h-full px-7 py-3" variant={"outline"}>
          <p className="font-light text-xl">Reviewed</p>
          <p className="font-bold text-5xl">{userData.reviewed}</p>
        </Button>
      )
    case "rated":
      return (
        <Button className="flex flex-col gap-1 items-center relative h-full px-7 py-3" variant={"outline"}>
          <p className="font-light text-xl">Rated</p>
          <p className="font-bold text-5xl">{userData.rated}</p>
        </Button>
      )
    default:
      return (
        <Button className="flex flex-col gap-1 items-center relative h-full px-7 py-3" variant={"outline"}>
          <p className="font-light text-xl">Movies</p>
          <p className="font-bold text-5xl">{movieCount(userData.watched)}</p>
        </Button>
      )
  }
}

const titleModal = (modal: string) => {
  switch (modal) {
    case "movie":
      return "Watched Movies"
    case "tv":
      return "Watched Tv Shows"
  }
}



const Modal = ({ userData, modal }: { userData: ProfileData, modal: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleList = async (page: number) => {
    setIsLoading(true);
    await axios.get(`${modalType(modal)}?page=${page}`)
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
        {TriggerType(modal, userData)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] h-[82vh] overflow-hidden flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">{titleModal(modal)}</DialogTitle>
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
                  list.map((item) => (
                    <Link key={item.id} href={`/${item.type}/${item.id}`} className="py-3 rounded-lg hover:bg-secondary ">
                      <ContentUserCard item={item} />
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

export default Modal
