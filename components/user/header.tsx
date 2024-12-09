import { Button } from "@/components/ui/button"
import { formatDateSince, formatMinutes } from "@/lib/functions"
import { ProfileData } from "@/lib/types/user"
import { Plus } from "lucide-react"

const Header = ({ id, session, userData }: { id: string, session: any, userData: ProfileData }) => {
  return (
    <div className="flex w-full">
      <div className=" p-2 flex-1 flex flex-col gap-2">
        <div className="flex gap-10 items-center">
          <p className="text-5xl font-bold">{`${userData.name}`}</p>
          {session.user.id !== Number(id) &&
            <Button variant={"outline"} className="mt-2 px-3 py-1 flex items-center gap-2">
              <Plus size={24} />
              <p>Add Friend</p>
            </Button>}
        </div>
        <p className="font-light text-sm italic text-foreground/50">{`member since ${formatDateSince(userData.since)}`}</p>
      </div>

      <div className=" p-2 flex-1 flex items- justify-end gap-10">
        <div className="flex flex-col items-center gap-1">
          <span className="font-light text-sm">Total watchtime</span>
          <p className="font-bold text-5xl">{`${formatMinutes(userData.watchtime)}`}</p>
        </div>

      </div>
    </div>
  )
}

export default Header