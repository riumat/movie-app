"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import SeasonModal from '@/components/tv/season-modal'

interface SeasonsSectionProps {
  seasons: {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
  }[]
}


const SeasonsSection = ({ seasons }: SeasonsSectionProps) => {
  const params = useParams();
  const { id } = params;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-5 justify-items-center gap-x-5 gap-y-10 h-full">
      {seasons.map((season) => (
        <SeasonModal key={season.id} season={season} showId={id as string} /> //todo fix layout
      ))}
    </section>
  )
}

export default SeasonsSection
