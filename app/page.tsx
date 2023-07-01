'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
        <div className='mx-auto flex w-full flex-col items-center justify-center gap-4 sm:w-[350px]'>
          <h1 className='text-center text-3xl font-semibold tracking-tight'>
            Welcome to Rules Sell
          </h1>

          <Link
            href='/me'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            List your cards
          </Link>
        </div>
      </div>
    </div>
  )
}
