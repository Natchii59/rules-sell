'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { Icons } from './icons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isDiscordLoading, setIsDiscordLoading] = useState<boolean>(false)

  return (
    <div className={cn('grid gap-5', className)} {...props}>
      <button
        type='button'
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsDiscordLoading(true)
          signIn('discord')
        }}
        disabled={isDiscordLoading}
      >
        {isDiscordLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Icons.link className='mr-2 h-4 w-4' />
        )}
        Discord
      </button>
    </div>
  )
}
