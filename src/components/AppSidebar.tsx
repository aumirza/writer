import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavUser } from "./NavUser";
import { createClient } from "@/utils/supabase/server";
import { sidebarItems } from "@/config/nav";
import { NavMain } from "./NavMain";

export async function AppSidebar() {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return null;
  const { data } = await supabase
    .from("users")
    .select()
    .eq("id", authData.user?.id)
    .single();

  return (
    <SidebarComponent className="min-h-screen bg-background border-r">
      <SidebarHeader>
        <h2 className="text-lg font-semibold text-foreground">Writer</h2>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: data.full_name,
            email: authData.user.email ?? "",
            avatar: data.avatar_url,
          }}
        />
      </SidebarFooter>
    </SidebarComponent>
  );
}
