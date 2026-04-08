import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { usCityStateSuggestions, usStates } from "@/data/usLocations";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const locations = [...usCityStateSuggestions, ...usStates];

const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = "City, state, or zip",
  className,
}: LocationAutocompleteProps) => {
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();

    if (!query) return locations.slice(0, 12);

    const startsWith = locations.filter(item => item.toLowerCase().startsWith(query));
    const contains = locations.filter(item => !startsWith.includes(item) && item.toLowerCase().includes(query));

    return [...startsWith, ...contains].slice(0, 12);
  }, [value]);

  return (
    <div className="relative flex-1">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120);
        }}
        className={className}
      />

      {open && suggestions.length > 0 && (
        <div className="absolute z-40 mt-1 w-full max-h-72 overflow-y-auto rounded-md border bg-background shadow-lg">
          {suggestions.map(item => (
            <button
              key={item}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(item);
                setOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
