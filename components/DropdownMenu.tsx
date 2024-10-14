"use client"
import React, { useState } from 'react';

interface DropdownMenuProps {
  title: string;
  items: { id: number; name: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-200/20  "
          onClick={toggleDropdown}
        >
          {selectedItem || title}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 h-56 overflow-y-auto rounded-md bg-black text-white text-[14px]">
          <div className="flex flex-col " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item) => (
              <div
                key={item.id}
                className="px-4 py-2 text-sm hover:bg-gray-100/20"
                role="menuitem"
                onClick={() => handleItemClick(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
