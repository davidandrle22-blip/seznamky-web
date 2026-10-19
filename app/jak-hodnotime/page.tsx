import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jak hodnotíme seznamky – metodika recenzí',
  description: 'Metodika hodnocení seznamek na Seznamky.info: šest kritérií, váhy, jak testujeme a jak často údaje aktualizujeme.',
  alternates: { canonical: '/jak-hodnotime' },
}

const criteria = [
  { name: 'Uživatelé a aktivita', weight: 25, text: 'Jestli jsou na seznamce lidé z ČR, v jakém věku, s jakým záměrem a jak často reálně odpovídají.' },
  { name: 'Párování a funkce', weight: 20, text: 'Kvalita doporučení (osobnostní test, filtry), komunikační nástroje, video chat, aplikace.' },
  { name: 'Bezpečnost a ochrana dat', weight: 20, text: 'Kontrola profilů, ověření fotkou, nahlašování, diskrétnost, GDPR.' },
  { name: 'Cena a férovost', weight: 15, text: 'Co je zdarma, cena za měsíc, automatické prodlužování, jednoduchost zrušení.' },
  { name: 'Ovládání', weight: 10, text: 'Přehlednost webu a aplikace, rychlost registrace, čeština.' },
  { name: 'Podpora a pověst', weight: 10, text: 'Reakce zákaznické podpory, veřejné recenze, historie a transparentnost provozovatele.' },
]

export default function JakHodnotimePage() {
  return (
    <div className="container-x py-14">
      <p className="eyebrow">Metodika</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-ink-900">Jak hodnotíme seznamky</h1>
      <p className="lead mt-5">
        Každá seznamka dostane body od 1 do 10 v šesti oblastech. Výsledné hodnocení je jejich vážený průměr.
        Stejná pravidla používáme pro všechny seznamky, ať s nimi spolupracujeme, nebo ne.
      </p>

      <div className="mt-10 panel overflow-hidden">
        <table className="table-premium">
          <thead><tr><th>Kritérium</th><th className="text-center w-24">Váha</th><th>Co sledujeme</th></tr></thead>
          <tbody>
            {criteria.map(c => (
              <tr key={c.name}>
                <td className="font-semibold text-ink-900">{c.name}</td>
                <td className="text-center font-display text-lg">{c.weight} %</td>
                <td className="text-ink-500">{c.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-review mt-12 max-w-none">
        <h2>Jak probíhá test</h2>
        <ol>
          <li>Založíme si profil jako běžný uživatel. Projdeme registraci, osobnostní test a nastavení soukromí.</li>
          <li>Sledujeme, kolik relevantních návrhů a zpráv dostaneme a jestli jsou profily aktivní.</li>
          <li>Prostudujeme ceník, obchodní podmínky a to, jak jde členství zrušit a vypnout automatické prodlužování.</li>
          <li>Porovnáme výsledky s ostatními seznamkami ve stejné kategorii.</li>
        </ol>
        <h2>Aktualizace</h2>
        <p>
          Ceny, funkce a dostupnost kontrolujeme zhruba jednou měsíčně. Datum poslední aktualizace najdete u každé recenze.
          Když seznamka v ČR přestane fungovat, označíme ji a doporučíme alternativy.
        </p>
        <h2>Řazení a affiliate spolupráce</h2>
        <p>
          Web financujeme z affiliate provizí. Ve žebříčcích a v doporučeních proto můžeme zvýraznit partnerské seznamky.
          Do výběru se ale dostanou jen ty, které v hodnocení dopadly dobře. Více na stránce <Link href="/o-nas">O nás</Link>.
        </p>
        <h2>Uživatelské recenze</h2>
        <p>
          Nezveřejňujeme vymyšlené ani placené recenze. Údaje o počtu uživatelů pocházejí od provozovatelů seznamek
          nebo z veřejných zdrojů a berte je jako orientační.
        </p>
      </div>
    </div>
  )
}
