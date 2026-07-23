import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-screen px-10" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-6 w-full
         px-8 py-5 rounded-2xl bg-gray-200 !text-[18px] cursor-pointer hover:bg-gray-300 transition">
        <span className="truncate">{value || label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}>
          <ChevronDown className="size-12 shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-3 w-full bg-white rounded-2xl shadow-xl overflow-hidden z-50">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="px-8 py-6 !text-[18px] hover:bg-gray-100 cursor-pointer transition">
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
