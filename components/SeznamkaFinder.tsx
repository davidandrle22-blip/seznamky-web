import { Search } from 'lucide-react'

export const VEK_OPTIONS = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] as const
export const CIL_OPTIONS = [
  { value: 'vztah', label: 'Vážný vztah' },
  { value: 'flirt', label: 'Flirt a zábavu' },
  { value: 'sex', label: 'Sex bez závazků' },
  { value: 'diskretni', label: 'Diskrétní seznámení' },
  { value: 'vse', label: 'Je mi to jedno' },
] as const

interface Props {
  defaults?: { ja?: string; hledam?: string; vek?: string; cil?: string }
  compact?: boolean
}

/** Vyhledávač seznamek – obyčejný GET formulář na /hledat, funguje i bez JavaScriptu. */
export default function SeznamkaFinder({ defaults = {}, compact = false }: Props) {
  return (
    <form action="/hledat" method="get" className={`rounded-3xl bg-white shadow-premium-lg ring-1 ring-ivory-300/80 ${compact ? 'p-5' : 'p-6 md:p-8'}`}>
      {!compact && (
        <>
          <p className="eyebrow">Vyhledávač seznamek</p>
          <h2 className="h-section mt-2">Najděte seznamku přesně pro sebe</h2>
          <p className="mt-2 text-ink-500">Vyplňte čtyři údaje a ukážeme vám seznamky, které se k vám hodí nejvíc.</p>
        </>
      )}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 ${compact ? '' : 'mt-6'}`}>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-500">Jsem</span>
          <select name="ja" defaultValue={defaults.ja || 'muz'} className="finder-select mt-1">
            <option value="muz">Muž</option>
            <option value="zena">Žena</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-500">Hledám</span>
          <select name="hledam" defaultValue={defaults.hledam || 'zenu'} className="finder-select mt-1">
            <option value="zenu">Ženu</option>
            <option value="muze">Muže</option>
            <option value="par">Pár</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-500">Můj věk</span>
          <select name="vek" defaultValue={defaults.vek || '25-34'} className="finder-select mt-1">
            {VEK_OPTIONS.map(v => <option key={v} value={v}>{v} let</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-500">Co hledám</span>
          <select name="cil" defaultValue={defaults.cil || 'vztah'} className="finder-select mt-1">
            {CIL_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </label>
        <div className="flex items-end">
          <button type="submit" className="btn-gold w-full justify-center !py-3">
            <Search className="w-4 h-4" /> Vyhledat
          </button>
        </div>
      </div>
    </form>
  )
}
