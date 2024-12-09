/* import { useState } from 'react'
import axios from 'axios'
import { MovieData } from '@/lib/types/movie'
import { TvData } from '@/lib/types/tv'

export const useContentFetch = (initialContents: MovieData[] | TvData[]) => {
  const [items, setItems] = useState<MovieData[] | TvData[]>(initialContents)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchContent = async (params:any) => {
    setIsLoading(true)
    try {
      const res = await axios.get('/api/filtered', { params })
      setItems(res.data.results)
      setTotalPages(res.data.total_pages)
      return res.data.page
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { items, totalPages, isLoading, fetchContent }
}
 */