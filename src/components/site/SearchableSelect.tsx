import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  hasError?: boolean;
  id?: string;
}

export const SearchableSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  hasError = false,
  id,
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click / touch
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // Focus search when dropdown opens
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  const triggerClass = cn(
    "w-full h-12 px-4 rounded-xl bg-white border shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between gap-2 cursor-pointer text-sm font-normal transition-all outline-none select-none",
    hasError
      ? "border-red-400 focus:border-red-500 ring-4 ring-red-500/10 bg-red-50/40"
      : open
      ? "border-primary ring-4 ring-primary/10"
      : "border-border/60 hover:border-primary/30"
  );

  return (
    <div ref={containerRef} className="relative w-full" id={id}>
      {/* Trigger */}
      <button
        type="button"
        className={triggerClass}
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={cn(
          "truncate flex-1 text-left",
          value ? "text-foreground" : "text-muted-foreground/60"
        )}>
          {value || placeholder}
        </span>
        <span className="flex items-center gap-1.5 shrink-0">
          {value && (
            <span
              role="button"
              aria-label="Clear selection"
              className="flex items-center justify-center text-muted-foreground/60 hover:text-red-500 transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange("");
                setOpen(false);
                setQuery("");
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange("");
                setOpen(false);
                setQuery("");
              }}
            >
              <X className="size-4" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-border/60 bg-white shadow-xl overflow-hidden">
          {/* Search bar */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/40 bg-slate-50/80">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Options list */}
          <ul
            role="listbox"
            className="max-h-52 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted-foreground text-center">
                No results found
              </li>
            ) : (
              filtered.map((opt) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={value === opt}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors",
                    value === opt
                      ? "bg-primary/8 text-primary font-semibold"
                      : "text-foreground hover:bg-slate-50 active:bg-slate-100"
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  {opt}
                  {value === opt && <Check className="size-3.5 text-primary shrink-0" />}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
