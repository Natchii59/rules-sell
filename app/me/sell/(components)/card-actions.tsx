'use client'

import { useEffect, useState } from 'react'
import { useZact } from 'zact/client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'

import { deleteSellCardAction, editSellCardAction } from '../actions'
import { CardDataTable } from './card-table'

interface CardActionsProps {
  card: CardDataTable
}

export function CardActions({ card }: CardActionsProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false)

  const [serial, setSerial] = useState<number>(card.serial || 1)
  const [price, setPrice] = useState<number>(card.price || 0)

  const {
    mutate: mutateEdit,
    isLoading: isLoadingEdit,
    data: dataEdit
  } = useZact(editSellCardAction)

  const {
    mutate: mutateDelete,
    isLoading: isLoadingDelete,
    data: dataDelete
  } = useZact(deleteSellCardAction)

  useEffect(() => {
    if (!dataEdit) return

    if (dataEdit.status === 'error') {
      if (dataEdit.code === 'unknown_error') {
        toast({
          title: 'Error',
          description: 'An unknown error occured',
          variant: 'destructive'
        })
      }
    } else if (dataEdit.status === 'success') {
      toast({
        title: 'Card edited',
        description: 'Your card has been edited'
      })
      setEditOpen(false)
    }
  }, [dataEdit])

  useEffect(() => {
    if (!dataDelete) return

    if (dataDelete.status === 'error') {
      if (dataDelete.code === 'unknown_error') {
        toast({
          title: 'Error',
          description: 'An unknown error occured',
          variant: 'destructive'
        })
      }
    } else if (dataDelete.status === 'success') {
      toast({
        title: 'Card deleted',
        description: 'Your card has been deleted'
      })
      setEditOpen(false)
    }
  }, [dataDelete])

  return (
    <div className='flex items-center justify-end gap-2'>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Icons.edit className='h-4 w-4' />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your card to sell</DialogTitle>
            <DialogDescription>
              You are editing your card to sell.
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
                required
                className='col-span-3'
                value={serial}
                onChange={e => setSerial(Number(e.target.value))}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='price' className='text-right'>
                Price
              </Label>
              <Input
                id='price'
                type='number'
                placeholder='Optionnal'
                className='col-span-3'
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                if (!serial) return
                mutateEdit({ id: card.id, serial, price })
              }}
            >
              {isLoadingEdit && (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              )}
              <span>Submit</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        variant='ghost'
        size='icon'
        onClick={() => mutateDelete({ id: card.id })}
      >
        {isLoadingDelete ? (
          <Icons.spinner className='h-4 w-4 animate-spin text-red-400' />
        ) : (
          <Icons.delete className='h-4 w-4 text-red-400' />
        )}
      </Button>
    </div>
  )
}
