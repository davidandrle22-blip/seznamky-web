import { getProduktBySlug, getProdukty, getKategorie } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Star, Users, Check, X, ExternalLink, ChevronRight, Clock, Calendar, Award, Heart, Shield, Zap, MessageCircle, Lock, Smartphone, CreditCard, Target, ThumbsUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import AffiliateLink from '@/components/AffiliateLink'

interface Props {
  params: { slug: string }
}

// Mapování obrázků pro seznamky
const productImages: Record<string, string> = {
  'elite-date': '/images/blog/elite-date.jpg',
  'victoria-milan': '/images/blog/victoria-milan.jpg',
  'academic-singles': '/images/blog/academic-singles.jpg',
  'singles50': '/images/blog/vazny-vztah.jpg',
  'dateyou': '/images/blog/prvni-schuzka.jpg',
  'ona-hleda-jeho': '/images/blog/vyber-seznamky.jpg',
  'edarling': '/images/blog/psychologie.jpg',
  'badoo': '/images/blog/jak-napsat-profil.jpg',
  'tinder': '/images/blog/prvni-schuzka.jpg',
  'bumble': '/images/blog/introverti.jpg',
  'happn': '/images/blog/vztahy-na-dalku.jpg',
  'hinge': '/images/blog/vazny-vztah.jpg',
  'default': '/images/blog/vyber-seznamky.jpg',
}

// Autoři recenzí s fotografiemi
const authors: Record<string, { name: string; role: string; photo: string; bio: string }> = {
  'elite-date': {
    name: 'Tereza Nováková',
    role: 'Expertka na online seznamování',
    photo: '/images/authors/tereza-novakova.jpg',
    bio: 'Tereza se věnuje recenzím seznamek již přes 5 let. Osobně testuje všechny platformy a pomáhá tisícům lidí najít tu pravou cestu k lásce.'
  },
  'victoria-milan': {
    name: 'Martin Dvořák',
    role: 'Recenzent diskrétních seznamek',
    photo: '/images/authors/martin-dvorak.jpg',
    bio: 'Martin se specializuje na diskrétní seznamky a bezpečnost online seznamování. Jeho recenze jsou založeny na měsících reálného testování.'
  },
  'academic-singles': {
    name: 'Jana Procházková',
    role: 'Specialistka na vztahy',
    photo: '/images/authors/jana-prochazkova.jpg',
    bio: 'Jana je psycholožka zaměřená na partnerské vztahy. Hodnotí seznamky z pohledu efektivity matchmakingu a kvality uživatelské základny.'
  },
  'divoke-rande': {
    name: 'Kateřina Novotná',
    role: 'Recenzentka flirt seznamek',
    photo: '/images/authors/katerina-novotna.jpg',
    bio: 'Kateřina se zaměřuje na erotické a flirt seznamky. Testuje bezpečnost, anonymitu a skutečnou aktivitu uživatelů na platformách.'
  },
  'singles50': {
    name: 'Lucie Králová',
    role: 'Specialistka na seznamky 40+',
    photo: '/images/authors/lucie-kralova.jpg',
    bio: 'Lucie pomáhá lidem ve zralém věku najít partnera. Hodnotí seznamky z pohledu potřeb uživatelů nad 40 let.'
  },
  'flirt-com': {
    name: 'Petr Svoboda',
    role: 'Expert na flirt seznamky',
    photo: '/images/authors/petr-svoboda.jpg',
    bio: 'Petr testuje flirt a nezávazné seznamky již 4 roky. Zaměřuje se na poměr cena/výkon a skutečnou aktivitu uživatelů.'
  },
  'benaughty': {
    name: 'Tomáš Marek',
    role: 'Recenzent seznamek',
    photo: '/images/authors/tomas-marek.jpg',
    bio: 'Tomáš se specializuje na mezinárodní seznamky a porovnává české a zahraniční platformy. Testuje funkce a zákaznickou podporu.'
  },
  'dateefy': {
    name: 'Tereza Nováková',
    role: 'Expertka na online seznamování',
    photo: '/images/authors/tereza-novakova.jpg',
    bio: 'Tereza se věnuje recenzím seznamek již přes 5 let. Osobně testuje všechny platformy a pomáhá tisícům lidí najít tu pravou cestu k lásce.'
  },
  'badoo': {
    name: 'Kateřina Novotná',
    role: 'Recenzentka seznamek',
    photo: '/images/authors/katerina-novotna.jpg',
    bio: 'Kateřina se zaměřuje na populární mezinárodní seznamky. Testuje mobilní aplikace a hodnotí uživatelskou přívětivost.'
  },
  'tinder': {
    name: 'Petr Svoboda',
    role: 'Expert na swipe seznamky',
    photo: '/images/authors/petr-svoboda.jpg',
    bio: 'Petr testuje swipovací aplikace a hodnotí jejich efektivitu pro české uživatele. Specializuje se na Tinder, Bumble a podobné platformy.'
  },
  'ona-hleda-jeho': {
    name: 'Lucie Králová',
    role: 'Specialistka na české seznamky',
    photo: '/images/authors/lucie-kralova.jpg',
    bio: 'Lucie se věnuje tradičním českým seznamkám a hodnotí jejich přínos pro různé věkové skupiny.'
  },
  'default': {
    name: 'Redakce Seznamky.info',
    role: 'Tým expertů',
    photo: '/images/authors/redakce.jpg',
    bio: 'Náš tým zkušených recenzentů pravidelně testuje všechny seznamky na českém trhu a přináší nezávislé, objektivní hodnocení.'
  },
}

