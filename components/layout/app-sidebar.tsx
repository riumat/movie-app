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
        <SidebarGroup >
          <ul className='relative text-sm flex flex-col ml-6 gap-1 '>
            {sidebarItems.filter((item) => session ? item : item.label !== "Profile").map((item) => (
              <li key={item.path} className="mb-10">
                <Link href={item.path === "/user" ? `${item.path}/${session.user.id}` : item.path} className='flex items-center gap-2 ml-3'>
                  <item.icon size={17} />
                  <span
                    className="px-3 py-1 rounded-xl hover:underline text-sm"
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
      <SidebarFooter />
    </Sidebar>
  )
}
