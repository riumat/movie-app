import { Slider } from '@/components/ui/slider';
import React from 'react'

const RuntimeSlider = ({ onChange }: { onChange: (runtimeRange: number[]) => void }) => {
const [range, setRange] = React.useState<number[]>([0, 360])
  const handleOnChange = (range: number[]) => {
    setRange(range)
    onChange(range)
  }
  return (
    <div className='flex flex-col gap-3'>
      <Slider
        onValueChange={handleOnChange}
        defaultValue={[0, 360]}
        min={0}
        max={360}
        step={10}
        minStepsBetweenThumbs={1}
      />
      <div>
        <span>Runtime: {range[0]} - {range[1]} minutes</span>
      </div>
    </div>

  )
}

export default RuntimeSlider