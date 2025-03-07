import AuthModal from "@/components/auth/auth-modal"
import LogoutModal from "@/components/auth/logout-modal"
import { ModeToggle } from "@/components/theme/toggle-theme"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { sidebarItems } from "@/lib/constants"
import { getSession } from "@/lib/session"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const AppSidebar = async () => {
  const session = await getSession()
  const isLogged = !!session;

  return (
    <Sidebar>
      <SidebarHeader >
        <div className="flex items-center justify-between">
          <div className="flex justify-center w-full ">
            <Image
              src="/logo.png"
              alt="logo"
              className="rounded-full relative -top-5"
              width={160}
              height={160}
            />
          </div>
        </div>
      </SidebarHeader >
      <SidebarContent>
        <SidebarGroup className="w-full flex">
          <ul className=' text-sm flex flex-col gap-5  mx-auto'>
            {sidebarItems.filter((item) => session ? item : item.label !== "Profile").map((item) => (
              <li key={item.path} className="  ">
                <Link href={item.path === "/user" ? `${item.path}/${session.user.id}` : item.path} className='flex items-center gap-3 hover:underline p-3'>
                  <item.icon size={17} />
                  <span

                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}

          </ul>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter >
        <div className="mb-8  flex justify-evenly items-center ">
          <ModeToggle />
          {isLogged ? (
            <LogoutModal />
          ) : (
            <AuthModal isOpen={false} label='Login' />
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
