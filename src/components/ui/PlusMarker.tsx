import { cn } from '@/lib/utils';

export const PlusMarker = ({
  className,
  colorClassName = 'text-black/30',
}: {
  className?: string;
  colorClassName?: string;
}) => (
  <div className={cn('absolute w-3 h-3', className, colorClassName)}>
    <div className="w-full h-px bg-current absolute top-1/2 -translate-y-1/2" />
    <div className="h-full w-px bg-current absolute left-1/2 -translate-x-1/2" />
  </div>
);
