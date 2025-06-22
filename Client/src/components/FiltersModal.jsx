import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { FilterSidebar } from './FilterSidebar';

export const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filter developers by skills, experience, and more.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClearFilters={onClearFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};