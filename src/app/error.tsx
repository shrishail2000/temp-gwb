'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import { Inter } from 'next/font/google';

import './(frontend)/globals.css';
import { Header } from '@/globals/Header/Component';
import { Footer } from '@/globals/Footer/Component';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html className={cn(inter.className)} lang="en">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="w-dvw h-dvh flex justify-center items-center gap-4">
        <h2>Something went wrong!</h2>
        <Button variant="secondary">
          <Link href={''}>Try again</Link>
        </Button>
      </body>
    </html>
  );
}
