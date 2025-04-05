import OverviewModal from "@/components/content/overview-modal";
import ProviderModal from "@/components/content/provider-modal";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatMinutes, formatTvDuration } from "@/lib/functions"
import { MovieData } from "@/lib/types/movie.types"
import { TvData } from "@/lib/types/tv.types"

const ContentInfos = ({ contentData }: { contentData: MovieData | TvData }) => {

  return (
    <div className=' flex flex-col justify-end gap-5 w-full text-sm '>
      <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mt-5 lg:mt-0 text-center lg:text-start">
        {contentData.media_type === "movie" ? contentData.title : contentData.name}
      </h2>

      <div className='flex justify-center lg:justify-start items-start text-sm'>
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 items-center'>
          {contentData.media_type === "tv" ? (
            <>
              <p>{formatTvDuration(contentData.first_air_date, contentData.last_air_date, contentData.status)}</p>
              <p>{`${contentData.number_of_seasons} ${contentData.number_of_seasons === 1 ? "season" : "seasons"}`}</p>
            </>
          ) : (
            <>
              <p>{formatDate(contentData.release_date)}</p>
              <p>{formatMinutes(contentData.runtime)}</p>
            </>
          )}
          <div className="flex flex-wrap  justify-center lg:justify-start">
            {contentData.genres.map((genre) => (
              <Badge variant={"secondary"} key={genre.id} className="mr-2 cursor-pointer">
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center lg:justify-start gap-5'>
        <OverviewModal overview={contentData.overview} />
        <ProviderModal providers={contentData.providers} />
      </div>
    </div>
  )

}

export default ContentInfos