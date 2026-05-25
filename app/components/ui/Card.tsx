import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Card({ children, className = '', id }: CardProps) {
  return (
    <div
      id={id}
      className={`rounded-2xl bg-white border border-black/8 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
