import { notFound } from 'next/navigation'
import { CardModel } from '@/types'

import { db } from '@/lib/db'
import { UserCardTable } from '@/components/user-card-table'

interface UserPageProps {
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

async function getUserCards(userId: string) {
  const cards = await db.card.findMany({
    where: {
      userId
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

  const { data } = (await result.json()) as {
    data: { cardModelsByIds: CardModel[] }
  }

  return cards.map(card => {
    const model = data.cardModelsByIds.find(
      model => model.id === card.cardId
    ) as CardModel

    return {
      id: card.id,
      artistName: model.artistName,
      serial: card.serial,
      season: model.season,
      price: card.price
    }
  })
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUser(params.id)
  const cards = await getUserCards(params.id)

  return <UserCardTable data={cards} />
}
