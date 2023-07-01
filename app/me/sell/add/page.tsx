import Link from 'next/link'
import { CardModel } from '@/types'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'

import CardDialog from './(components)/card-dialog'

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

export default async function SellAddPage() {
  const cardModels = await fetchAllCardModels()

  return (
    <>
      <div className='mb-4 flex items-center gap-4'>
        <Link
          href='/me/sell'
          className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
        >
          <Icons.left className='mr-2 h-4 w-4' />
          Back
        </Link>

        <h1 className='font-bold'>Add Card to sell</h1>
      </div>

      <div className='flex flex-wrap justify-center gap-2'>
        {cardModels.map(cardModel => (
          <CardDialog key={cardModel.id} cardModel={cardModel} />
        ))}
      </div>
    </>
  )
}
