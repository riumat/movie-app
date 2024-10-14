import React from 'react';

interface SelectedFiltersProps {
  filters: {[key: string]: string[]};
  onRemove: (category: string, value: string) => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({ filters, onRemove }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Selected Filters</h2>
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([category, values]) =>
          values.map(value => (
            <div key={`${category}-${value}`} className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center">
              <span>{value}</span>
              <button 
                onClick={() => onRemove(category, value)}
                className="ml-2 focus:outline-none"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectedFilters;
