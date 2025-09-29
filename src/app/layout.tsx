import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { ThemeSwitch } from '@/components/layout/theme-switch';
import { Separator } from '@/components/ui/separator';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { NotificationProvider } from '@/providers/notification-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '8bit Manager',
  description: 'Manage your retro games collection',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <NotificationProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <div className="px-8 py-4 flex justify-between items-center">
                  <SidebarTrigger />
                  <ThemeSwitch />
                </div>
                <Separator />
                <div className="p-8 flex flex-col gap-4">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
