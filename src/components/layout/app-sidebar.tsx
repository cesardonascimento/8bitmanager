'use client';

import { useMemo } from 'react';
import { Joystick, Gamepad2 } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { Platform } from '@/db/services/platforms';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { data: platforms, loading } = useApi<Platform[]>('/platforms');

  const items = useMemo(
    () => [
      {
        title: 'Platforms',
        url: '/platforms',
        icon: Joystick,
        submenu:
          platforms?.map(platform => ({
            title: platform.name,
            url: `/platforms/${platform.slug}`,
            icon: Gamepad2,
          })) || [],
      },
    ],
    [platforms]
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            {loading && <SidebarMenuSkeleton showIcon={true} />}
            <SidebarMenu>
              {!loading &&
                items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.submenu && item.submenu.length > 0 && (
                      <SidebarMenuSub>
                        {item.submenu.map(subItem => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <subItem.icon />
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
