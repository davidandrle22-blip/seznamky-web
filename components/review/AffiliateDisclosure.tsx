import { Info } from 'lucide-react'

interface AffiliateDisclosureProps {
  variant?: 'default' | 'compact'
}

export default function AffiliateDisclosure({
  variant = 'default'
}: AffiliateDisclosureProps) {
  if (variant === 'compact') {
    return (
      <p className="text-xs text-gray-500 mt-4">
        * Tento web obsahuje affiliate odkazy. Pokud provedete registraci přes náš odkaz, můžeme získat provizi bez dalších nákladů pro vás.
      </p>
    )
  }

  return (
    <div className="affiliate-disclosure">
      <Info className="w-5 h-5" />
      <div>
        <p>
          <strong>Transparentnost:</strong> Seznamky.info je nezávislý recenzní portál.
          Některé odkazy na této stránce jsou affiliate odkazy, což znamená, že pokud se
          rozhodnete provést registraci, můžeme získat provizi. Toto nijak neovlivňuje
          naše hodnocení ani vaše náklady.{' '}
          <a href="/legal/affiliate-disclaimer" className="underline hover:text-gray-900">
            Více informací
          </a>
        </p>
      </div>
    </div>
  )
}
