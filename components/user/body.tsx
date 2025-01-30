import GenresPieChart from "@/components/ui/genres-pie-chart"
import { Separator } from "@/components/ui/separator"
import ActivitySection from "@/components/user/activity-section"
import FeaturedContent from "@/components/user/featured-content"
import Header from "@/components/user/header"
import { ProfileData } from "@/lib/types/user"
import { Suspense } from "react"

const Body = ({ id, userData, session }: { id: string, userData: ProfileData, session: any }) => {
  return (
    <div className="flex flex-col w-[95%] h-[93.5%] text-foreground px-12  pb-0  rounded-lg ">

      <Header id={id} session={session} userData={userData} />
      <Separator />
      <div className="flex justify-between py-5 bg-background rounded-xl">
        <ActivitySection id={id} userData={userData} />
        <Separator orientation="vertical" className="mx-20" />
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedContent id={id} session={session} />
        </Suspense>
      </div>
      <Separator className="my-16" />
      <div className="w-full flex-1 relative flex bg-background rounded-xl">
        <GenresPieChart genres={userData.genres} />
      </div>

    </div >
  )
}

export default Body