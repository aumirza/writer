import { Icons } from "@/config/nav";
import { SidebarMenuButton } from "./ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function NavItem({
  item,
  hasItems,
}: {
  item: {
    title: string;
    icon: string;
    url: string;
  };
  hasItems?: boolean;
}) {
  const Icon = Icons[item.icon];

  return (
    <SidebarMenuButton tooltip={item.title} asChild>
      {hasItems ? (
        <div className="flex">
          <Icon />
          <span className="font-semibold">{item.title}</span>
          {/* <Badge className="ml-auto flex h-5 w-5 items-center justify-center rounded-sm border border-primary">
          //   <span className="block h-2 w-2 rounded-full bg-current" />
          // </Badge> */}
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </div>
      ) : (
        <Link href={item.url}>
          <Icon />
          <span className="font-semibold">{item.title}</span>
        </Link>
      )}
    </SidebarMenuButton>
  );
}
