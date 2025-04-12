import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onFilterChange: ({ genre, location }: { genre: string | null, location: string | null }) => void;
  genres: string[];
  locations: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  genres,
  locations,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  useEffect(() => {
    onFilterChange({
      genre: selectedGenre === 'All Genres' ? null : selectedGenre,
      location: selectedLocation === 'All Locations' ? null : selectedLocation,
    });
  }, [selectedGenre, selectedLocation, onFilterChange]);

  return (
    <div className="flex space-x-4 items-center p-4">
      <div className="flex flex-col">
        <Label htmlFor="genre">Genre</Label>
        <Select
          id="genre"
          onValueChange={setSelectedGenre}
          defaultValue="All Genres"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Genres">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="location">Location</Label>
        <Select
          id="location"
          onValueChange={setSelectedLocation}
          defaultValue="All Locations"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="All Locations">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
