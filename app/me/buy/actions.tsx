'use server'

import { zact } from 'zact/server'
import { z } from 'zod'

import { db } from '@/lib/db'

export const editBuyCardAction = zact(
  z.object({
    id: z.string(),
    want: z.string().optional().nullable()
  })
)(async input => {
  try {
    await db.card.update({
      where: {
        id: input.id
      },
      data: {
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

export const deleteBuyCardAction = zact(
  z.object({
    id: z.string()
  })
)(async input => {
  try {
    await db.card.delete({
      where: {
        id: input.id
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
