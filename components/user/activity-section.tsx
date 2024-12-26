import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import Modal from '@/components/user/modal'
import PeopleModal from '@/components/user/people-modal'
import RatingModal from '@/components/user/rating-modal'
import ReviewModal from '@/components/user/review-modal'
import WatchlistModal from '@/components/user/watchlist-modal'
import { movieCount, tvCount } from '@/lib/functions'
import React from 'react'

const ActivitySection = ({ id, userData }: { id: string, userData: any }) => {
  return (
    <section className='flex flex-col gap-1'>
      <p className='text-xl font-bold'>Activity</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <p>{`Watched Movies (${movieCount(userData.watched)})`}</p>
            </TableCell>
            <TableCell>
              <Modal key={"modal-1"} id={id} userData={userData} modal="movie" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <p>{`Watched Tv Shows (${tvCount(userData.watched)})`}</p>
            </TableCell>
            <TableCell>

              <Modal key={"modal-2"} id={id} userData={userData} modal="tv" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <p>{`Rated Content (${userData.rated})`}</p>
            </TableCell>
            <TableCell>
              <RatingModal key={"modal-3"} id={id} userData={userData} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <p>{`Reviewed Content (${userData.reviewed})`}</p>
            </TableCell>

            <TableCell>
              <ReviewModal key={"modal-4"} id={id} userData={userData} />
            </TableCell>
          </TableRow>

          <TableRow>

            <TableCell>
              <p>{`Following (${userData.following.length})`}</p>
            </TableCell>
            <TableCell>

              <PeopleModal key={"modal-5"} id={id} userData={userData} />
            </TableCell>
          </TableRow>

          <TableRow>

            <TableCell>
              <p>{`Watchlist (${userData.watchlist.length})`}</p>
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


