import { ListCollapse } from 'lucide-react'

const ModalOpenerButton = () => {
  return (
    <div className=" w-24 px-2 py-1 flex gap-2 items-center justify-center text-sm border rounded-lg hover:bg-muted cursor-pointer" >
      More...
      <ListCollapse size={15} />
    </div >
  )
}

export default ModalOpenerButton