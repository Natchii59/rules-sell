'use server'

import { zact } from 'zact/server'
import { z } from 'zod'

import { db } from '@/lib/db'

export const editTradeCardAction = zact(
  z.object({
    id: z.string(),
    serial: z.number().min(1),
    want: z.string().optional().nullable()
  })
)(async input => {
  try {
    await db.card.update({
      where: {
        id: input.id
      },
      data: {
        serial: input.serial,
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

export const deleteTradeCardAction = zact(
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
