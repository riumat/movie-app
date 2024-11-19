"use client"
import DatePickerWithRange from '@/components/content/range-date-picker';
import React, { useEffect, useState } from 'react';

interface YearInputProps {
  range: {
    start: string;
    end: string;
  }
  onChange: (startYear: string, endYear: string) => void;
}

const YearRangeInput: React.FC<YearInputProps> = ({ range, onChange }) => {
  const currentYear = new Date().getFullYear().toString();
  const [startYear, setStartYear] = useState<string>(range.start);
  const [endYear, setEndYear] = useState<string>(range.end);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>, setYear: React.Dispatch<React.SetStateAction<string>>) => {
    const inputYear = e.target.value;
    if (inputYear === "" || /^\d+$/.test(inputYear)) {
      setYear(inputYear);
    }
  };

  useEffect(() => {
    const now = new Date();
    if (startYear.length === 4 && endYear.length === 4) {
      if (Number(startYear) > Number(endYear)) {
        setHasError(true);
      } else {
        setHasError(false);
        onChange(`${startYear}-01-01`, `${endYear}-${now.getMonth() + 1 < 10 ? "0" + now.getMonth() + 1 : now.getMonth() + 1}-${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}`);
      }
    }
  }, [startYear, endYear])

  return (
    <div className="flex space-x-4">
      {/*  <div className='py-2'>
        <input
          type="text"
          id="startYear"
          name="startYear"
          value={startYear}
          onChange={(e) => handleYearChange(e, setStartYear)}
          placeholder="Start "
          className={` w-full rounded-xl bg-background text-foreground border px-4 py-2 text-[14px] placeholder:text-border focus:outline-none
            ${hasError ? "border-red-500 focus:border-red-500" : "border-foreground/30 focus:border-foreground/30"}`}
          maxLength={4}
        />
      </div>
      <div className='py-2'>
        <input
          type="text"
          id="endYear"
          name="endYear"
          value={endYear}
          onChange={(e) => handleYearChange(e, setEndYear)}
          placeholder="End "
          className={` w-full rounded-xl bg-background text-foreground border px-4 py-2 text-[14px] ${hasError ? "border-red-500 " : "border-foreground/30"}   placeholder:text-border focus:outline-none `}
          maxLength={4}
        />
      </div> */}

      <DatePickerWithRange />
    </div>
  );
};

export default YearRangeInput;

