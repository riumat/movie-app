"use client"
import ContentUserCard from "@/components/cards/content-user-card";
import Loader from "@/components/layout/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Pagination from "@/components/ui/pagination";
import { movieCount, tvCount } from "@/lib/functions";
import { ProfileData } from "@/lib/types/user";
import { StopIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { StopCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CgDanger } from "react-icons/cg";



const modalType = (modal: string) => {
  switch (modal) {
    case "movie":
      return "/api/user/movie"
    case "tv":
      return "/api/user/tv"
  }
}

const TriggerType = (modal: string, userData: ProfileData) => {
  switch (modal) {
    case "movie":
      return (
        <Button className="flex flex-col gap-1 items-center relative px-7 py-3 h-full border-b border-t-0 border-x-0 w-36" variant={"outline"} >
          <p className="font-light text-lg">Movies</p>
          <p className="font-bold text-5xl">{movieCount(userData.watched)}</p>
        </Button >
      )
    case "tv":
      return (
        <Button className="flex flex-col gap-1 items-center relative px-7 py-3 h-full border-b border-t-0 border-x-0 w-36" variant={"outline"}>
          <p className="font-light text-lg">Tv Shows</p>
          <p className="font-bold text-5xl">{tvCount(userData.watched)}</p>
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



const Modal = ({ id, userData, modal }: { id: string, userData: ProfileData, modal: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setIsError] = useState(false);

  const handleList = async (page: number) => {
    setIsLoading(true);
    await axios.get(`${modalType(modal)}?page=${page}&id=${id}`)
      .then((res) => {
        setList(res.data.list)
        setTotalPages(res.data.totalPages)
      })
      .finally(() => setIsLoading(false))
      .catch(err => {
        if (err.response.status === 403) {
          setIsError(true)
        } else {
          console.error(err);
        }
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
          {isError ? (
            <div className="flex flex-col items-center justify-center gap-5 h-full">
              <CgDanger size={35} />
              <p className="text-xl">You need to be friends with this user to view their informations!</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-2">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader />
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
            </>
          )}


        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
