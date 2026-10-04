import Link from 'next/link';
import { Logo } from '@/components/logo';

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex items-center justify-between">
        <Logo />
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          Home
        </Link>
      </div>
      <h1 className="mt-14 text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated {updated}</p>
      <div className="mt-10 space-y-6 leading-relaxed text-zinc-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </main>
  );
}
