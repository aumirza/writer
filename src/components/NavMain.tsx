import {
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavCollapsibleItem } from "./NavCollapsibleItem";
import { ISideBarItem } from "@/config/nav";
import { NavItem } from "./NavItem";

export function NavMain({ items }: { items: ISideBarItem[] }) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length ? (
            <NavCollapsibleItem key={item.url} item={item} />
          ) : (
            <NavItem key={item.url} item={item} />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
