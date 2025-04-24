'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface HamburgerMenuProps {
  children: React.ReactNode;
  className?: string;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={cn('relative md:hidden', className)}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="relative z-30"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </Button>

        <div
          className={cn(
            'fixed inset-0 z-20 container top-[4rem] h-fit bg-background transition-all duration-300 ease-in-out [&>div]:overflow-y-hidden overflow-y-hidden grid accordion-content-grow',
            {
              // isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              'grid-rows-[1fr] overflow-y-auto py-2 pb-4 border-b': isOpen,
              'grid-rows-[0fr] overflow-y-hidden': !isOpen,
            },
          )}
        >
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export { HamburgerMenu };
