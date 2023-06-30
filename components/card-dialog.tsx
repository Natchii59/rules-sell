'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CardModel } from '@/types'
import { useZact } from 'zact/client'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { addCardAction } from '@/app/sell/add/actions'

import { Icons } from './icons'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from './ui/use-toast'

interface CardModelProps {
  cardModel: CardModel
}

export default function CardDialog({ cardModel }: CardModelProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [serial, setSerial] = useState<number>(1)
  const [price, setPrice] = useState<number>(0)

  const { mutate, isLoading, data, error } = useZact(addCardAction)

  useEffect(() => {
    if (!data) return

    if (data.status === 'error') {
      if (data.code === 'not_authenticated') {
        toast({
          title: 'Not authenticated',
          description: 'You need to be authenticated to sell your card',
          variant: 'destructive'
        })
      } else if (data.code === 'unknown_error') {
        toast({
          title: 'Error',
          description: 'An unknown error occured',
          variant: 'destructive'
        })
      }
    } else if (data.status === 'success') {
      toast({
        title: 'Card added',
        description: 'Your card has been added to sell'
      })
      setOpen(false)
    }
  }, [data])

  useEffect(() => {
    if (!error) return

    if (error.message.startsWith('Validation error')) {
      toast({
        title: 'Error',
        description: error.message.replace('Validation error: ', '')
      })
    }
  }, [error])

  return (
    <Dialog key={cardModel.id} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card key={cardModel.id} className='group cursor-pointer'>
          <CardContent className={cn(['p-2'])}>
            <Image
              src={cardModel.pictureUrl}
              alt={cardModel.artistName}
              width={200}
              height={400}
              loading='lazy'
              className='transition-transform duration-200 group-hover:scale-105'
            />
          </CardContent>

          <CardFooter className={cn('flex flex-col items-start p-2 pt-0')}>
            <span className='font-bold'>{cardModel.artistName}</span>
            <span>Season {cardModel.season}</span>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your card to sell</DialogTitle>
          <DialogDescription>
            You are adding your card to sell. Please, fill the serial number
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-2 py-2'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='serial' className='text-right'>
              Serial
            </Label>
            <Input
              id='serial'
              type='number'
              min={1}
              required
              className='col-span-3'
              value={serial}
              onChange={e => {
                const value = Number(e.target.value)
                setSerial(value)
              }}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              Price
            </Label>
            <Input
              id='price'
              type='number'
              min={0}
              placeholder='Optionnal'
              className='col-span-3'
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => mutate({ serial, price, cardId: cardModel.id })}
          >
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
