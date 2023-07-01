'use server'

import { zact } from 'zact/server'
import { z } from 'zod'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export const addSellCardAction = zact(
  z.object({
    serial: z.number().min(1),
    price: z.number().optional(),
    cardId: z.string()
  })
)(async input => {
  try {
    const user = await getCurrentUser()

    if (!user)
      return {
        status: 'error',
        code: 'not_authenticated'
      }

    await db.card.create({
      data: {
        serial: input.serial,
        listingType: 'SELL',
        price: input.price === 0 ? null : input.price,
        cardId: input.cardId,
        userId: user.id
      }
    })

    return {
      status: 'success'
    }
  } catch (err) {
    return {
      status: 'error',
      code: 'unknown_error'
    }
  }
})