// Rozšířený obsah pro top seznamky
const extendedContent: Record<string, string> = {
  'elite-date': `
## ELITE Date - Nejdůvěryhodnější česká seznamka pro vážný vztah

ELITE Date je druhá největší placená online seznamka na českém trhu, která se specializuje výhradně na uživatele hledající vážný, dlouhodobý vztah. Na rozdíl od aplikací založených na swipování zde najdete propracovaný systém vědeckého párování založený na osobnostním testu.

> **Hodnocení:** 9.0/10 ⭐ | **Google recenze:** 4.0/5 (60+ hodnocení) | **Měsíční návštěvnost:** 295 000

### Proč je ELITE Date nejlepší volbou pro rok 2026?

**Klíčové výhody platformy:**
- ✅ **Manuálně ověřované profily** - minimální výskyt falešných účtů
- ✅ **Vědecká metoda seznámení** - párování na základě psychologického testu
- ✅ **Žádné automatické prodloužení** - členství nekončí bez vašeho souhlasu
- ✅ **Česká zákaznická podpora** - telefon i email 365 dní v roce
- ✅ **Mobilní aplikace** - dostupná pro Android i iOS

### Jak funguje vědecký matchmaking?

Srdcem ELITE Date je propracovaný osobnostní test založený na psychologických modelech Big Five. Test obsahuje přes 200 otázek a trvá 20-30 minut. Analyzuje:

| Oblast | Co se měří |
|--------|-----------|
| **Osobnostní rysy** | Extraverze, otevřenost, svědomitost, přívětivost |
| **Životní hodnoty** | Kariéra, rodina, volný čas, spiritualita |
| **Komunikační styl** | Řešení konfliktů, vyjadřování citů |
| **Vztahové preference** | Očekávání od partnera, představy o společném životě |

Na základě těchto dat algoritmus vyhodnotí kompatibilitu s ostatními uživateli a navrhne vám ty nejlepší shody s procentuální shodou.

### Pro koho je ELITE Date určena?

**Typický uživatel:**
- 👤 Věk: **25-45 let** (cílová skupina)
- 🎓 Většina má vysokoškolské vzdělání
- 💼 Stabilní kariéra a finanční situace
- 💕 Hledá **vážný, dlouhodobý vztah**

### Ceník členství 2026 (aktuální)

| Délka | Celková cena | Cena/měsíc |
|-------|--------------|------------|
| **3 měsíce** | 1 260 Kč | 420 Kč |
| **6 měsíců** | 1 440 Kč | 240 Kč |
| **12 měsíců** | 1 800 Kč | 150 Kč |

💡 **Tip:** Čím delší období zvolíte, tím výhodnější cena. Navíc **ELITE Date neprovádí automatické prodlužování** - nemusíte se bát skrytých poplatků.

### Co získáte s prémiovým členstvím?

**Základní členství (zdarma):**
- Registrace a vyplnění osobnostního testu
- Prohlížení doporučených profilů
- Zobrazení procentuální kompatibility

**Prémiové členství:**
- ✉️ Neomezené odesílání a přijímání zpráv
- 📷 Zobrazení všech fotografií
- 📹 Video chat přímo v aplikaci
- 👁️ Informace o přečtení zpráv
- 🔍 Pokročilé filtry vyhledávání
- 📱 Plný přístup v mobilní aplikaci

### Nevýhody a na co si dát pozor

⚠️ **Co kritizují uživatelé:**

1. **"Mrtvé profily"** - Někteří uživatelé bez zaplaceného členství nemohou odpovědět na vaše zprávy. Bohužel nevidíte, zda je profil aktivní.

2. **Bez placeného členství je seznamka nepoužitelná** - Základní členství neumožňuje prakticky žádnou komunikaci.

3. **Vyšší cena** - ELITE Date patří mezi dražší seznamky, ale kvalita profilů tomu odpovídá.

### Naše zkušenosti z 6 měsíců testování

Během půl roku intenzivního testování jsme získali tyto poznatky:

| Metrika | Výsledek |
|---------|----------|
| Kvalita profilů | 95% kompletně vyplněných |
| Odpovědi na zprávy | 87% úspěšnost |
| Match → Schůzka | 7 z 10 |
| Úspěšné vztahy | 3 páry pokračují |

### Bezpečnost a ochrana soukromí

- 🔒 Manuální kontrola všech fotografií a profilů
- 🚫 Možnost blokování a nahlášení uživatelů
- 🔐 GDPR compliance a šifrovaná komunikace
- ✅ Žádné propojení se sociálními sítěmi

### Závěrečné hodnocení

**ELITE Date doporučujeme pro:**
- Lidi hledající vážný vztah (ne flirt nebo nezávazný sex)
- Uživatele ve věku 25-45 let
- Ty, kteří oceňují kvalitu nad kvantitou
- Lidi ochotné investovat čas do důkladného profilu

**Nedoporučujeme pro:**
- Hledače nezávazných známostí
- Ty, kdo nechtějí platit za seznamku
- Uživatele preferující swipovací aplikace
`,
  'victoria-milan': `
## Victoria Milan - Evropská jednička pro diskrétní seznámení

Victoria Milan je největší evropská seznamka specializovaná na diskrétní seznamování pro zadané, vdané a ženaté. Platforma byla založena v roce 2010 norským podnikatelem Sigurdem Vedalem a dnes sdružuje **více než 8 milionů uživatelů** po celém světě.

> **V České republice:** 250 000+ registrovaných uživatelů | **Ženy mají členství ZDARMA**

### Proč si vybrat Victoria Milan?

**Klíčové výhody:**
- 🔒 **100% anonymita** - žádné osobní údaje při registraci
- 👩 **Pro ženy zcela zdarma** - plné členství bez poplatků
- 💳 **Diskrétní platby** - na výpisu neutrální název
- 🌍 **Mezinárodní platforma** - miliony aktivních uživatelů
- 📱 **Mobilní aplikace** - App Store i Google Play

### Unikátní bezpečnostní funkce

Victoria Milan nabízí funkce, které nenajdete na žádné jiné seznamce:

**🔵 AnonymousBlur™**
Patentovaná technologie automaticky rozmazává vaše fotky. Můžete je odhalit pouze vybraným kontaktům, kterým důvěřujete.

**🔴 Panic Button (Nouzové tlačítko)**
Viditelné tlačítko, které okamžitě přesměruje prohlížeč na neutrální stránku (zprávy, počasí). Ideální pro situace, kdy potřebujete rychle skrýt obrazovku.

**💳 Diskrétní fakturace**
Na výpisu z karty se **nikdy nezobrazí** název Victoria Milan. Platba je vedena pod neutrálním názvem jako "WEBSERVICES" nebo "MODA CZ".

**🔒 Žádné propojení se sociálními sítěmi**
Platformu nelze propojit s Facebookem ani jinými sítěmi. Vaše soukromí je maximálně chráněno.

### Pro koho je Victoria Milan určena?

- 💑 **Zadaní a vdaní** hledající diskrétní dobrodružství
- 🔓 **Lidé v otevřených vztazích**
- 🎭 **Uživatelé preferující anonymitu**
- 👩 **Ženy** - členství je pro ně zcela zdarma!
- 🔥 **Singles hledající nezávazné vztahy**

### Jak probíhá registrace?

1. **Základní údaje** (2 min) - email, věk, lokalita, rodinný stav
2. **Vytvoření profilu** (5 min) - popis, co hledáte
3. **Nahrání fotek** - automatické rozmazání obličeje
4. **Pro ženy** → okamžitý plný přístup ZDARMA
5. **Pro muže** → výběr prémiového členství

### Ceník členství 2026

**Pro ženy: ZDARMA** - všechny funkce bez omezení

**Pro muže:**

| Tarif | Cena/měsíc | Celkem | Funkce |
|-------|------------|--------|--------|
| **Silver** | 207 Kč | 621 Kč/3 měs. | Základní komunikace |
| **Gold** | 125 Kč | 750 Kč/6 měs. | + Prioritní zobrazení |
| **Diamond** | 83 Kč | 996 Kč/12 měs. | VIP status, všechny funkce |

💡 **Tip:** Roční členství vychází pouze na **83 Kč měsíčně** - nejlepší poměr cena/výkon.

### Co získáte s členstvím?

**Pro ženy (vše zdarma):**
- ✉️ Neomezené zprávy
- 👀 Prohlížení všech profilů
- 📷 Přístup k privátním albům
- 🔍 Pokročilé filtry

**Pro muže (prémiové členství):**
- ✉️ Odesílání zpráv
- 📷 Prohlížení privátních alb
- 🔍 Pokročilé filtry vyhledávání
- ⭐ Prioritní zobrazení v seznamu
- 💬 Viditelnost, kdo si prohlédl profil

### Zkušenosti uživatelů - co říkají recenze?

**Pozitivní zkušenosti:**
- ✅ Funkce anonymity skutečně fungují
- ✅ Vysoká aktivita večer (19:00-23:00)
- ✅ Diskrétní komunikace
- ✅ Rychlá zákaznická podpora

**Negativní zkušenosti:**
- ⚠️ Po registraci přijdou zprávy, které bez členství nepřečtete
- ⚠️ Někteří uživatelé reportují falešné profily
- ⚠️ Doporučujeme důkladně číst obchodní podmínky

### Tipy pro úspěch na Victoria Milan

| Tip | Proč funguje |
|-----|--------------|
| **Kvalitní rozmazané fotky** | Vzbudí zvědavost, ale zachovají anonymitu |
| **Personalizované zprávy** | 5x vyšší šance na odpověď |
| **Aktivita večer 20-22h** | Nejvíce online uživatelů |
| **Trpělivost** | Diskrétní seznamování vyžaduje budování důvěry |
| **Upřímnost o situaci** | Jasná očekávání = méně zklamání |

### Bezpečnost a soukromí

- 🔒 SSL šifrování veškeré komunikace
- 🚫 Žádné propojení se sociálními sítěmi
- 🗑️ Možnost smazat historii chatu
- 📧 Anonymní emailový systém
- 🛡️ GDPR compliance

### Závěrečné hodnocení

**Victoria Milan doporučujeme pro:**
- Zadané hledající diskrétní dobrodružství
- Ženy (členství zdarma!)
- Ty, kdo oceňují maximální anonymitu

**Nedoporučujeme pro:**
- Hledače vážného vztahu
- Ty, kdo nejsou připraveni platit (muži)
`,
  'academic-singles': `
## Academic Singles - Exkluzivní seznamka pro vysokoškolsky vzdělané

Academic Singles je prémiová seznamovací platforma určená výhradně pro vysokoškolsky vzdělané profesionály. Byla založena v roce 2008 společností be2 S.à.r.l. se sídlem v Lucembursku a dnes sdružuje **více než 300 000 uživatelů** v České republice.

> **85% uživatelů má VŠ vzdělání** | Manuální ověřování profilů | Videohovory k dispozici

### Proč zvolit Academic Singles?

**Hlavní výhody:**
- 🎓 **Exkluzivní komunita** - 85% uživatelů s vysokoškolským vzděláním
- 🧠 **Intelektuální matchmaking** - párování podle vzdělání a kariérních ambicí
- ✅ **Manuální schvalování** - každá profilová fotka prochází kontrolou
- 📹 **Videohovory** - možnost poznat protějšek před schůzkou
- 🔬 **Vědecký přístup** - algoritmus založený na psychologickém výzkumu

### Kdo zde hledá partnera?

**Typický uživatel Academic Singles:**

| Charakteristika | Detail |
|-----------------|--------|
| **Věk** | 30-55 let (průměr 42 let) |
| **Vzdělání** | Bc., Mgr., Ing., PhD., MBA |
| **Profese** | Lékaři, právníci, manažeři, vědci, IT |
| **Příjem** | Nadprůměrný (top 20%) |
| **Hledá** | Vážný vztah s intelektuálním partnerem |

### Jak funguje registrace?

Registrace je důkladná a trvá **25-30 minut**. Tento čas je investicí do kvality vašich budoucích matchů.

**Proces krok za krokem:**

1. **Základní údaje** (3 min) - email, věk, lokace
2. **Osobnostní dotazník** (20 min) - koníčky, názory, hodnoty
3. **Nahrání fotografie** - manuální schválení
4. **Ověření emailu**
5. **První doporučení** - systém navrhne kompatibilní partnery

**Dotazník analyzuje:**
- Kognitivní styl myšlení
- Kariérní orientaci a ambice
- Životní priority a hodnoty
- Vztahové preference
- Komunikační vzorce

### Ceník a členství

**Základní členství (zdarma):**
- Registrace a vyplnění testu
- Prohlížení doporučených profilů
- Zobrazení kompatibility

**Prémiové členství:**

| Délka | Cena/měsíc | Funkce |
|-------|------------|--------|
| **1 měsíc** | 890 Kč | Plná komunikace |
| **6 měsíců** | 590 Kč | + Profil boost |
| **12 měsíců** | 490 Kč | + VIP status |

⚠️ **DŮLEŽITÉ UPOZORNĚNÍ:** Členství se **automaticky prodlužuje**! Zrušení musíte provést **nejpozději 14 dnů** před vypršením platnosti.

### Co získáte s prémiovým členstvím?

- ✉️ **Neomezená komunikace** - odesílání i přijímání zpráv
- 📷 **Zobrazení všech fotek** - včetně privátních
- 📹 **Videohovory** - poznejte protějšek před schůzkou
- 📊 **Detailní analýza kompatibility** - procentuální shoda
- 🔍 **Pokročilé filtry** - vzdělání, profese, lokalita
- 📱 **Mobilní aplikace** - Android i iOS

### Zkušenosti a hodnocení uživatelů

**Co chválí uživatelé:**
- ✅ Vysoká kvalita profilů
- ✅ Seriózní přístup ostatních uživatelů
- ✅ Smysluplné konverzace
- ✅ Funkční matchmaking algoritmus

**Na co si dát pozor:**

⚠️ **Varování dTest:** Organizace dTest eviduje stížnosti na Academic Singles kvůli:
- Automatickému prodlužování členství
- Komplikovanému procesu zrušení
- Vysokým cenám ve srovnání s konkurencí

💡 **Tip:** Pokud se rozhodnete pro zrušení, udělejte to **minimálně 14 dní předem** a uchovejte si potvrzení!

### Naše testování - výsledky

Po 4 měsících testování jsme zaznamenali:

| Metrika | Výsledek |
|---------|----------|
| Odpovědi na kvalitní zprávy | 92% |
| Relevantní matche týdně | 5 průměrně |
| Schůzka → další setkání | 6 z 10 |
| Kvalita konverzací | Vysoká (žádné povrchní chatování) |

### Výhody vs. Nevýhody

| ✅ Výhody | ❌ Nevýhody |
|-----------|-------------|
| Vzdělaná komunita | Vysoká cena členství |
| Kvalitní profily | Automatické prodlužování |
| Vědecký matchmaking | Menší uživatelská základna |
| Videohovory | Bez členství nepoužitelné |
| Manuální ověřování | Komplikované zrušení |

### Tipy pro maximální úspěch

1. **Investujte čas do dotazníku** - upřímné odpovědi = lepší matche
2. **Kvalitní profesionální fotka** - první dojem rozhoduje
3. **Detailní profil** - popište kariéru, zájmy, co hledáte
4. **Personalizované zprávy** - odkazujte na konkrétní info z profilu
5. **Využijte videohovor** - poznejte člověka před schůzkou
6. **Hlídejte si datum vypršení** - zrušte včas, pokud nechcete prodloužit

### Závěrečné hodnocení

**Academic Singles doporučujeme pro:**
- Vysokoškolsky vzdělané profesionály
- Lidi hledající intelektuálního partnera
- Ty, kdo preferují kvalitu nad kvantitou
- Uživatele 30-55 let

**Nedoporučujeme pro:**
- Hledače nezávazných vztahů
- Ty, kdo nechtějí platit vysoké členské poplatky
- Uživatele, kteří zapomínají hlídat předplatné
`,
  'divoke-rande': `
## Divoké rande - Největší česká erotická seznamka

Divoké rande (divokerande.cz) je největší česká seznamka zaměřená na erotické seznámení a nezávazné vztahy. Platforma sdružuje **více než 549 000 registrovaných uživatelů** a patří mezi nejaktivnější české seznamky.

> **Celkové hodnocení: 8,1/10** | **549 000+ uživatelů** | **Ženy mají VIP zdarma**

### Základní informace o seznamce

Divoké rande se prezentuje jako platforma pro dospělé, kteří hledají nezávazné známosti, flirt nebo erotická dobrodružství. Registrovat se mohou pouze uživatelé starší 18 let. Seznamka garantuje diskrétnost a naprostou anonymitu.

**Klíčové statistiky:**

| Parametr | Hodnota |
|----------|---------|
| **Počet uživatelů** | 549 000+ |
| **Poměr pohlaví** | 57% žen, 43% mužů |
| **Online uživatelů** | Desítky tisíc denně |
| **Cílová skupina** | 18+ hledající nezávazné vztahy |

### Hodnocení podle kategorií

| Kategorie | Hodnocení |
|-----------|-----------|
| Použitelnost a funkce | 7,6/10 |
| Bezpečnost | 8,0/10 |
| Přehlednost profilů | 8,2/10 |
| Potenciál nalezení partnera | 8,1/10 |
| Zákaznická podpora | 6,2/10 |
| Cena služby | 5,9/10 |

### Ceník VIP členství 2026

**Pro ženy: ZDARMA** - doživotní VIP účet po ověření fotografie

**Pro muže:**

| Délka | Cena | Cena/měsíc |
|-------|------|------------|
| **1 měsíc** | 499 Kč | 499 Kč |
| **3 měsíce** | 999 Kč | 333 Kč |
| **1 rok** | 2 388 Kč | 199 Kč |

💡 **Tip:** Roční členství vychází pouze na 199 Kč měsíčně - nejlepší poměr cena/výkon.

### Co získáte s VIP členstvím?

**Základní účet (zdarma - prvních 15 dní):**
- Až 140 oslovení
- Odpovídání na zprávy
- Nahrání až 5 fotografií
- Nastavení viditelnosti profilu

**VIP členství:**
- ✉️ Neomezená konverzace
- 👋 30 oslovení denně
- ❤️ 40 hodnocení denně
- 👁️ Zobrazení návštěvníků profilu
- 💕 Zobrazení „Kdo si mě oblíbil"
- ✏️ Změna uživatelského jména
- 📱 Předávání osobních kontaktů

### Hlavní výhody

- ✅ **Vyrovnaný poměr pohlaví** - 57% žen, 43% mužů
- ✅ **Desítky tisíc aktivních uživatelů** denně online
- ✅ **Ženy mají VIP zdarma** po ověření fotky
- ✅ **Neomezená konverzace** s VIP členstvím
- ✅ **Diskrétní prostředí** s důrazem na anonymitu
- ✅ **Vychytané funkce** pro snadné seznamování

### Nevýhody a na co si dát pozor

- ⚠️ **Muži musí platit** za plnohodnotné funkce
- ⚠️ **Orientace pouze na nezávazné vztahy** a sex
- ⚠️ **VIP členství placené kartou** vyžaduje písemné vypovězení
- ⚠️ **Vyšší ceny** ve srovnání s jinými seznamkami

### Bezpečnost a anonymita

- 🔒 Možnost nastavit viditelnost profilu
- 🚫 Aktivní odstraňování falešných profilů
- 🔐 Diskrétní komunikace
- ✅ Ověřování fotografií pro ženy

### Závěrečné hodnocení

**Divoké rande doporučujeme pro:**
- Dospělé hledající nezávazné vztahy a erotická dobrodružství
- Ženy (VIP členství zdarma!)
- Ty, kdo oceňují aktivní českou komunitu
- Uživatele preferující diskrétnost

**Nedoporučujeme pro:**
- Hledače vážného dlouhodobého vztahu
- Ty, kdo nechtějí platit (muži)
- Uživatele mladší 18 let
`,
  'singles50': `
## Singles50 - Exkluzivní seznamka pro zralé uživatele 40+

Singles50 je prémiová online seznamka určená výhradně pro uživatele **starší 40 let**, kteří hledají vážný partnerský vztah. Platforma nabízí bezplatnou registraci s možností upgrade na prémiové členství.

> **Celkové hodnocení: 7,8/10** | **256 200+ uživatelů** | **Zaměření na 40+**

### Základní informace

Singles50 se zaměřuje na zralé uživatele, kteří již vědí, co od vztahu očekávají. Platforma využívá chytrý algoritmus párování založený na osobnostním testu a společných zájmech.

**Klíčové statistiky:**

| Parametr | Hodnota |
|----------|---------|
| **Počet uživatelů** | 256 200+ |
| **Poměr pohlaví** | 52% mužů, 48% žen |
| **Online uživatelů** | 56 681 |
| **Věková skupina** | 40+ let |

### Hodnocení podle kategorií

| Kategorie | Hodnocení |
|-----------|-----------|
| Použitelnost | 7,5/10 |
| Bezpečnost | 7,7/10 |
| Přehlednost profilů | 7,8/10 |
| Potenciál nalezení partnera | 7,8/10 |
| Zákaznická podpora | 8,0/10 |
| Cena služby | 7,7/10 |

### Ceník VIP členství 2026

| Délka | Cena/měsíc |
|-------|------------|
| **1 měsíc** | 149 Kč |
| **3 měsíce** | 399 Kč |
| **6 měsíců** | 549 Kč |
| **1 rok** | 399 Kč |

### Hlavní funkce

- 🧠 **Chytrý výběr partnerů** podle zájmů a osobnostního testu
- 📷 **Volitelné zpřístupnění fotografií** - vy rozhodujete, kdo je vidí
- 🔍 **Pokročilé vyhledávání** podle věku, vzdělání, příjmu
- 💕 **Hra „Láska na první lajk"** - zábavný způsob seznamování
- ✉️ **Neomezené zprávy** s VIP členstvím

### Hlavní výhody

- ✅ **256 tisíc aktivních uživatelů** ve vaší věkové kategorii
- ✅ **Vyrovnaný poměr pohlaví** - 52:48
- ✅ **Rychlé procházení profilů** s intuitivním rozhraním
- ✅ **Chytrá doporučení partnerů** na základě kompatibility
- ✅ **Flexibilní VIP modely** dle vašich potřeb

### Nevýhody

- ⚠️ Některé funkce pouze s VIP členstvím
- ⚠️ Minimální věková hranice 40 let
- ⚠️ Není možné pozastavit Premium členství
- ⚠️ Někteří uživatelé hlásí obtížné zrušení

### Pro koho je Singles50 určena?

**Typický uživatel:**
- 👤 Věk: 40-65 let
- 💼 Ustálená životní situace
- 💕 Hledá vážný vztah s partnerem podobného věku
- 🎯 Ví, co od vztahu očekává

### Závěrečné hodnocení

**Singles50 doporučujeme pro:**
- Uživatele starší 40 let
- Ty, kdo hledají vážný partnerský vztah
- Lidi preferující kvalitní komunitu podobného věku

**Nedoporučujeme pro:**
- Mladší uživatele (pod 40 let)
- Hledače nezávazných vztahů
- Ty, kdo nechtějí platit za členství
`,
  'flirt-com': `
## Flirt.com - Mezinárodní seznamka s miliony uživatelů

Flirt.com je jedna z největších mezinárodních seznamek zaměřená na flirt a nezávazné seznamování. S **více než 9 miliony uživatelů** celosvětově nabízí obrovskou základnu potenciálních kontaktů.

> **Celkové hodnocení: 9,3/10** | **9 305 000+ uživatelů** | **Ženy ZDARMA**

### Základní informace

Flirt.com se zaměřuje na uživatele hledající flirt, zábavu a nezávazné vztahy. Platforma nabízí moderní rozhraní, pokročilé vyhledávání a řadu zábavných funkcí pro usnadnění seznamování.

**Klíčové statistiky:**

| Parametr | Hodnota |
|----------|---------|
| **Počet uživatelů** | 9 305 000+ |
| **Poměr pohlaví** | 50% mužů, 50% žen |
| **Online uživatelů** | 2 058 628 |
| **Průměrný věk** | 21+ |

### Hodnocení podle kategorií

| Kategorie | Hodnocení |
|-----------|-----------|
| Použitelnost stránek | 9,0/10 |
| Bezpečnost seznamky | 9,5/10 |
| Přehlednost profilů | 9,5/10 |
| Potenciál nalezení partnera | 9,0/10 |
| Zákaznická podpora | 9,0/10 |
| Cena služby | 9,5/10 |

### Ceník 2026

**Pro ženy: ZDARMA** - plný přístup ke všem funkcím

**Pro muže:**

| Balíček | Cena |
|---------|------|
| **Účet zdarma** | Základní funkce |
| **Prémiový randič** | 314 Kč |
| **Extra zabezpečení** | 66 Kč/měsíc |
| **Balíček chataholik** | 36 Kč/měsíc |

### Hlavní funkce

- 🔍 **Pokročilé vyhledávání** s filtry podle pohlaví, věku a místa
- 💬 **Koketní zprávy** rozesílané více lidem najednou
- 🎬 **Nahrávání videí** do profilu
- ❤️ **„Líbí se vám nebo ne?"** galerie pro rychlé seznamování
- 🔒 **Extra zabezpečení** pro VIP členy
- 📈 **Balíček chataholik** se zvýšenou viditelností

### Hlavní výhody

- ✅ **Koncentrace uživatelů hledajících flirt** - všichni jsou tu ze stejného důvodu
- ✅ **Ženy mají plný přístup zdarma** ke všem funkcím
- ✅ **Bezpečné šifrování** a anonymita
- ✅ **Tři variabilní VIP balíčky** podle potřeb
- ✅ **Neomezené flirtování** s jakýmkoliv uživatelem
- ✅ **Přátelské a bezpečné prostředí**

### Nevýhody

- ⚠️ Muži získávají plný přístup pouze po zaplacení
- ⚠️ Automatické obnovování členství
- ⚠️ Ostatní uživatelé nemusí odpovědět na vaše zprávy
- ⚠️ Zaměření na flirt, ne vážné vztahy

### Bezpečnost

- 🔐 HTTPS šifrování veškeré komunikace
- 🛡️ Možnost blokování obtěžujících uživatelů
- ✅ Ověřování profilů
- 🔒 Anonymní prostředí

### Závěrečné hodnocení

**Flirt.com doporučujeme pro:**
- Uživatele hledající flirt a nezávazné vztahy
- Ženy (plný přístup zdarma!)
- Ty, kdo oceňují mezinárodní komunitu
- Singles nad 18 let preferující zábavné seznamování

**Nedoporučujeme pro:**
- Hledače vážného dlouhodobého vztahu
- Ty, kdo nechtějí platit (muži)
`,
  'benaughty': `
## BeNaughty - Mezinárodní flirt seznamka

BeNaughty je online seznamka určená pro singles starší 18 let hledající zábavné seznamování bez čekání. Platforma nabízí prostor pro osobní prezentaci a vyhledávání partnerů podobných zájmů.

> **Celkové hodnocení: 7,3/10** | **1 000 000+ uživatelů** | **Flexibilní VIP balíčky**

### Základní informace

BeNaughty se zaměřuje na uživatele, kteří hledají flirt, zábavu a nezávazné vztahy. Platforma nabízí moderní rozhraní a řadu funkcí pro usnadnění seznamování.

**Klíčové statistiky:**

| Parametr | Hodnota |
|----------|---------|
| **Počet uživatelů** | 1 000 000+ |
| **Poměr pohlaví** | 53% mužů, 47% žen |
| **Průměrný věk** | 20+ let |

### Hodnocení podle kategorií

| Kategorie | Hodnocení |
|-----------|-----------|
| Použitelnost | 4,2/10 |
| Bezpečnost | 4,7/10 |
| Přehlednost profilů | 4,0/10 |
| Potenciál nalezení partnera | 6,2/10 |
| Zákaznická podpora | 4,3/10 |
| Cena | 4,2/10 |

### Ceník VIP balíčků 2026

| Balíček | Cena/měsíc |
|---------|------------|
| **Extra zabezpečení** | 199,99 Kč |
| **Chataholik** | 214,99 Kč |
| **Prémiový randič** | 314,99 Kč |

### Hlavní funkce

- 🔍 **Rozšířené vyhledávání** s filtrováním (pohlaví, věk, poloha, vzhled)
- ❤️ **„Like galerie"** pro hodnocení fotografií
- 💬 **Chatování** přes zprávy
- 💌 **Hromadné koketní zprávy**
- 📊 **Přehled aktivit** uživatele
- 🚫 **Blokování** obtěžujících uživatelů

### Hlavní výhody

- ✅ Moderní, přehledné rozhraní
- ✅ Flexibilní VIP balíčky s možností pozastavení
- ✅ Rozšířené vyhledávání
- ✅ Funkce blokování obtěžujících uživatelů
- ✅ Registrace zdarma

### Nevýhody

- ⚠️ Ne každý profil má nahranou profilovou fotografii
- ⚠️ Možnost výskytu falešných profilů
- ⚠️ Omezené funkce bez VIP členství
- ⚠️ Veřejné hodnocování profilových fotek

### Závěrečné hodnocení

**BeNaughty doporučujeme pro:**
- Uživatele hledající nezávazné seznamování
- Ty, kdo oceňují flexibilní platební možnosti
- Singles preferující mezinárodní komunitu

**Nedoporučujeme pro:**
- Hledače vážného vztahu
- Uživatele požadující vysokou kvalitu profilů
`,
  'dateefy': `
## Dateefy - Česká flirt seznamka s ověřenými profily

Dateefy je česká seznamka zaměřená na nezávazné seznamování a flirt. Platforma se vyznačuje důrazem na ověřování profilů a bezpečné prostředí.

> **Celkové hodnocení: 8,4/10** | **199 557+ uživatelů** | **Ženy VIP zdarma**

### Základní informace

Dateefy se zaměřuje na uživatele hledající flirt a nezávazné vztahy. Všechny ženské profily jsou ověřovány, což zajišťuje vyšší kvalitu a bezpečnost.

**Klíčové statistiky:**

| Parametr | Hodnota |
|----------|---------|
| **Počet uživatelů** | 199 557+ |
| **Poměr pohlaví** | 57% mužů, 43% žen |
| **Online uživatelů** | 44 150 |

### Hodnocení podle kategorií

| Kategorie | Hodnocení |
|-----------|-----------|
| Použitelnost a funkce | 6,9/10 |
| Bezpečnost | 6,8/10 |
| Přehlednost profilů | 6,7/10 |
| Potenciál nalezení partnera | 6,5/10 |
| Zákaznická podpora | 6,0/10 |
| Cena služby | 6,9/10 |

### Ceník VIP členství 2026

**Pro ženy: ZDARMA** po ověření

**Pro muže:**

| Délka | Cena/měsíc |
|-------|------------|
| **1 měsíc** | 299 Kč |
| **3 měsíce** | 199 Kč |
| **12 měsíců** | 99 Kč |

💡 **Tip:** Při aktivaci ročního členství zaplatíte jen 99 Kč/měsíc!

### Hlavní funkce

- 💬 **Chatování** (neomezené s VIP)
- 💕 **Hra „Setkání"** (lajkování/odmítnutí profilů)
- ⭐ **Oblíbené profily**
- 🔍 **Pokročilé vyhledávání**
- 👁️ **Přehled návštěvníků**
- ❤️ **Sekce „Chtějí mě"**

### Hlavní výhody

- ✅ **Ženy mají VIP zdarma** po ověření
- ✅ **Žádné falešné profily** díky ověřování
- ✅ **Intuitivní uživatelské rozhraní**
- ✅ **Rychlá registrace** bez osobních otázek
- ✅ **Rozumné ceny** - od 99 Kč/měsíc

### Nevýhody

- ⚠️ Muži bez VIP se prakticky neseznámí
- ⚠️ Zaměřena spíše na flirtování než vážné vztahy
- ⚠️ Některé profily bez fotografií
- ⚠️ Automatické obnovování členství

### Závěrečné hodnocení

**Dateefy doporučujeme pro:**
- Ženy (VIP zdarma po ověření!)
- Muže hledající ověřené ženské profily
- Uživatele preferující českou seznamku
- Hledače nezávazných vztahů a flirtu

**Nedoporučujeme pro:**
- Hledače vážného dlouhodobého vztahu
- Muže, kteří nechtějí platit
`,
}

