'use client';

import { useRef } from 'react';
import clsx from 'clsx';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'gold' | 'outline' | 'ghost';
  href?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  variant = 'gold',
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    (btn as HTMLElement).style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    (btn as HTMLElement).style.transform = 'translate(0, 0)';
    (btn as HTMLElement).style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    setTimeout(() => {
      if (btn) (btn as HTMLElement).style.transition = '';
    }, 500);
  };

  const baseClasses = clsx(
    'relative inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] uppercase font-inter font-medium transition-all duration-300 overflow-hidden group',
    {
      'bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light':
        variant === 'gold',
      'border border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10':
        variant === 'outline',
      'text-luxury-cream/60 hover:text-luxury-gold':
        variant === 'ghost',
    },
    className
  );

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transition: 'transform 0.1s ease' },
  };

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        {...sharedProps}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'gold' && (
          <span className="absolute inset-0 bg-luxury-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        )}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      {...sharedProps}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'gold' && (
        <span className="absolute inset-0 bg-luxury-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      )}
    </button>
  );
}
