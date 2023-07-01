import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/lib/db'
import { UserAvatar } from '@/components/user-avatar'

interface UserPageProps extends React.PropsWithChildren {
  params: {
    id: string
  }
}

async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      image: true
    }
  })

  if (!user) return notFound()

  return user
}

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id

  const user = await getUser(id)

  return {
    title: `${user.name}`
  }
}

export default async function UserLayout({ params, children }: UserPageProps) {
  const user = await getUser(params.id)

  return (
    <>
      <div className='flex items-center gap-2'>
        <UserAvatar user={user} />
        <Link
          href={`/user/${params.id}`}
          className='font-heading text-2xl hover:underline'
        >
          {user.name}
        </Link>
      </div>

      {children}
    </>
  )
}
