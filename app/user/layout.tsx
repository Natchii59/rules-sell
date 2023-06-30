import Link from 'next/link'
import { notFound } from 'next/navigation'

import { navbarConfig } from '@/config/navbar'
import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { MainNav } from '@/components/main-nav'
import { UserAccountNav } from '@/components/user-account-nav'

export default async function SellLayout({
  children
}: React.PropsWithChildren) {
  const user = await getCurrentUser()

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav items={navbarConfig.mainNav} />
          {user ? (
            <UserAccountNav
              user={{
                id: user.id,
                name: user.name,
                image: user.image,
                email: user.email
              }}
            />
          ) : (
            <Link
              href='/auth/login'
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <main className='container flex w-full flex-1 flex-col overflow-hidden pb-4'>
        {children}
      </main>
    </div>
  )
}
