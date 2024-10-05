import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, href }) => {
  return (
    <Button variant="ghost" className="w-full justify-start" asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center rounded-3xl font-bold p-4",
          "hover:bg-slate-200"
        )}
      >
        {React.cloneElement(icon as React.ReactElement, {
          className: "mr-2 h-4 w-4"
        })}
        <span className="hidden lg:inline-block">{label}</span>
      </Link>
    </Button>
  );
};

export default NavButton;