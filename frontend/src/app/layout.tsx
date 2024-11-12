import './globals.css'
import type { Metadata } from 'next'
import { inter } from '@/lib/fonts'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from '@/utils/ThemeProvider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Software Engineering Project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.className, "h-screen select-none w-screen bg-background overflow-x-hidden scroll-smooth")}>
      <body className='h-full w-full'>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
          <div className='h-full w-full p-5'>
            {children}
            <Toaster/>
            <SpeedInsights />
            <Analytics />
          </div>
          </ThemeProvider>
      </body>
    </html>
  )
}