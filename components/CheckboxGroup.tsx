'use client'

import React, { useState, useEffect } from 'react';

interface CheckboxGroupProps {
  items: { id?: number; provider_id?: number; name?: string; provider_name?: string }[];
  onChange: (selectedItems: { id: number; provider_id: number; name: string; provider_name: string }[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ items, onChange }) => {
  const [selectedItems, setSelectedItems] = useState<{ id: number; provider_id: number; name: string; provider_name: string }[]>([]);


  const handleCheckboxChange = (item: { id?: number; provider_id?: number; name?: string, provider_name?: string }) => {
    const itemId = item.id ?? item.provider_id;
    const itemName = item.name ?? item.provider_name;
    setSelectedItems((prevItems: any) => {
      const isItemSelected = prevItems.some((selectedItem: any) => (selectedItem.id ?? selectedItem.provider_id) === itemId);
      if (isItemSelected) {
        return prevItems.filter((selectedItem: any) => (selectedItem.id ?? selectedItem.provider_id) !== itemId);
      } else {
        return [...prevItems, { id: itemId, provider_id: itemId, name: itemName, provider_name: itemName }];
      }
    });
  };

  const isChecked = (item: { id?: number, provider_id?: number, name?: string, provider_name?: string }) => {
    const itemId = item.id ?? item.provider_id;
    return selectedItems.some((selectedItem: any) => selectedItem.id === itemId);
  }

  useEffect(() => {
    onChange(selectedItems);
  }, [selectedItems]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 ">
      {items.map((item) => (
        <div
          onClick={() => handleCheckboxChange(item)}
          key={item.id ?? item.provider_id}
          className={`flex items-center border rounded-xl border-white/30 px-4 py-1  text-sm cursor-pointer active:scale-95 duration-150
             ${isChecked(item) ? "bg-white text-black" : "bg-black text-white"}`}
        >
          <span className="ml-2 ">{item.name ?? item.provider_name}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
