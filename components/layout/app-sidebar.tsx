"use client"
import { ModeToggle } from "@/components/theme/toggle-theme"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { sidebarItems } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"

export const AppSidebar = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar >
      <SidebarHeader >
        <div className="flex items-center justify-between">
          <div className="flex justify-center w-full cursor-default">
            <Image
              src="/logo-no-bg.png"
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
            {sidebarItems.map((item) => (
              <li key={item.path} className="  ">
                <Link
                  href={item.path}
                  className='flex items-center gap-3 hover:underline p-3'
                  onClick={() => setOpenMobile(false)}
                >
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
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
