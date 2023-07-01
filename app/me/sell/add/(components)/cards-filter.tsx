'use client'

import { useState } from 'react'
import { CardModel } from '@/types'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import CardDialog from './card-dialog'

interface CardsFilterProps {
  cardModels: CardModel[]
}

export default function CardsFilter({ cardModels }: CardsFilterProps) {
  const [selectedSeason, setSelectedSeason] = useState('all')

  return (
    <>
      <Select
        value={selectedSeason}
        onValueChange={value => setSelectedSeason(value)}
      >
        <SelectTrigger className='mb-4'>
          <SelectValue placeholder='Select a season' />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Seasons</SelectLabel>
            <SelectItem value='all'>All seasons</SelectItem>
            <SelectItem value='1'>Season 1</SelectItem>
            <SelectItem value='2'>Season 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className='flex flex-wrap justify-center gap-2'>
        {cardModels
          .filter(card => {
            if (selectedSeason === 'all') return true

            return Number(selectedSeason) === card.season
          })
          .map(cardModel => (
            <CardDialog key={cardModel.id} cardModel={cardModel} />
          ))}
      </div>
    </>
  )
}
