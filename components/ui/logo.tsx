import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="https://cdn.baseline.is/static/content/logos/CmpiZrcBVWQnEYx5qnwpwz-Learnathon_logo_Blue.png"
      alt="Learnathon"
      width={200}
      height={60}
      className={className}
      priority
    />
  );
}