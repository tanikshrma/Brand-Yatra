import {
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown } from 'lucide-react';

export interface BrandSelectProps {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  onChange: (nextValue: string) => void;
  required?: boolean;
  hasError?: boolean;
  describedBy?: string;
  variant?: 'box' | 'underline';
  showIndex?: boolean;
  clearLabel?: string;
}

interface MenuCoords {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  maxHeight: number;
}

export function BrandSelect({
  id,
  name,
  value,
  options,
  placeholder,
  onChange,
  required = false,
  hasError = false,
  describedBy,
  variant = 'box',
  showIndex = false,
  clearLabel = 'No preference (Optional)',
}: BrandSelectProps) {
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [coords, setCoords] = useState<MenuCoords | null>(null);

  const includeClearRow = !required;
  const allItems = includeClearRow ? ['', ...options] : [...options];

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const spaceBelow = viewportHeight - rect.bottom - 12;
    const spaceAbove = rect.top - 12;
    const openUpward = spaceBelow < 220 && spaceAbove > spaceBelow;

    const maxHeight = Math.max(
      150,
      Math.min(284, (openUpward ? spaceAbove : spaceBelow) - 4)
    );

    const menuWidth =
      viewportWidth < 640
        ? Math.max(rect.width, Math.min(viewportWidth - 24, 280))
        : rect.width;
    const safeLeft = Math.max(
      12,
      Math.min(rect.left, viewportWidth - menuWidth - 12)
    );

    if (openUpward) {
      setCoords({
        bottom: viewportHeight - rect.top + 4,
        left: safeLeft,
        width: menuWidth,
        maxHeight,
      });
    } else {
      setCoords({
        top: rect.bottom + 4,
        left: safeLeft,
        width: menuWidth,
        maxHeight,
      });
    }
  }, []);

  const openMenu = useCallback(() => {
    const currentIdx = allItems.indexOf(value);
    setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
    updatePosition();
    setIsOpen(true);
  }, [allItems, updatePosition, value]);

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleViewportChange = () => updatePosition();
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [isOpen, updatePosition]);

  /* Scroll active option into view inside listbox */
  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    const el = optionRefs.current[highlightedIndex];
    el?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, highlightedIndex]);

  /* Outside pointerdown & capture-phase Escape handling (closes menu before parent modal) */
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu(false);
    };

    const handleCaptureKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeMenu(true);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleCaptureKeyDown, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleCaptureKeyDown, true);
    };
  }, [isOpen, closeMenu]);

  const handleSelectValue = (nextVal: string) => {
    onChange(nextVal);
    closeMenu(true);
  };

  const handleTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        openMenu();
      } else {
        setHighlightedIndex((prev) => (prev + 1) % allItems.length);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        openMenu();
      } else {
        setHighlightedIndex(
          (prev) => (prev - 1 + allItems.length) % allItems.length
        );
      }
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isOpen) {
        openMenu();
      } else if (highlightedIndex >= 0 && highlightedIndex < allItems.length) {
        handleSelectValue(allItems[highlightedIndex]);
      }
      return;
    }

    if (e.key === 'Tab' && isOpen) {
      closeMenu(false);
    }
  };

  const triggerClasses =
    variant === 'underline'
      ? `w-full h-[36px] sm:h-[40px] px-0 rounded-none bg-transparent border-0 border-b text-left text-[16px] sm:text-[14.5px] flex items-center justify-between gap-3 outline-none transition-colors cursor-pointer ${
          value ? 'text-white' : 'text-white/32'
        } ${
          isOpen || hasError
            ? 'border-[#F8C311]'
            : 'border-[#2B2B2B] hover:border-white/35 focus-visible:border-[#F8C311]'
        }`
      : `w-full h-[54px] px-4 rounded-none bg-[#0D0D0D] border text-left text-[15px] flex items-center justify-between gap-3 outline-none transition-colors cursor-pointer ${
          value ? 'text-white' : 'text-white/35'
        } ${
          isOpen || hasError
            ? 'border-[#F8C311]'
            : 'border-[#2B2B2B] hover:border-white/30 focus-visible:border-[#F8C311]'
        }`;

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        data-cursor="link"
        onClick={() => (isOpen ? closeMenu(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className={triggerClasses}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen
              ? 'rotate-180 text-[#F8C311]'
              : 'text-white/50'
          }`}
        />
      </button>

      {isOpen &&
        coords &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            id={listboxId}
            role="listbox"
            data-lenis-prevent
            data-cursor-theme="dark"
            style={{
              position: 'fixed',
              top: coords.top,
              bottom: coords.bottom,
              left: coords.left,
              width: coords.width,
              maxHeight: coords.maxHeight,
            }}
            className="z-[105] overflow-y-auto by-dropdown-scroll rounded-none bg-[#111111] border border-[#2E2E2E] border-t-2 border-t-[#F8C311] shadow-[0_28px_70px_rgba(0,0,0,0.92)]"
          >
            {allItems.map((item, idx) => {
              const isClearItem = includeClearRow && idx === 0 && item === '';
              const isSelected = value === item;
              const isHighlighted = highlightedIndex === idx;
              const displayIndex = showIndex
                ? String(includeClearRow ? idx : idx + 1).padStart(2, '0')
                : null;

              return (
                <button
                  key={isClearItem ? '__clear__' : item}
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-cursor="link"
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => handleSelectValue(item)}
                  className={`relative w-full px-4 py-2.5 text-left text-[14px] leading-snug flex items-center justify-between gap-3 rounded-none border-b border-white/[0.06] last:border-b-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F8C311]/[0.12] text-[#F8C311] font-medium'
                      : isHighlighted
                      ? 'bg-[#1C1C1C] text-[#F8C311]'
                      : isClearItem
                      ? 'bg-[#111111] text-[#8E8E8E]'
                      : 'bg-[#111111] text-white/90'
                  }`}
                >
                  {/* Active Left Accent Indicator */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 bottom-0 w-[2px] transition-opacity ${
                      isSelected || isHighlighted
                        ? 'bg-[#F8C311] opacity-100'
                        : 'opacity-0'
                    }`}
                  />

                  <span className="flex items-center gap-2.5 min-w-0 truncate">
                    {!isClearItem && displayIndex && (
                      <span
                        className={`text-[11px] font-mono tabular-nums tracking-[0.06em] shrink-0 ${
                          isSelected || isHighlighted
                            ? 'text-[#F8C311]'
                            : 'text-white/35'
                        }`}
                      >
                        {displayIndex}
                      </span>
                    )}
                    <span className="truncate">
                      {isClearItem ? clearLabel : item}
                    </span>
                  </span>

                  {isSelected && !isClearItem && (
                    <Check
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-[#F8C311] shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}

export interface BrandCheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hasError?: boolean;
  describedBy?: string;
  children: ReactNode;
  compact?: boolean;
}

export function BrandCheckbox({
  id,
  name,
  checked,
  onChange,
  hasError = false,
  describedBy,
  children,
  compact = false,
}: BrandCheckboxProps) {
  return (
    <label
      htmlFor={id}
      data-cursor="link"
      className="group inline-flex items-start gap-3 cursor-pointer select-none"
    >
      <span className="relative inline-flex shrink-0 mt-0.5">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`${
            compact ? 'w-[16px] h-[16px]' : 'w-[18px] h-[18px]'
          } rounded-none border flex items-center justify-center transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#F8C311] ${
            checked
              ? 'bg-[#F8C311] border-[#F8C311] text-[#0D0D0D]'
              : hasError
              ? 'bg-[#0D0D0D] border-[#F8C311] group-hover:border-[#F8C311]'
              : 'bg-[#0D0D0D] border-white/30 group-hover:border-[#F8C311]'
          }`}
        >
          {checked && (
            <Check className="w-3 h-3 stroke-[3] text-[#0D0D0D]" />
          )}
        </span>
      </span>

      <span
        className={`${
          compact
            ? 'text-[12.5px] leading-[1.48]'
            : 'text-[14px] leading-[1.58]'
        } text-[#A8A8A8] group-hover:text-white/85 transition-colors`}
      >
        {children}
      </span>
    </label>
  );
}
