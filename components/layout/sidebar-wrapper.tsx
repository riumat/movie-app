import Sidebar from "@/components/layout/sidebar";
import { getSession } from "@/lib/session"
import { Suspense } from "react";

const SidebarWrapper = async () => {
  const session = await getSession();

  return (
    <Sidebar session={session} />
  )
}
export default SidebarWrapper