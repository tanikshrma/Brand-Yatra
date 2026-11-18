import { Search, X } from 'lucide-react';
import {
  ARTICLE_FILTER_CATEGORIES,
  ArticleFilterCategory,
} from '../../data/articles';

interface ArticleFiltersProps {
  activeCategory: ArticleFilterCategory;
  searchQuery: string;
  onSelectCategory: (category: ArticleFilterCategory) => void;
  onSearchChange: (value: string) => void;
}

export function ArticleFilters({
  activeCategory,
  searchQuery,
  onSelectCategory,
  onSearchChange,
}: ArticleFiltersProps) {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="border-y border-[#0D0D0D]/12 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
        {/* Horizontally Scrollable Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter insights by category"
          className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar"
        >
          {ARTICLE_FILTER_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category)}
                className={`group relative min-h-[44px] py-2 inline-flex items-center text-[11.5px] sm:text-[12px] font-semibold tracking-[0.13em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D0D0D] ${
                  isActive
                    ? 'text-[#0D0D0D]'
                    : 'text-[#0D0D0D]/50 hover:text-[#0D0D0D]'
                }`}
              >
                <span>{category}</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[#F8C311] transition-all duration-300 ${
                    isActive
                      ? 'w-full'
                      : 'w-0 group-hover:w-full group-hover:bg-[#0D0D0D]/25'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Minimal Editorial Search Input */}
        <div className="group relative w-full lg:w-[290px] shrink-0">
          <label htmlFor="by-insights-search" className="sr-only">
            Search insights by title, category or summary
          </label>
          <Search
            aria-hidden="true"
            className="w-4 h-4 text-[#0D0D0D]/45 group-focus-within:text-[#0D0D0D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
          />
          <input
            id="by-insights-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="w-full min-h-[42px] pl-9 pr-9 py-2 bg-white border border-[#0D0D0D]/16 hover:border-[#0D0D0D]/40 focus:border-[#0D0D0D] focus:shadow-[inset_0_-2px_0_0_#F8C311] rounded-none text-[14px] text-[#0D0D0D] placeholder:text-[#0D0D0D]/45 outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search query"
              onClick={() => onSearchChange('')}
              className="w-7 h-7 rounded-none flex items-center justify-center text-[#0D0D0D]/55 hover:text-[#0D0D0D] hover:bg-[#F8C311]/20 absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#0D0D0D]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
