import { fetcher } from "@/lib/utils"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr"

export const useFeatured = (session: any) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("movie");
  const router = useRouter()

  const { data, error, isLoading } = useSWR(`/api/user/${selectedTab}?page=${page}&query=${query}&id=${session.user.id}`, fetcher)


  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  }

  const handleTab = (tab: string, page: number) => {
    setSelectedTab(tab);
    setPage(page);
  }

  const handleSetFeatured = (e: React.MouseEvent<HTMLButtonElement>, id: number, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    axios.post("/api/user/featured", { content_id: id, content_type: type })
      .then((res) => {
        router.refresh();
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {console.log(data)}, [data])

  return {
    list: data?.list,
    totalPages: data?.totalPages,
    page: data?.currentPage,
    error,
    isLoading,
    handleChangePage,
    handleTab,
    handleSetFeatured
  }

}