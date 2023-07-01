import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface UserPageProps {
  params: {
    id: string
  }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <div className='mt-4 flex items-center gap-2'>
      <Link href={`/user/${params.id}/sell`} className={cn(buttonVariants())}>
        Sell
      </Link>
      <Link href={`/user/${params.id}/trade`} className={cn(buttonVariants())}>
        Trade
      </Link>
      <Link href={`/user/${params.id}/buy`} className={cn(buttonVariants())}>
        Buy
      </Link>
    </div>
  )
}
