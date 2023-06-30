import Link from 'next/link'
import { CardModel } from '@/types'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import CardDialog from '@/components/card-dialog'
import { Icons } from '@/components/icons'

async function fetchAllCardModels() {
  const QUERY = `
query FetchAllCardModels {
  allCardModels {
    id
    uid
    slug
    pictureUrl(derivative: "width=512")
    scarcity {
      name
    }
    season
    artistName
  }
} 
`

  const res = await fetch('https://api.rules.art/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: QUERY })
  })

  const { data } = await res.json()

  return data.allCardModels as CardModel[]
}

export default async function PageAddSell() {
  const cardModels = await fetchAllCardModels()

  return (
    <>
      <Link
        href='/sell'
        className={cn(buttonVariants({ variant: 'ghost' }), 'self-start')}
      >
        <>
          <Icons.left className='mr-2 h-4 w-4' />
          Back
        </>
      </Link>

      <h1 className='mb-4 font-heading text-2xl'>Add Card to sell</h1>

      <div className='flex flex-wrap justify-center gap-2'>
        {cardModels.map(cardModel => (
          <CardDialog key={cardModel.id} cardModel={cardModel} />
        ))}
      </div>
    </>
  )
}
