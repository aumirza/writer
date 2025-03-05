import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "./NavLink";
import { ISideBarItem } from "@/config/nav";
import { NavItem } from "./NavItem";

export function NavCollapsibleItem({ item }: { item: ISideBarItem }) {
  return (
    <Collapsible
      key={item.title}
      asChild
      //   defaultOpen={item.isActive}
      defaultOpen={true}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <NavItem item={item} hasItems={Boolean(item.items?.length)} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <NavLink
                    key={subItem.url}
                    href={subItem.url}
                    label={subItem.title}
                  />
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
