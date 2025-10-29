import { Sidebar } from "@/shared/ui";
import { Header } from "./Header";
import { SideBarToggle } from "@/features/sidebar-toggle";
import { Footer } from "./Footer";
import { Group } from "./Group";
import { navItems } from "@/widgets/main-sidebar/model/nav-config";

export function MainSidebar() {
  return <Sidebar side="right" className="border-none shadow-none outline-none">
    <SideBarToggle className="absolute top-4 ml-auto mr-4" /> 
    <Header />
    <Group navItems={navItems} />
    <Footer />
  </Sidebar>;
}
