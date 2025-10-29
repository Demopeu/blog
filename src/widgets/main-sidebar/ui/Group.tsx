import { SidebarGroup } from "@/shared/ui";
import { NavBar } from "./NavBar";
import { NavBarProps } from "@/widgets/main-header/model/nav-config";

export function Group({navItems}: {navItems: NavBarProps[]}) {
  return (
    <SidebarGroup><NavBar navItems={navItems} /></SidebarGroup>
  )
}
