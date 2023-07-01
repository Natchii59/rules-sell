import { notFound } from 'next/navigation'

import { navbarConfig } from '@/config/navbar'
import { getCurrentUser } from '@/lib/session'
import { MainNav } from '@/components/main-nav'
import { UserAccountNav } from '@/components/user-account-nav'

export default async function MeLayout({ children }: React.PropsWithChildren) {
  const user = await getCurrentUser()

  if (!user) return notFound()

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='container flex h-16 items-center justify-between py-4'>
          <MainNav items={navbarConfig.mainNav} />
          <UserAccountNav
            user={{
              id: user.id,
              name: user.name,
              image: user.image,
              email: user.email
            }}
          />
        </div>
      </header>

      <main className='container flex w-full flex-1 flex-col overflow-hidden pb-4'>
        {children}
      </main>
    </div>
  )
}
