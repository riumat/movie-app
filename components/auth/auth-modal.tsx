"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import RegisterForm from "@/components/auth/register-form"
import LoginForm from "@/components/auth/login-form"
import { FaUser } from "react-icons/fa6";


const AuthModal = ({ isOpen, label }: { isOpen: boolean, label: string }) => {
  const [open, setOpen] = useState(isOpen);
  const [isToRegister, setIsToRegister] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-3">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {isToRegister ? (
            <DialogTitle>Register</DialogTitle>
          ) : (
            <DialogTitle>Login</DialogTitle>
          )}
          <DialogDescription />
        </DialogHeader>

        {isToRegister ? (
          <RegisterForm setOpen={setOpen} />
        ) : (
          <LoginForm setOpen={setOpen} />
        )}

        <Separator className="w-full my-5" />
        <DialogFooter className="sm:justify-start items-center">
          <Button
            variant={"outline"}
            className="w-full"
            onClick={() => setIsToRegister(prev => !prev)}
          >
            {isToRegister ?
              <p className="text-center text-sm">Already have an account?</p>
              :
              <p className="text-center text-sm">Dont have an account?</p>
            }

          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
