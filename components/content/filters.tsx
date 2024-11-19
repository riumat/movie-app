'use client'

import { FilterItem } from '@/lib/types/filter';
import React, { useState, useEffect } from 'react';

interface CheckboxGroupProps {
  items: FilterItem[];
  selectedItems: number[];
  onChange: (item: number) => void;
}

const Filters: React.FC<CheckboxGroupProps> = ({ items, onChange, selectedItems }) => {
  
  const handleCheckboxChange = (item: FilterItem) => {
    onChange(item.id)
  };

  const isChecked = (item: FilterItem) => {
    return selectedItems.some(
      (selected: number) => (selected) === item.id
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 ">
      {items.map((item) => (
        <div
          onClick={() => handleCheckboxChange(item)}
          key={item.id}
          className={`flex items-center border rounded-xl border-foreground/30 px-4 py-1  text-sm cursor-pointer active:scale-95 duration-150
             ${isChecked(item) ? "bg-foreground text-background" : "bg-background text-foreground"}`}
        >
          <span className="ml-2 ">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Filters;
