import { Icons } from '@/components/icons'

export default function TradeAddLoading() {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Icons.spinner className='h-8 w-8 animate-spin' />
      <div className='mt-4 text-gray-500'>Loading...</div>
    </div>
  )
}
