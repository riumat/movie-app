"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { FaUser } from "react-icons/fa6"

const LogoutModal = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    axios.get("/api/user/logout", { params: { path } })
      .then(() => router.refresh())
      .catch((err) => console.log(err))
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant="outline" className="px-3">
          {"Logout"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription >
        </DialogHeader>

        <DialogFooter className="sm:justify-start items-center">

          <DialogClose className="w-full mt-5" onClick={handleLogout}>
            <Button variant={"destructive"} className="w-full">
              Logout
            </Button>
          </DialogClose>


        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutModal
