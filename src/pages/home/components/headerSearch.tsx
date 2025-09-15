import { useState, useRef, useEffect } from "react";
import './headerSearchStyle.css'
import { Icons } from "@/icons";

interface Props {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function HeaderSearch({ onSearch, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

    const clearInput = () => {
      setOpen((prev) => !prev)
      setValue('')
    }

  // Input ochilganda fokuslash
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Tashqariga bosilganda yopish
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        inputRef.current &&
        !inputRef.current.parentElement?.contains(e.target as Node)
      ) {
        if (!value.trim()) {
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, value]);

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <div className="header-search">
      <button
        className={`header-search-btn ${open ? 'hidden' : 'block'} `}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icons.search />
      </button>

      {open && (
        <div className="header-search-input">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onSearch(e.target.value); // 🔹 live search
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // 🔹 Enter bosilganda
              }
            }}
            placeholder={placeholder}
          />
          <button className="header-search-clear" type="button" onClick={clearInput}>
          <Icons.close />
          </button>
        </div>
      )}
    </div>
  );
}
