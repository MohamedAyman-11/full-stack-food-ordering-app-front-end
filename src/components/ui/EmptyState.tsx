import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const EmptyState = ({ title, description, icon, action, className }: EmptyStateProps) => {
  return (
    <div
      className={`
        flex
        min-h-49.5
        w-full
        flex-col
        items-center
        justify-center
        gap-2
        text-center
        ${className ?? ''}
      `}
    >
      {icon && (
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-accent sm:text-xl">{title}</h3>

      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
