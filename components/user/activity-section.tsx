import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import Modal from '@/components/user/modal'
import PeopleModal from '@/components/user/people-modal'
import RatingModal from '@/components/user/rating-modal'
import ReviewModal from '@/components/user/review-modal'
import WatchlistModal from '@/components/user/watchlist-modal'
import { movieCount, tvCount } from '@/lib/functions'
import { Film, ListIcon, PenLineIcon, Star, Tv, User } from 'lucide-react'
import React from 'react'

const ActivitySection = ({ id, userData }: { id: string, userData: any }) => {
  return (
    <section className='flex flex-col gap-5 basis-1/3'>
      <p className='text-xl font-bold'>Activity</p>
      <Table className='text-base'>
        <TableBody>
          <TableRow>
            <TableCell className='flex items-center gap-5'>
              <Film />
              <div className='flex flex-col'>
                <p>{`Watched Movies`}</p>
                <p className='text-muted-foreground text-sm'>{`${movieCount(userData.watched)} elements`}</p>
              </div>
            </TableCell>
            <TableCell>
              <Modal key={"modal-1"} id={id} userData={userData} modal="movie" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className='flex items-center gap-5'>
              <Tv />
              <div className='flex flex-col'>
                <p>{`Watched Tv Shows`}</p>
                <p className='text-muted-foreground text-sm'>{`${tvCount(userData.watched)} elements`}</p>
              </div>
            </TableCell>
            <TableCell>
              <Modal key={"modal-2"} id={id} userData={userData} modal="tv" />
            </TableCell>
          </TableRow>

          <TableRow>

            <TableCell className='flex items-center gap-5'>
              <Star />
              <div className='flex flex-col'>
                <p>{`Ratings`}</p>
                <p className='text-muted-foreground text-sm'>{`${userData.rated} elements`}</p>
              </div>
            </TableCell>
            <TableCell>
              <RatingModal key={"modal-3"} id={id} userData={userData} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className='flex items-center gap-5'>
              <PenLineIcon />
              <div className='flex flex-col'>
                <p>{`Reviews`}</p>
                <p className='text-muted-foreground text-sm'>{`${userData.reviewed} elements`}</p>
              </div>
            </TableCell>

            <TableCell>
              <ReviewModal key={"modal-4"} id={id} userData={userData} />
            </TableCell>
          </TableRow>

          <TableRow>

            <TableCell className='flex items-center gap-5'>
              <User />
              <div className='flex flex-col'>
                <p>{`Following`}</p>
                <p className='text-muted-foreground text-sm'>{`${userData.following.length} elements`}</p>
              </div>
            </TableCell>
            <TableCell>

              <PeopleModal key={"modal-5"} id={id} userData={userData} />
            </TableCell>
          </TableRow>

          <TableRow>

            <TableCell className='flex items-center gap-5'>
              <ListIcon />
              <div className='flex flex-col'>
                <p>{`Watchlist`}</p>
                <p className='text-muted-foreground text-sm'>{`${userData.watchlist.length} elements`}</p>
              </div>
            </TableCell>
            <TableCell>
              <WatchlistModal key={"modal-6"} id={id} userData={userData} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section >
  )
}

export default ActivitySection


