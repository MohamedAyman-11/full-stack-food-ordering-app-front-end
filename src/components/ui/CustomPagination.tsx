import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

const getPages = (page: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (page >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', page - 1, page, page + 1, '...', totalPages];
};

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CustomPagination = ({ page, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous */}
        {page > 1 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page - 1)}
            className="
            cursor-pointer
              size-9 rounded-lg
              border-border/70
              bg-background
              text-muted-foreground
              shadow-sm
              transition-all duration-200
              hover:border-primary/40
              hover:bg-primary/5
              hover:text-primary
              active:scale-95
            "
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>
        )}

        {/* Pages */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {pages.map((item, index) =>
            item === '...' ? (
              <span
                key={`ellipsis-${index}`}
                className="
                  flex size-9 items-center justify-center
                  text-sm font-medium
                  text-muted-foreground
                  select-none
                "
              >
                •••
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                variant="outline"
                onClick={() => onPageChange(+item)}
                className={`
                  cursor-pointer
                  size-9 rounded-lg
                  border-border/70
                  text-sm font-medium
                  shadow-sm
                  transition-all duration-200
                  active:scale-95

                  ${
                    item === page
                      ? `
                        border-primary
                        bg-primary
                        text-primary-foreground
                        shadow-sm
                        hover:bg-primary/90
                        hover:text-primary-foreground
                      `
                      : `
                        bg-background
                        text-muted-foreground
                        hover:border-primary/40
                        hover:bg-primary/5
                        hover:text-primary
                      `
                  }
                `}
              >
                {item}
              </Button>
            ),
          )}
        </div>
        {/* Next */}
        {page < totalPages && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page + 1)}
            className="
            cursor-pointer
              size-9 rounded-lg
              border-border/70
              bg-background
              text-muted-foreground
              shadow-sm
              transition-all duration-200
              hover:border-primary/40
              hover:bg-primary/5
              hover:text-primary
              active:scale-95
            "
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default CustomPagination;
