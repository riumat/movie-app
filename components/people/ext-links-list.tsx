import { externalUrls } from "@/lib/constants"
import Link from "next/link"
import { AiFillTikTok } from "react-icons/ai"
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiThemoviedatabase, SiWikidata, SiWikipedia } from "react-icons/si"

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
    <div className='flex gap-3 items-center justify-start w-full'>

      {externalIds.facebook_id && (
        <Link href={`${externalUrls.facebook}${externalIds.facebook_id}`} target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare size={25} />
        </Link>
      )}
      {externalIds.instagram_id && (
        <Link href={`${externalUrls.instagram}${externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer">
          <FaInstagram size={25} />
        </Link>
      )}
      {externalIds.tiktok_id && (
        <Link href={`${externalUrls.tiktok}${externalIds.tiktok_id}`} target="_blank" rel="noopener noreferrer">
          <AiFillTikTok size={25} />
        </Link>
      )}
      {externalIds.twitter_id && (
        <Link href={`${externalUrls.twitter}${externalIds.twitter_id}`} target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={25} />
        </Link>
      )}
      {externalIds.youtube_id && (
        <Link href={`${externalUrls.youtube}${externalIds.youtube_id}`} target="_blank" rel="noopener noreferrer">
          <FaYoutube size={25} />
        </Link>
      )}
      {externalIds.wikidata_id && (
        <Link href={`${externalUrls.wikidata}${externalIds.wikidata_id}`} target="_blank" rel="noopener noreferrer">
          <SiWikipedia size={25} />
        </Link>
      )}

    </div>
  )
}
export default ExternalLinksList