import { Joystick, Gamepad2, CheckCircle, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { PlatformRepository } from '@/db/repositories/platform.repository';

export async function AppSidebar() {
  const platforms = await PlatformRepository.list();

  const items = [
    {
      title: 'Platforms',
      url: '/platforms',
      icon: Joystick,
      submenu: platforms.map(platform => ({
        title: platform.name,
        url: `/platforms/${platform.id}`,
        icon: Gamepad2,
        isCompleted: platform.releasedGamesCount > 0 && (platform.releasedGamesCount === platform.collectionGamesCount),
        isInProgress: platform.collectionGamesCount > 0 && (platform.releasedGamesCount !== platform.collectionGamesCount),
      })),
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.submenu && item.submenu.length > 0 && (
                    <SidebarMenuSub>
                      {item.submenu.map(subItem => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <subItem.icon />
                              <span className="truncate">{subItem.title}</span>
                              {subItem.isCompleted && <CheckCircle2 className="!text-green-500" />}
                              {!subItem.isCompleted && subItem.isInProgress && <Circle className="!text-yellow-500" />}
                            </Link>
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
