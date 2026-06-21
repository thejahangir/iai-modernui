import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  iconUrl?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  icon,
  className
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click and scroll
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // If clicking inside the portal, don't close
      const dropdownMenu = document.getElementById("searchable-select-dropdown");
      if (dropdownMenu && dropdownMenu.contains(event.target as Node)) {
        return;
      }
      
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    const handleScroll = (event: Event) => {
      // Don't close if scrolling inside the dropdown itself
      const dropdownMenu = document.getElementById("searchable-select-dropdown");
      if (dropdownMenu && dropdownMenu.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll, true); // true for capture phase to catch inner scrolls
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Update position when opened or resized
  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const updatePosition = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setDropdownStyle({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width
          });
        }
      };
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [isOpen]);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-full flex items-center justify-between bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium transition-all cursor-pointer hover:border-primary/40 text-foreground",
          isOpen ? "ring-2 ring-primary/20 border-primary" : "",
          icon ? "pl-10 pr-4" : "px-4"
        )}
      >
        {icon && (
          <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
            {icon}
          </div>
        )}
        <div className={cn("flex items-center gap-2 truncate", !selectedOption && "text-muted-foreground")}>
          {selectedOption?.iconUrl && (
            <img src={selectedOption.iconUrl} alt="" className="w-5 h-auto rounded-[2px] shadow-sm shrink-0" />
          )}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform ml-2 shrink-0", isOpen && "rotate-180")} />
      </div>

      {/* Dropdown Menu (Portaled) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="searchable-select-dropdown"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              style={dropdownStyle}
              className="absolute z-[1000] mt-2 bg-white border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Search Input */}
              <div className="p-2 border-b border-border/50 shrink-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2 bg-secondary/30 rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                  />
                </div>
              </div>

              {/* Options List */}
              <div className="max-h-60 overflow-y-auto p-1 flex-1">
                {/* Clear Selection Option */}
                {value && (
                  <>
                    <div
                      onClick={() => {
                        onChange("");
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors text-muted-foreground hover:bg-secondary/80 italic"
                    >
                      <span className="truncate">{placeholder}</span>
                    </div>
                    <div className="h-px bg-border/50 mx-2 my-1" />
                  </>
                )}

                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors",
                        value === option.value 
                          ? "bg-primary/10 text-primary font-bold" 
                          : "text-foreground hover:bg-secondary/80"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {option.iconUrl && (
                          <img src={option.iconUrl} alt="" className="w-5 h-auto rounded-[2px] shadow-sm shrink-0" />
                        )}
                        <span className="truncate">{option.label}</span>
                      </div>
                      {value === option.value && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
