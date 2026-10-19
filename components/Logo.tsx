import Link from 'next/link'

export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const text = variant === 'light' ? 'text-white' : 'text-ink-900'
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Seznamky.info – domů">
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-ink-900 ring-1 ring-gold-400/40 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <defs>
            <linearGradient id="lg-heart" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e8d3a5" />
              <stop offset="1" stopColor="#b68a3e" />
            </linearGradient>
          </defs>
          <path
            fill="url(#lg-heart)"
            d="M12 20.6s-7.6-4.6-9.4-9.3C1.4 8 3.4 4.6 6.9 4.6c2 0 3.4 1.1 5.1 3 1.7-1.9 3.1-3 5.1-3 3.5 0 5.5 3.4 4.3 6.7-1.8 4.7-9.4 9.3-9.4 9.3Z"
          />
        </svg>
      </span>
      <span className={`font-display text-[1.35rem] font-semibold tracking-tight ${text}`}>
        Seznamky<span className="text-gold-500">.info</span>
      </span>
    </Link>
  )
}
