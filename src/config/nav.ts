import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export const Icons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  blog: LayoutGrid,
  orders: ShoppingCart,
  products: Package,
  customers: Users,
  settings: Settings,
} as const;

export type IconKeys = keyof typeof Icons;

export interface ISideBarItem {
  icon: IconKeys;
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
  }[];
}

export const sidebarItems: ISideBarItem[] = [
  { icon: "dashboard", title: "Overview", url: "/dashboard" },
  {
    icon: "blog",
    title: "Blog",
    url: "/dashboard/blog",
    items: [
      { title: "Posts", url: "/dashboard/posts" },
      { title: "Add new post", url: "/dashboard/posts/add" },
      { title: "Categories", url: "/dashboard/blog/categories" },
      { title: "Tags", url: "/dashboard/blog/tags" },
    ],
  },
  { icon: "settings", title: "Settings", url: "/dashboard/settings" },
];
