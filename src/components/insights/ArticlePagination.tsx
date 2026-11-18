import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ArticlePagination({
  currentPage,
  totalPages,
  onPageChange,
}: ArticlePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <nav
      aria-label="Insights article pagination"
      className="mt-16 lg:mt-20 pt-8 border-t border-[#0D0D0D]/12 flex flex-wrap items-center justify-between gap-4"
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`min-h-[44px] px-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase border whitespace-nowrap shrink-0 ${
          currentPage <= 1
            ? 'border-[#0D0D0D]/10 text-[#0D0D0D]/30 cursor-not-allowed'
            : 'border-[#0D0D0D]/20 text-[#0D0D0D] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D0D0D]'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => {
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Page ${page}`}
              onClick={() => onPageChange(page)}
              className={`min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center text-xs font-semibold tabular-nums border cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D0D0D] ${
                isCurrent
                  ? 'bg-[#0D0D0D] text-[#F8C311] border-[#0D0D0D]'
                  : 'bg-transparent text-[#0D0D0D]/75 border-[#0D0D0D]/15'
              }`}
            >
              {String(page).padStart(2, '0')}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`min-h-[44px] px-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase border whitespace-nowrap shrink-0 ${
          currentPage >= totalPages
            ? 'border-[#0D0D0D]/10 text-[#0D0D0D]/30 cursor-not-allowed'
            : 'border-[#0D0D0D]/20 text-[#0D0D0D] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D0D0D]'
        }`}
      >
        <span>Next</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
}