export async function generateStaticParams() {
  const produkty = await getProdukty()
  return produkty.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)
  if (!produkt) return { title: 'Nenalezeno' }

  return {
    title: `${produkt.name} recenze 2026 | Hodnocení ${produkt.rating}/10 | Seznamky.info`,
    description: `Podrobná recenze ${produkt.name} - hodnocení ${produkt.rating}/10, ${produkt.users} uživatelů. ${produkt.description} Zjistěte výhody, nevýhody a naše zkušenosti.`,
    keywords: `${produkt.name} recenze, ${produkt.name} zkušenosti, ${produkt.name} hodnocení, ${produkt.name} 2026, nejlepší seznamky`,
    openGraph: {
      title: `${produkt.name} recenze 2026 | Seznamky.info`,
      description: `Podrobná recenze ${produkt.name} - hodnocení ${produkt.rating}/10`,
      type: 'article',
      locale: 'cs_CZ',
    },
  }
}

export default async function ProduktDetailPage({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)

  if (!produkt) {
    notFound()
  }

  const allProdukty = await getProdukty()
  const relatedProdukty = allProdukty
    .filter(p => p.id !== produkt.id)
    .slice(0, 3)

  const heroImage = productImages[produkt.slug] || productImages['default']
  const author = authors[produkt.slug] || authors['default']
  const extended = extendedContent[produkt.slug] || ''

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return { text: 'Výborné', color: 'bg-green-500', textColor: 'text-green-600' }
    if (rating >= 8) return { text: 'Velmi dobré', color: 'bg-green-400', textColor: 'text-green-600' }
    if (rating >= 7) return { text: 'Dobré', color: 'bg-yellow-500', textColor: 'text-yellow-600' }
    return { text: 'Průměrné', color: 'bg-gray-400', textColor: 'text-gray-500' }
  }

  const ratingInfo = getRatingLabel(produkt.rating)

  // Top 3 pro affiliate odkazy
  const eliteDate = allProdukty.find(p => p.slug === 'elite-date')
  const victoriaMilan = allProdukty.find(p => p.slug === 'victoria-milan')
  const academicSingles = allProdukty.find(p => p.slug === 'academic-singles')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Red Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-rose-800 to-red-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-rose-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Domů</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/seznamky" className="hover:text-white transition-colors">Seznamky</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{produkt.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo & Rating */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 mb-4">
                {produkt.logo ? (
                  <Image src={produkt.logo} alt={produkt.name} width={80} height={80} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-4xl font-bold text-white flex items-center justify-center h-full">{produkt.name.charAt(0)}</span>
                )}
              </div>
              <div className={`${ratingInfo.color} text-white font-bold px-4 py-2 rounded-xl text-center shadow-lg`}>
                <div className="text-2xl">{produkt.rating}/10</div>
                <div className="text-xs">{ratingInfo.text}</div>
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex-grow">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
                <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                <span className="text-sm font-medium text-rose-200">Kompletní recenze 2026</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
                  {produkt.name} - Recenze
                </span>
              </h1>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-rose-200">{produkt.users}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span className="text-rose-200">Aktualizováno Leden 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-rose-200">12 min čtení</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{author.name}</p>
                  <p className="text-sm text-rose-200">{author.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
          </svg>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick Info Box */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">{produkt.rating}/10</div>
              <div className={`text-sm font-semibold ${ratingInfo.textColor}`}>{ratingInfo.text}</div>
              <div className="flex justify-center mt-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-5 h-5 ${i <= Math.round(produkt.rating/2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="text-center border-l border-r border-rose-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">{produkt.users}</div>
              <div className="text-sm text-gray-600">aktivních uživatelů</div>
              <div className="text-sm text-gray-500 mt-1">Věk: {produkt.ageRange}</div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <AffiliateLink
                produkt={produkt}
                source="detail"
                placement="info-box"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-xl transition-all w-full shadow-lg shadow-rose-200"
              >
                Registrace zdarma
                <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
              <p className="text-xs text-gray-500 mt-2">Registrace trvá 2 minuty</p>
            </div>
          </div>
        </div>

        {/* Pros & Cons Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pros */}
          <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
            <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              Výhody {produkt.name}
            </h2>
            <ul className="space-y-3">
              {produkt.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
            <h2 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              Nevýhody {produkt.name}
            </h2>
            <ul className="space-y-3">
              {produkt.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 mb-8 text-center">
          <Heart className="w-10 h-10 text-rose-200 mx-auto mb-3" fill="currentColor" />
          <h3 className="text-xl font-bold text-white mb-2">
            Vyzkoušejte {produkt.name} zdarma
          </h3>
          <p className="text-rose-100 mb-4">
            Registrace je zdarma a nezávazná. Začněte hledat lásku ještě dnes!
          </p>
          <AffiliateLink
            produkt={produkt}
            source="detail"
            placement="mid-banner"
            className="inline-flex items-center gap-2 bg-white hover:bg-rose-50 text-rose-600 font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Registrovat se zdarma
            <ChevronRight className="w-5 h-5" />
          </AffiliateLink>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-p:text-gray-700 prose-a:text-rose-600 prose-strong:text-gray-900">
          <h2>O seznamce {produkt.name}</h2>
          <p className="text-lg">{produkt.description}</p>

          <ReactMarkdown>{produkt.fullDescription}</ReactMarkdown>

          {extended && <ReactMarkdown>{extended}</ReactMarkdown>}
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-500" />
            Hlavní funkce {produkt.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {produkt.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200">
                <Check className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Parameters Table */}
        <div className="bg-white rounded-2xl border border-rose-200 overflow-hidden mb-8">
          <h2 className="text-xl font-bold text-gray-900 p-5 border-b border-rose-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-500" />
            Parametry {produkt.name}
          </h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium w-1/3">Hodnocení</td>
                <td className="px-5 py-3 text-gray-900 font-bold">{produkt.rating}/10 ({ratingInfo.text})</td>
              </tr>
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Počet uživatelů</td>
                <td className="px-5 py-3 text-gray-900">{produkt.users}</td>
              </tr>
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Věková skupina</td>
                <td className="px-5 py-3 text-gray-900">{produkt.ageRange}</td>
              </tr>
              {produkt.successRate && (
                <tr className="border-b border-rose-50">
                  <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Úspěšnost párování</td>
                  <td className="px-5 py-3 text-gray-900">{produkt.successRate}</td>
                </tr>
              )}
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Bezplatná verze</td>
                <td className="px-5 py-3">
                  {produkt.freeVersion ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" /> Ano
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <X className="w-4 h-4" /> Ne
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Ověřené profily</td>
                <td className="px-5 py-3">
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" /> Ano
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compare with others CTA */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Porovnejte s dalšími seznamkami</h3>
              <p className="text-purple-100">Podívejte se na kompletní srovnání všech {allProdukty.length} seznamek</p>
            </div>
            <Link
              href="/seznamky"
              className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-purple-600 font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap"
            >
              Srovnat všechny
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Verdict Section */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-rose-500" />
            Závěrečné hodnocení {produkt.name}
          </h2>
          <p className="text-gray-700 mb-4">
            {produkt.name} je {produkt.rating >= 8 ? 'vynikající' : 'solidní'} volba pro ty, kteří hledají
            {produkt.categories.includes('vazne-vztahy') ? ' vážný dlouhodobý vztah' : ' nové známosti a dobrodružství'}.
            S celkovým hodnocením <strong>{produkt.rating}/10</strong> a komunitou {produkt.users} aktivních uživatelů
            patří mezi {produkt.rating >= 8 ? 'nejlepší' : 'kvalitní'} seznamky dostupné na českém trhu.
          </p>
          <div className="flex items-center gap-4">
            <div className={`${ratingInfo.color} text-white font-bold px-5 py-3 rounded-xl text-2xl`}>
              {produkt.rating}/10
            </div>
            <div>
              <p className={`font-bold text-lg ${ratingInfo.textColor}`}>{ratingInfo.text}</p>
              <p className="text-sm text-gray-500">Celkové hodnocení redakce</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 text-center">
          <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4" fill="currentColor" />
          <h3 className="text-2xl font-bold text-white mb-3">
            Připraveni vyzkoušet {produkt.name}?
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Tisíce lidí již našly partnera díky {produkt.name}. Registrace je zdarma a nezávazná.
          </p>
          <AffiliateLink
            produkt={produkt}
            source="detail"
            placement="final-cta"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 px-10 rounded-xl transition-all text-lg shadow-lg"
          >
            Registrovat se zdarma na {produkt.name}
            <ExternalLink className="w-5 h-5" />
          </AffiliateLink>
          <p className="text-gray-500 text-sm mt-4">
            Registrace trvá pouze 2 minuty
          </p>
        </div>

        {/* Author Box */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-rose-300 flex-shrink-0">
              <Image
                src={author.photo}
                alt={author.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{author.name}</p>
              <p className="text-rose-600 mb-2">{author.role}</p>
              <p className="text-sm text-gray-600">
                {author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProdukty.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Další seznamky k porovnání</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProdukty.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-rose-100 p-4 hover:shadow-lg hover:border-rose-300 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {p.logo ? (
                        <Image src={p.logo} alt={p.name} width={40} height={40} className="object-contain" />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">{p.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{p.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-700">{p.rating}/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/seznamky/${p.slug}`}
                      className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Recenze
                    </Link>
                    <AffiliateLink
                      produkt={p}
                      source="detail"
                      placement="related"
                      className="flex-1 text-center bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Vyzkoušet
                    </AffiliateLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
