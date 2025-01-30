"use client"
import ContentUserCard from "@/components/cards/content-user-card";
import Loader from "@/components/layout/loader";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFeatured } from "@/lib/hooks/use-featured";
import Link from "next/link";
import { IoSadOutline } from "react-icons/io5";


const FeaturedTabs = ({ session }: { session: any }) => {
  const { list, totalPages, page, error, isLoading, handleChangePage, handleTab, handleSetFeatured } = useFeatured(session);

  return (
    <Tabs defaultValue="movie" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger onClick={() => handleTab("movie", 1)} value="movie">Movies</TabsTrigger>
        <TabsTrigger onClick={() => handleTab("tv", 1)} value="tv">Tv Shows</TabsTrigger>
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
                <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col ">
                  <>
                    {list.length > 0 && (
                      list.map((item: any) => (
                        <Link
                          key={`movie-${item.id}`}
                          href={`/${item.type}/${item.id}`}
                          className="py-2 rounded-lg hover:bg-secondary flex justify-between items-center pr-10 pl-5"
                        >
                          <ContentUserCard item={item} />
                          <Button
                            className="px-4 "
                            onClick={(e) => handleSetFeatured(e, item.id, item.type)}
                          >
                            <p>Set as favorite</p>
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
                <p className="text-xl">Empty! <Link href={"/tv"} className="hover:underline">Start browsing now!</Link></p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 h-full">
                <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col">
                  <>
                    {list.length > 0 && (
                      list.map((item: any) => (
                        <Link
                          key={`tv-${item.id}`}
                          href={`/${item.type}/${item.id}`}
                          className="py-2 rounded-lg hover:bg-secondary flex justify-between items-center pr-10 pl-5"
                        >
                          <ContentUserCard item={item} />
                          <Button
                            className="px-4"
                            onClick={(e) => handleSetFeatured(e, item.id, item.type)}
                          >
                            <p>Set as favorite</p>
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