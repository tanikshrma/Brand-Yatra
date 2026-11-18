import { PORTFOLIO_FILTERS, PortfolioFilterCategory } from '../../data/projects';

interface ProjectFiltersProps {
  activeCategory: PortfolioFilterCategory;
  onSelectCategory: (category: PortfolioFilterCategory) => void;
  projectCounts: Record<PortfolioFilterCategory, number>;
}

export function ProjectFilters({
  activeCategory,
  onSelectCategory,
  projectCounts,
}: ProjectFiltersProps) {
  return (
    <div
      id="portfolio-projects"
      data-cursor-theme="dark"
      className="bg-[#0D0D0D] text-white pt-4 pb-10 lg:pb-14 scroll-mt-24"
    >
      <div className="by-container">
        <div className="border-b border-white/[0.1] flex items-center justify-between gap-6 overflow-x-auto no-scrollbar">
          <div
            role="tablist"
            aria-label="Filter portfolio projects by discipline"
            className="flex items-center gap-6 sm:gap-8 lg:gap-10 min-w-max"
          >
            {PORTFOLIO_FILTERS.map((category, index) => {
              const isActive = activeCategory === category;
              const count = projectCounts[category];

              return (
                <div key={category} className="flex items-center gap-6 sm:gap-8 lg:gap-10">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectCategory(category)}
                    className={`group relative min-h-[46px] py-3 inline-flex items-baseline gap-2 text-[11.5px] sm:text-[12px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8C311] ${
                      isActive ? 'text-[#F8C311]' : 'text-[#A8A8A8] hover:text-white'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] tabular-nums transition-colors duration-200 ${
                        isActive
                          ? 'text-[#F8C311]/85'
                          : 'text-white/35 group-hover:text-white/60'
                      }`}
                    >
                      ({String(count).padStart(2, '0')})
                    </span>

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -bottom-[1px] left-0 h-[1.5px] bg-[#F8C311] transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full group-hover:bg-white/35'
                      }`}
                    />
                  </button>

                  {index < PORTFOLIO_FILTERS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden xl:inline text-white/15 text-xs select-none"
                    >
                      /
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
