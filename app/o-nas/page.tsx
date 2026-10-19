import { Metadata } from 'next'
import Link from 'next/link'
import { getSettings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'O nás – redakce Seznamky.info',
  description: 'Kdo stojí za Seznamky.info, jak vznikají naše recenze seznamek a jak web financujeme.',
  alternates: { canonical: '/o-nas' },
}

export default async function ONasPage() {
  const settings = await getSettings()
  return (
    <div className="container-x py-14">
      <p className="eyebrow">O nás</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-ink-900">Redakce Seznamky.info</h1>
      <div className="prose-review mt-8 max-w-none">
        <p>
          Seznamky.info je nezávislý český průvodce online seznamováním. Pomáháme lidem vybrat seznamku podle toho, co opravdu hledají.
          Může to být vážný vztah, seznámení po padesátce, flirt nebo diskrétní dobrodružství.
        </p>
        <h2>Co děláme</h2>
        <ul>
          <li>Zakládáme si na seznamkách účty a procházíme registraci, profil, párování, komunikaci i rušení členství.</li>
          <li>Porovnáváme ceny, podmínky prodlužování a to, co je zdarma.</li>
          <li>Sledujeme bezpečnost: ověřování profilů, ochranu dat a reakce na nahlášení.</li>
          <li>Píšeme praktické články o seznamování, od prvního profilu po první rande.</li>
        </ul>
        <h2>Jak web financujeme</h2>
        <p>
          Web je zdarma. Financujeme ho z affiliate provizí: když se přes náš odkaz zaregistrujete nebo si koupíte členství,
          provozovatel seznamky nám může zaplatit provizi. Vás to nic nestojí. Spolupráce s partnery ovlivňuje, které seznamky
          zvýrazňujeme. Bodové hodnocení ale počítáme pro všechny stejně podle <Link href="/jak-hodnotime">veřejné metodiky</Link>.
          Seznamku, která podle nás nefunguje, nedoporučíme ani za provizi.
        </p>
        <h2>Kontakt</h2>
        <p>
          Máte zkušenost se seznamkou, našli jste v recenzi chybu nebo chcete navázat spolupráci? Napište nám na{' '}
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>. Údaje o provozovateli najdete na stránce{' '}
          <Link href="/provozovatel">Provozovatel</Link>.
        </p>
      </div>
    </div>
  )
}
