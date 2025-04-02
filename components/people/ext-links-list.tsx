import { Button } from "@/components/ui/button"
import { externalUrls } from "@/lib/constants"
import Link from "next/link"
import { AiFillTikTok } from "react-icons/ai"
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiWikipedia } from "react-icons/si"

type ExternalIds = {
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
    <div className='flex items-center justify-center lg:justify-start w-full '>

      {externalIds.facebook_id && (
        <Link href={`${externalUrls.facebook}${externalIds.facebook_id}`} target="_blank" rel="noopener noreferrer">
          <Button variant={"ghost"} size={"icon"} >
            <FaFacebookSquare className="!w-5 !h-5" />
          </Button>
        </Link>
      )}
      {externalIds.instagram_id && (
        <Link href={`${externalUrls.instagram}${externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer">
          <Button variant={"ghost"} size={"icon"} >

            <FaInstagram className="!w-5 !h-5" />
          </Button>

        </Link>
      )}
      {externalIds.tiktok_id && (
        <Link href={`${externalUrls.tiktok}${externalIds.tiktok_id}`} target="_blank" rel="noopener noreferrer">
          <Button variant={"ghost"} size={"icon"} >

            <AiFillTikTok className="!w-5 !h-5" />
          </Button>

        </Link>
      )}
      {externalIds.twitter_id && (
        <Link href={`${externalUrls.twitter}${externalIds.twitter_id}`} target="_blank" rel="noopener noreferrer">
          <Button variant={"ghost"} size={"icon"} >

            <FaXTwitter className="!w-5 !h-5" />
          </Button>

        </Link>
      )}
      {externalIds.youtube_id && (
        <Link href={`${externalUrls.youtube}${externalIds.youtube_id}`} target="_blank" rel="noopener noreferrer">
          <Button variant={"ghost"} size={"icon"} >

            <FaYoutube className="!w-5 !h-5" />
          </Button>

        </Link>
      )}
      {externalIds.wikidata_id && (
        <Link href={`${externalUrls.wikidata}${externalIds.wikidata_id}`} target="_blank" rel="noopener noreferrer">
          <Button variant={"ghost"} size={"icon"} >

            <SiWikipedia className="!w-5 !h-5" />
          </Button>

        </Link>
      )}

    </div>
  )
}
export default ExternalLinksList