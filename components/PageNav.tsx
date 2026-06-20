'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Schedule' },
  { href: '/standings', label: 'Standings' },
];

export default function PageNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2">
      {tabs.map(tab => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
              active
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
