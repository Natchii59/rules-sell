import { CardModel } from '@/types'

import { db } from '@/lib/db'

import { CardTable } from './card-table'

interface UserPageProps {
  params: {
    id: string
  }
}

async function getUserCards(userId: string) {
  const cards = await db.card.findMany({
    where: {
      userId,
      listingType: 'BUY'
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
      artistName: model.artistName,
      scarcity: model.scarcity.name,
      season: model.season,
      want: card.want
    }
  })
}

export default async function UserPage({ params }: UserPageProps) {
  const cards = await getUserCards(params.id)

  return <CardTable data={cards} />
}
