import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  className,
  disabled,
  loading,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' &&
          'bg-[#1890BA] text-white hover:bg-[#1890BA]/90',
        variant === 'secondary' &&
          'bg-[#1B3765] text-white hover:bg-[#1B3765]/90',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}