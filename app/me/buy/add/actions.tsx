'use server'

import { zact } from 'zact/server'
import { z } from 'zod'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export const addBuyCardAction = zact(
  z.object({
    want: z.string().optional().nullable(),
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
        listingType: 'BUY',
        cardId: input.cardId,
        userId: user.id,
        want: input.want
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
