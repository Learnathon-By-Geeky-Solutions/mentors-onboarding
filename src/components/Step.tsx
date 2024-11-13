import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

interface StepProps {
  step: number;
  title: string;
  description: string;
  active?: boolean;
  completed?: boolean;
}

export function Step({
  step,
  title,
  description,
  active,
  completed,
}: StepProps) {
  return (
    <div className={cn('flex gap-4', !active && 'opacity-50')}>
      <div className="flex-shrink-0">
        <div
          className={cn(
            'w-8 h-8 rounded-full border-2 flex items-center justify-center',
            completed
              ? 'bg-[#1890BA] border-[#1890BA] text-white'
              : active
              ? 'border-[#1890BA] text-[#1890BA]'
              : 'border-gray-300 text-gray-300'
          )}
        >
          {completed ? <Check className="w-5 h-5" /> : step}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-[#1B3765]">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}