import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/lib/actions/auth";
import { AuthState } from "@/lib/types/auth";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const LoginForm = ({ setOpen }: { setOpen: (flag: boolean) => void }) => {
  const initialState: AuthState = { errors: {}, success: null };
  const [state, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state])
  return (
    <form action={formAction}>
      <div className="flex items-center space-x-2 mt-5">
        <div className="flex flex-col  flex-1 gap-7">

          <div className="flex flex-col gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              className={`col-span-3 ${state?.errors?.email && "border-red-500"}`}
              required
              placeholder="Email"
            />
            {state?.errors?.email && <p className="text-red-500 text-sm">{state?.errors?.email}</p>}
          </div>

          <div className="flex flex-col gap-2">

            <Input
              id="password"
              name="password"
              type="password"
              className={`col-span-3 ${state?.errors?.password && "border-red-500"}`}
              required
              placeholder="Password"
            />
            {state?.errors?.password && <p className="text-red-500 text-sm">{state?.errors?.password}</p>}
          </div>

          <Button type="submit" variant="secondary" className="px-10">
            Log In
          </Button>
        </div>

      </div>

    </form>
  )
}

export default LoginForm;