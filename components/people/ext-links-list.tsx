import { externalUrls } from "@/lib/constants"
import Link from "next/link"
import { AiFillTikTok } from "react-icons/ai"
import { FaFacebookSquare, FaImdb, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiThemoviedatabase, SiWikidata } from "react-icons/si"

type ExternalIds = {
  id: number,
  facebook_id?: string,
  instagram_id?: string,
  twitter_id?: string,
  tiktok_id?: string,
  imdb_id?: string,
  wikidata_id?: string,
  youtube_id?: string,
}

const ExternalLinksList = ({ externalIds }: { externalIds: ExternalIds }) => {
  return (
    <div className='flex gap-2 items-center justify-center w-full'>

      {externalIds.facebook_id && (
        <Link href={`${externalUrls.facebook}${externalIds.facebook_id}`}>
          <FaFacebookSquare size={30} />
        </Link>
      )}
      {externalIds.instagram_id && (
        <Link href={`${externalUrls.instagram}${externalIds.instagram_id}`}>
          <FaInstagram size={30} />
        </Link>
      )}
      {externalIds.tiktok_id && (
        <Link href={`${externalUrls.tiktok}${externalIds.tiktok_id}`}>
          <AiFillTikTok size={30} />
        </Link>
      )}
      {externalIds.twitter_id && (
        <Link href={`${externalUrls.twitter}${externalIds.twitter_id}`}>
          <FaXTwitter size={30} />
        </Link>
      )}
      {externalIds.youtube_id && (
        <Link href={`${externalUrls.youtube}${externalIds.youtube_id}`}>
          <FaYoutube size={30} />
        </Link>
      )}
      {externalIds.wikidata_id && (
        <Link href={`${externalUrls.wikidata}${externalIds.wikidata_id}`}>
          <SiWikidata size={30} />
        </Link>
      )}

      {externalIds.imdb_id && (
        <Link href={`${externalUrls.imdb}${externalIds.imdb_id}`}>
          <FaImdb size={30} />
        </Link>
      )}
      {externalIds.id && (
        <Link href={`${externalUrls.tmdb}${externalIds.id}`}>
          <SiThemoviedatabase size={30} />
        </Link>
      )}

    </div>
  )
}
export default ExternalLinksList