import Link from 'next/link'
import { CardModel } from '@/types'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'

import { CardTable } from './(components)/card-table'

async function getCards() {
  const user = await getCurrentUser()

  if (!user) return

  const cards = await db.card.findMany({
    where: {
      userId: user.id,
      listingType: 'TRADE'
    }
  })

  const QUERY = `
query FetchCardModelsByIds($ids: [ID!]!) {
  cardModelsByIds(ids: $ids) {
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

  const result = await fetch('https://api.rules.art/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { ids: cards.map(card => card.cardId) }
    })
  })

  const { data } = await result.json()
  const cardModels = data.cardModelsByIds as CardModel[]

  return cards.map(card => {
    const model = cardModels.find(
      model => model.id === card.cardId
    ) as CardModel

    return {
      id: card.id,
      slug: model.slug,
      artistName: model.artistName,
      serial: card.serial,
      season: model.season,
      scarcity: model.scarcity.name,
      want: card.want
    }
  })
}

export default async function TradePage() {
  const data = await getCards()

  if (!data) return null

  return (
    <>
      <Link href='/me/trade/add' className={cn(buttonVariants())}>
        <Icons.plus className='mr-2 h-4 w-4' />
        Add card to trade
      </Link>

      <CardTable data={data} />
    </>
  )
}
