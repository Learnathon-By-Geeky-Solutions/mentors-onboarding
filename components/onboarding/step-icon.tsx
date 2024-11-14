'use client';

import { 
  Layers,
  Github,
  Users,
  MessageSquare,
  Key,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

type StepIconProps = {
  step: number;
  isCompleted: boolean;
  isActive: boolean;
};

export function StepIcon({ step, isCompleted, isActive }: StepIconProps) {
  const icons = {
    1: Layers,
    2: Github,
    3: Users,
    4: MessageSquare,
    5: Key,
    6: BookOpen,
  };

  const Icon = icons[step as keyof typeof icons] || CheckCircle2;

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
        isCompleted
          ? 'bg-green-500 text-white'
          : isActive
          ? 'bg-primary text-white'
          : 'bg-gray-200 text-gray-600'
      }`}
    >
      {isCompleted ? (
        <CheckCircle2 className="w-5 h-5" />
      ) : (
        <Icon className="w-5 h-5" />
      )}
    </div>
  );
}