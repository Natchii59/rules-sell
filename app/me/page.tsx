import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function MePage() {
  return (
    <div className='flex flex-col items-center gap-1 text-center'>
      <h1 className='font-heading text-2xl'>
        This is the place to list your cards
      </h1>

      <p className='max-w-xl text-sm'>
        You can sell, trade, or buy for cards with the available locations
        below. Links are also available in the navigation bar.
      </p>

      <div className='mt-3 flex items-center gap-2'>
        <Link href='/me/sell' className={cn(buttonVariants())}>
          Sell
        </Link>
        <Link href='/me/trade' className={cn(buttonVariants())}>
          Trade
        </Link>
        <Link href='/me/buy' className={cn(buttonVariants())}>
          Buy
        </Link>
      </div>
    </div>
  )
}
