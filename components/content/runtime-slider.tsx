import { Slider } from '@/components/ui/slider';
import React, { useEffect, useState } from 'react'

const RuntimeSlider = ({ onChange, selectedRuntime }: { onChange: (runtimeRange: number[]) => void, selectedRuntime: number[] }) => {
  const [range, setRange] = useState(selectedRuntime)
  const handleOnChange = (range: number[]) => {
    setRange(range)
    onChange(range)
  }

  useEffect(() => {
    setRange(selectedRuntime)
  }, [selectedRuntime])

  return (
    <div className='flex flex-col gap-3 items-center'>
      <Slider
        onValueChange={handleOnChange}
        value={selectedRuntime}
        min={0}
        max={300}
        step={10}
        minStepsBetweenThumbs={1}
      />
      <div>
        <span className='text-sm'>{range[0]} - {range[1]} minutes</span>
      </div>
    </div>

  )
}

export default RuntimeSlider