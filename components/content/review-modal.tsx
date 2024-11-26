"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import useReview from "@/lib/hooks/use-review"
import { useEffect, useState } from "react"


const ReviewModal = ({ userData, contentData, disabled }: { userData: any, contentData: any, disabled: boolean }) => {
  const [open, setOpen] = useState(false);
  const { review, handleReview } = useReview(userData, contentData, open);
  const [text, setText] = useState(review ? review : "");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= 400) {
      setText(newText);
    }
  };

  useEffect(() => {
    setText(review)
  }, [open])


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" className="px-5" disabled={disabled}>
          {review ? "View review" : "Add a review"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Your review</DialogTitle>
          </div>
          <DialogDescription />
        </DialogHeader>
        <span className="text-sm text-foreground">{text.length}/400</span>

        <Textarea
          defaultValue={text}
          onChange={handleTextChange}
          maxLength={400}
        />
        <Separator />
        <DialogFooter className="sm:justify-start items-center">
          <DialogClose asChild>
            <Button variant={"secondary"} onClick={() => handleReview(text)} className="w-full">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal
