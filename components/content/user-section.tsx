"use client";
import { FaEye, FaRegEye } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import ReviewModal from "@/components/content/review-modal";
import AuthModal from "@/components/auth/auth-modal";
import RenderStars from "@/components/content/render-stars";
import useIsWatched from "@/lib/hooks/use-watched";
import ToggleWatchlist from "@/components/content/toggle-watchlist";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import { ContentUserData } from "@/lib/types/content";

const UserSection = ({ userData, contentData }:
  { userData: ContentUserData | undefined, contentData: MovieData | TvData }) => {
  if (!userData) return (
    <AuthModal
      isOpen={false}
      label="Login to rate or review"
    />
  );

  const { isWatched, handleIsWatched } = useIsWatched(userData.watched, contentData);

  return (
    <div className="flex gap-5 ">
      <Button
        variant={"outline"}
        className={`w-full px-3 group`}
        onClick={handleIsWatched}
      >
        {isWatched ? (
          <div className="flex gap-2 items-center">
            <FaEye size={30} />
            <p className="group-hover:hidden">Watched</p>
            <p className="hidden group-hover:block">Remove</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <FaRegEye size={30} />
            <p>Watch</p>
          </div>
        )}
      </Button>
      <div className="flex items-center " >
        <RenderStars
          isWatched={isWatched}
          userData={userData}
          contentData={contentData}
        />
      </div>
      <ReviewModal
        userData={userData}
        contentData={contentData}
        disabled={!isWatched}
      />
      <ToggleWatchlist
        userData={userData}
        contentData={contentData}
      />

    </div>
  );
};

export default UserSection;
