'use server'

import { zact } from 'zact/server'
import { z } from 'zod'

import { db } from '@/lib/db'

export const editCardAction = zact(
  z.object({
    id: z.string(),
    serial: z.number().min(1),
    price: z.number().optional()
  })
)(async input => {
  try {
    await db.card.update({
      where: {
        id: input.id
      },
      data: {
        serial: input.serial,
        price: input.price
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

export const deleteCardAction = zact(
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
