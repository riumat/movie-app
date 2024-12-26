import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FeaturedTabs from "@/components/user/featured-tabs";

const modalType = (modal: string) => {
  switch (modal) {
    case "movie":
      return "/api/user/movie"
    case "tv":
      return "/api/user/tv"
  }
}


const FeaturedModal = ({ session }: { session: any }) => {
  /* const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setIsError] = useState(false);
  const modal = "movie" */

  /* const handleList = async (page: number) => {
    setIsLoading(true);
    await axios.get(`${modalType(modal)}?page=${page}&id=${session.user.id}`)
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

  } */

  /*  const handleChangePage = (newPage: number) => {
     setPage(newPage);
     handleList(newPage);
   } */
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" >
        <div>
          Set a new featured content
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[60vw] h-[82vh] overflow-hidden flex flex-col gap-8" >
        <DialogHeader>
          <DialogTitle>Featured Content</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="h-full flex flex-col gap-5  overflow-hidden">
          <FeaturedTabs session={session} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeaturedModal
