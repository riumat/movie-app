"use client"
import ContentUserCard from "@/components/cards/content-user-card";
import Loader from "@/components/layout/loader";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Plus, PlusSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSadOutline } from "react-icons/io5";


const FeaturedTabs = ({ session }: { session: any }) => {
  const [selectedTab, setSelectedTab] = useState("movie");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const handleTab = (tab: string, page: number) => {
    setIsLoading(true);
    setSelectedTab(tab);
    axios.get(`/api/user/${tab}?page=${page}&id=${session.user.id}`)
      .then((res) => {
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
    handleTab(selectedTab, newPage);
  }

  const handleSetFeatured = (e: React.MouseEvent<HTMLButtonElement>, id: number, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    axios.post("/api/user/featured", { content_id: id, content_type: type })
      .then((res) => {
        console.log(res.data)
        router.refresh()
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    handleTab("movie", page)
  }, [])

  return (
    <Tabs defaultValue="movie" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger onClick={() => handleTab("movie", page)} value="movie">Movies</TabsTrigger>
        <TabsTrigger onClick={() => handleTab("tv", page)} value="tv">Tv Shows</TabsTrigger>
      </TabsList>
      <TabsContent value="movie" className="h-[90%] overflow-hidden" >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <>
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-5 h-full">
                <IoSadOutline size={50} />
                <p className="text-xl">Empty! <Link href={"/movie"} className="hover:underline">Start browsing now!</Link></p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 h-full">
                <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-2">
                  <>
                    {list.length > 0 && (
                      list.map((item) => (
                        <Link
                          key={`movie-${item.id}`}
                          href={`/${item.type}/${item.id}`}
                          className="py-3 rounded-lg hover:bg-secondary flex justify-between items-center"
                        >
                          <ContentUserCard item={item} />
                          <Button
                            className="px-4 mr-10"
                            onClick={(e) => handleSetFeatured(e, item.id, item.type)}
                          >
                            <Plus size={20} />
                          </Button>
                        </Link>
                      ))
                    )}
                  </>
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  handleChangePage={handleChangePage}
                />
              </div>
            )}

          </>
        )}
      </TabsContent>
      <TabsContent value="tv" className="h-[90%] overflow-hidden" >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <>
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-5 h-full">
                <IoSadOutline size={50} />
                <p className="text-xl">Empty! <Link href={"/movie"} className="hover:underline">Start browsing now!</Link></p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 h-full">
                <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-2">
                  <>
                    {list.length > 0 && (
                      list.map((item) => (
                        <Link
                          key={`tv-${item.id}`}
                          href={`/${item.type}/${item.id}`}
                          className="py-3 rounded-lg hover:bg-secondary flex justify-between items-center"
                        >
                          <ContentUserCard item={item} />
                          <Button
                            className="px-4 mr-10"
                            onClick={(e) => handleSetFeatured(e, item.id, item.type)}
                          >
                            <Plus size={20} />
                          </Button>
                        </Link>
                      ))
                    )}
                  </>
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  handleChangePage={handleChangePage}
                />
              </div>
            )}

          </>
        )}
      </TabsContent>
    </Tabs>

  )
}

export default FeaturedTabs;