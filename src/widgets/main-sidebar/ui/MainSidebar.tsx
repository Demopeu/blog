import { Sidebar } from "@/shared/ui";
import { Header } from "./Header";

export function MainSidebar() {
  return <Sidebar side="right" className="border-none shadow-none outline-none">
    <Header />
  </Sidebar>;
}
