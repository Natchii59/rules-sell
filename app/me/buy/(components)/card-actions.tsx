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

import { deleteBuyCardAction, editBuyCardAction } from '../actions'
import { CardDataTable } from './card-table'

interface CardActionsProps {
  card: CardDataTable
}

export function CardActions({ card }: CardActionsProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false)

  const [want, setWant] = useState<string>(card.want || '')

  const {
    mutate: mutateEdit,
    isLoading: isLoadingEdit,
    data: dataEdit
  } = useZact(editBuyCardAction)

  const {
    mutate: mutateDelete,
    isLoading: isLoadingDelete,
    data: dataDelete
  } = useZact(deleteBuyCardAction)

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
            <DialogTitle>Edit your card to buy</DialogTitle>
            <DialogDescription>
              You are editing your card to buy.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-2 py-2'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='want' className='text-right'>
                Want
              </Label>
              <Input
                id='want'
                type='text'
                className='col-span-3'
                placeholder='What do you want? (Optional)'
                value={want}
                onChange={e => setWant(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => mutateEdit({ id: card.id, want })}>
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
