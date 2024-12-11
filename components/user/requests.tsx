"use client"

import { Button } from '@/components/ui/button'
import { ProfileData } from '@/lib/types/user'
import axios from 'axios'
import { Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Requests = ({ userData }: { userData: ProfileData }) => {
 

  return (
    <div className="flex-[.5] p-5 border-t overflow-hidden">
      <p className="font-bold text-xl mb-5 text-center">Requests</p>
      {userData.requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <p>No requests</p>
        </div>
      ) : (
        
      )}

    </div>
  )
}

export default Requests