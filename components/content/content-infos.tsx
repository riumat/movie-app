import OverviewModal from "@/components/content/overview-modal";
import ProviderModal from "@/components/content/provider-modal";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatMinutes, formatTvDuration } from "@/lib/functions"
import { MovieData } from "@/lib/types/movie.types"
import { TvData } from "@/lib/types/tv.types"

const ContentInfos = ({ contentData }: { contentData: MovieData | TvData }) => {

  return (
    <div className=' flex flex-col justify-end gap-7 w-full text-sm'>
      <div className='w-full flex justify-start gap-5'>
        <OverviewModal overview={contentData.overview} /> 
        <ProviderModal providers={contentData.providers} />
      </div>
      <div className='flex justify-start items-start '>
        <div className='flex gap-12'>
          {contentData.media_type === "tv" ? (
            <>
              <p>{formatTvDuration(contentData.first_air_date, contentData.last_air_date,contentData.status)}</p>
              <p>{`${contentData.number_of_seasons} ${contentData.number_of_seasons === 1 ? "season" : "seasons"}`}</p>
            </>
          ) : (
            <>
              <p>{formatDate(contentData.release_date)}</p>
              <p>{formatMinutes(contentData.runtime)}</p>
            </>
          )}
          <div>
            {contentData.genres.map((genre) => (
              <Badge variant={"secondary"} key={genre.id} className="mr-2 cursor-pointer">
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

}

export default ContentInfos