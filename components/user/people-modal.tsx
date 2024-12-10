"use client"
import PeopleCard from "@/components/cards/people-card";
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
import { PeopleFollowed } from "@/lib/types/people";
import { ProfileData } from "@/lib/types/user";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { CgDanger } from "react-icons/cg";


const PeopleModal = ({ id, userData }: { id: string, userData: ProfileData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<PeopleFollowed[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setIsError] = useState(false);

  const handleList = async (page: number) => {
    setIsLoading(true);
    await axios.get(`/api/user/people?page=${page}&id=${id}`)
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
        <Button className="flex flex-col gap-1 items-center relative px-7 py-3 h-full border-b border-t-0 border-x-0 w-36" variant={"outline"}>
          <p className="font-light text-lg">Following</p>
          <p className="font-bold text-5xl">{userData.following.length}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] h-[82vh] overflow-hidden flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">People You Follow</DialogTitle>
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
                          <PeopleCard item={item} />
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

export default PeopleModal
