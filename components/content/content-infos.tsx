import { formatDate, formatMinutes, formatTvDuration } from "@/lib/functions"
import { MovieData, TvData } from "@/lib/types"

const ContentInfos = ({ contentData }: { contentData: MovieData | TvData }) => {

  return (
    <div className=' flex flex-col justify-end gap-5 w-full text-sm'>
      <div className='w-full flex justify-start'>
        <p className='font-bold'>{contentData.tagline}</p>
      </div>
      <div className='flex justify-start items-start '>
        <div className='flex gap-12'>
          {contentData.type === "tv" ? (
            <>
              <p>{formatTvDuration(contentData.first_air_date, contentData.last_air_date)}</p>
              <p>{`${contentData.seasons.length} ${contentData.seasons.length === 1 ? "season" : "seasons"}`}</p>
              <p>{contentData.status}</p>
            </>
          ) : (
            <>
              <p>{formatDate(contentData.release_date)}</p>
              <p>{formatMinutes(contentData.runtime)}</p>
            </>
          )}
          <div>
            {contentData.genres.map((genre, index, array) => (
              <span key={genre.id} className="mr-2">
                {genre.name}{index < array.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

}

export default ContentInfos