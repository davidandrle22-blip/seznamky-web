/**
 * Vstupní stránky /seznameni/[slug] – seznámení podle měst, krajů, věku a „kdo koho hledá“.
 * Obsah je psaný ručně pro každé místo (tipy na rande), žebříček se skládá z našich hodnocených seznamek.
 */

export type LandingType = 'mesto' | 'kraj' | 'kdo' | 'vek'

export interface Landing {
  slug: string
  type: LandingType
  /** Krátký název do odkazů (Praha, Jihomoravský kraj, On hledá ji…) */
  name: string
  h1: string
  metaTitle: string
  metaDescription: string
  /** Úvodní odstavec pod H1 */
  lead: string
  /** Hlavní text (markdown) */
  body: string
  /** Seznamky v pořadí doporučení */
  picks: string[]
  /** Slug kraje (u města) */
  kraj?: string
  faq?: { question: string; answer: string }[]
}

// ---------- Výchozí žebříčky ----------

/** Obecný žebříček pro města a kraje – vážný vztah, flirt i diskrétní seznámení */
const GENERAL = [
  'elite-date', 'victoria-milan', 'academic-singles', 'flirtkontakt', 'singles50', 'be2',
  'dateefy', 'eroticky-kontakt', 'freerande', 'cesky-flirt', 'nalovu', 'yellobar',
]

// ---------- Města ----------

interface City {
  slug: string
  name: string
  /** „v Praze“, „v Brně“… */
  loc: string
  kraj: string
  /** 1–2 věty o seznamovací scéně */
  scene: string
  /** Tipy na první rande (skutečná místa) */
  dates: string[]
  /** Kam na výlet ve dvou */
  trip: string
}

const CITIES: City[] = [
  { slug: 'praha', name: 'Praha', loc: 'v Praze', kraj: 'stredocesky-kraj',
    scene: 'Praha má největší počet singles v Česku a na seznamkách je tu nejvíc aktivních profilů. Výhodou je obrovský výběr, nevýhodou rychlé tempo a lidé, kteří si často „jen píšou“.',
    dates: ['procházka po Náplavce a drink u řeky', 'výhled z Letné nebo z Vyšehradu', 'kavárny na Vinohradech a v Karlíně', 'Petřín a Strahovská zahrada za západu slunce'],
    trip: 'Výlet do Českého ráje nebo na Karlštejn zvládnete i bez auta.' },
  { slug: 'brno', name: 'Brno', loc: 'v Brně', kraj: 'jihomoravsky-kraj',
    scene: 'Brno je univerzitní město s mladou komunitou. Kromě studentů tu žije hodně lidí kolem třicítky, kteří zůstali po škole a hledají vztah.',
    dates: ['procházka na Špilberk a výhled na město', 'park Lužánky nebo Kraví hora', 'kavárny a bary v centru kolem Jakubského náměstí', 'léto na Brněnské přehradě'],
    trip: 'Vinné sklepy na jižní Moravě nebo Moravský kras jsou kousek.' },
  { slug: 'ostrava', name: 'Ostrava', loc: 'v Ostravě', kraj: 'moravskoslezsky-kraj',
    scene: 'Ostrava je třetí největší město v Česku a místní lidé jsou známí přímostí. Na seznamkách to platí taky: méně hraní, víc konkrétních domluv.',
    dates: ['Dolní oblast Vítkovice a vyhlídka z Bolt Tower', 'večer na Stodolní ulici', 'Komenského sady a procházka podél Ostravice', 'ZOO Ostrava'],
    trip: 'Beskydy a Lysá hora jsou na víkendový výlet ideální.' },
  { slug: 'plzen', name: 'Plzeň', loc: 'v Plzni', kraj: 'plzensky-kraj',
    scene: 'Plzeň je studentské i pracovní město s velkou komunitou lidí 25–45. Na seznamkách se tu často potkávají lidé z celého Plzeňského kraje.',
    dates: ['káva na náměstí Republiky', 'kulturní centrum DEPO2015', 'Techmania science center', 'procházka kolem Velkého Boleveckého rybníka'],
    trip: 'Šumava nebo Klatovy jsou na společný výlet kousek.' },
  { slug: 'liberec', name: 'Liberec', loc: 'v Liberci', kraj: 'liberecky-kraj',
    scene: 'Liberec je menší krajské město s univerzitou a blízkými horami. Seznamování tu často propojuje lásku ke sportu a přírodě.',
    dates: ['výlet na Ještěd s výhledem', 'zábavní centrum iQLANDIA', 'Lidové sady a ZOO Liberec', 'procházka u Harcovské přehrady'],
    trip: 'Jizerské hory nabízí běžky v zimě a kolo v létě.' },
  { slug: 'olomouc', name: 'Olomouc', loc: 'v Olomouci', kraj: 'olomoucky-kraj',
    scene: 'Olomouc je jedno z nejvíc studentských měst v Česku. Atmosféra je klidná a lidé se rádi potkávají osobně, ne jen přes chat.',
    dates: ['Horní náměstí a Sloup Nejsvětější Trojice', 'Bezručovy sady', 'výlet na Svatý Kopeček', 'kavárny v historickém centru'],
    trip: 'Jeseníky jsou na víkendový výlet ve dvou ideální.' },
  { slug: 'usti-nad-labem', name: 'Ústí nad Labem', loc: 'v Ústí nad Labem', kraj: 'ustecky-kraj',
    scene: 'Ústí nad Labem je univerzitní město v údolí Labe. Online seznamky tu pomáhají hlavně lidem, kteří chtějí poznat někoho i z okolních měst.',
    dates: ['zámeček Větruše s výhledem na Labe', 'hrad Střekov', 'procházka po labském nábřeží', 'kavárny v centru'],
    trip: 'České středohoří a Labské pískovce jsou za rohem.' },
  { slug: 'ceske-budejovice', name: 'České Budějovice', loc: 'v Českých Budějovicích', kraj: 'jihocesky-kraj',
    scene: 'České Budějovice jsou přirozeným centrem jižních Čech. Lidé tu hledají spíš klidnější a dlouhodobější vztahy.',
    dates: ['náměstí Přemysla Otakara II. a Černá věž', 'park Stromovka', 'procházka podél Malše a Vltavy', 'výlet na zámek Hluboká'],
    trip: 'Český Krumlov a Lipno jsou kousek.' },
  { slug: 'hradec-kralove', name: 'Hradec Králové', loc: 'v Hradci Králové', kraj: 'kralovehradecky-kraj',
    scene: 'Hradec Králové je zelené univerzitní město. Na seznamkách tu najdete studenty i lidi, kteří si zakládají rodinu.',
    dates: ['Velké náměstí a Bílá věž', 'Jiráskovy sady u soutoku Labe a Orlice', 'Galerie moderního umění a kavárny v centru', 'procházka v Lesoparku Na Plachtě'],
    trip: 'Krkonoše a Adršpach jsou na výlet ve dvou ideální.' },
  { slug: 'pardubice', name: 'Pardubice', loc: 'v Pardubicích', kraj: 'pardubicky-kraj',
    scene: 'Pardubice jsou rovinaté město kol a parků. Lidé tu rádi spojují rande s pohybem: kolo, procházka, brusle.',
    dates: ['Pernštýnské náměstí a Zelená brána', 'pardubický zámek a zámecké valy', 'Tyršovy sady', 'výlet na Kunětickou horu'],
    trip: 'Železné hory a Seč jsou blízko.' },
  { slug: 'havirov', name: 'Havířov', loc: 'v Havířově', kraj: 'moravskoslezsky-kraj',
    scene: 'Havířov je velké město v blízkosti Ostravy. Online seznamky tu pomáhají rozšířit okruh lidí na celé Ostravsko.',
    dates: ['procházka u Těrlické přehrady', 'Žermanická přehrada v létě', 'kavárny v centru', 'výlet do Beskyd'],
    trip: 'Beskydy jsou kousek a na víkend ideální.' },
  { slug: 'zlin', name: 'Zlín', loc: 've Zlíně', kraj: 'zlinsky-kraj',
    scene: 'Zlín je Baťovo město s univerzitou a kreativní komunitou. Na seznamkách je tu poměrně hodně lidí, kteří chtějí vážný vztah.',
    dates: ['Baťův institut 14|15', 'zámek a park Komenského', 'procházka po Baťových domcích a vyhlídkách', 'výlet do Luhačovic'],
    trip: 'Lázně Luhačovice a Vizovické vrchy jsou na výlet ideální.' },
  { slug: 'jindrichuv-hradec', name: 'Jindřichův Hradec', loc: 'v Jindřichově Hradci', kraj: 'jihocesky-kraj',
    scene: 'V menším městě se lidé často znají. Online seznamka pomůže poznat někoho i z okolních obcí a měst.',
    dates: ['zámek Jindřichův Hradec', 'procházka kolem rybníka Vajgar', 'kavárny na náměstí Míru', 'výlet do České Kanady'],
    trip: 'Česká Kanada a Třeboňsko nabízí klidné výlety.' },
  { slug: 'znojmo', name: 'Znojmo', loc: 've Znojmě', kraj: 'jihomoravsky-kraj',
    scene: 'Znojmo je vinařské město s pohodovou atmosférou. Seznamování tu často začíná u sklenky vína.',
    dates: ['znojemské podzemí', 'Rotunda sv. Kateřiny a vyhlídky nad Dyjí', 'vinné sklepy v okolí', 'Národní park Podyjí'],
    trip: 'Národní park Podyjí a vinařské obce jsou na výlet ideální.' },
  { slug: 'sumperk', name: 'Šumperk', loc: 'v Šumperku', kraj: 'olomoucky-kraj',
    scene: 'Šumperk je brána do Jeseníků. Lidé tu oceňují partnery, kteří mají rádi hory a přírodu.',
    dates: ['procházka historickým centrem', 'výlet na Dolní Moravu a Stezku v oblacích', 'túra v Jeseníkách', 'kavárny v centru'],
    trip: 'Jeseníky, Praděd a lázně Velké Losiny jsou kousek.' },
  { slug: 'kladno', name: 'Kladno', loc: 'na Kladně', kraj: 'stredocesky-kraj',
    scene: 'Kladno je největší město Středočeského kraje a leží kousek od Prahy. Na seznamkách se tu propojuje kladenská a pražská komunita.',
    dates: ['zámecký park', 'procházka v centru a na náměstí Starosty Pavla', 'výlet do Lán a na Křivoklátsko', 'rande v Praze, která je kousek'],
    trip: 'Křivoklátsko a hrad Křivoklát jsou na výlet ideální.' },
  { slug: 'frydek-mistek', name: 'Frýdek-Místek', loc: 've Frýdku-Místku', kraj: 'moravskoslezsky-kraj',
    scene: 'Frýdek-Místek leží pod Beskydami. Seznamování tu často propojuje lásku k horám a sportu.',
    dates: ['procházka kolem přehrady Olešná', 'Frýdecký zámek', 'výstup na Lysou horu', 'kavárny v centru'],
    trip: 'Beskydy a Pustevny jsou na dosah.' },
  { slug: 'karvina', name: 'Karviná', loc: 'v Karviné', kraj: 'moravskoslezsky-kraj',
    scene: 'Karviná je město na hranici s Polskem. Online seznamka pomůže poznat lidi z celého Karvinska i Ostravska.',
    dates: ['zámek Fryštát a zámecký park', 'Lázně Darkov', 'procházka v centru Fryštátu', 'výlet do Beskyd'],
    trip: 'Beskydy a Těšínsko jsou kousek.' },
  { slug: 'most', name: 'Most', loc: 'v Mostě', kraj: 'ustecky-kraj',
    scene: 'Most je město s nově vzniklým jezerem a hipodromem. Na seznamkách se tu potkávají lidé z celého Mostecka a Chomutovska.',
    dates: ['procházka kolem jezera Most', 'hrad Hněvín s výhledem', 'přesunutý kostel Nanebevzetí Panny Marie', 'dostihy na Hipodromu Most'],
    trip: 'Krušné hory jsou kousek.' },
  { slug: 'opava', name: 'Opava', loc: 'v Opavě', kraj: 'moravskoslezsky-kraj',
    scene: 'Opava je historické slezské město s univerzitou. Lidé tu hledají spíš klidné a stabilní vztahy.',
    dates: ['Městské sady', 'Slezské zemské muzeum', 'výlet na zámek Hradec nad Moravicí', 'kavárny v centru'],
    trip: 'Hradec nad Moravicí a Jeseníky jsou blízko.' },
  { slug: 'jihlava', name: 'Jihlava', loc: 'v Jihlavě', kraj: 'vysocina',
    scene: 'Jihlava je krajské město Vysočiny s pohodovým tempem. Online seznamky pomáhají poznat lidi z celého kraje.',
    dates: ['ZOO Jihlava', 'Masarykovo náměstí', 'jihlavské podzemí', 'procházka v Heulose'],
    trip: 'Vysočina nabízí rybníky, lesy a klidné výlety.' },
  { slug: 'teplice', name: 'Teplice', loc: 'v Teplicích', kraj: 'ustecky-kraj',
    scene: 'Teplice jsou lázeňské město s parky a klidnou atmosférou. Seznamování tu má pohodové tempo.',
    dates: ['Zámecká zahrada', 'lázeňské parky', 'hrad Doubravka s výhledem', 'kavárny v centru'],
    trip: 'Krušné hory a České středohoří jsou kousek.' },
  { slug: 'decin', name: 'Děčín', loc: 'v Děčíně', kraj: 'ustecky-kraj',
    scene: 'Děčín leží u vstupu do Českého Švýcarska. Lidé tu oceňují partnery, kteří mají rádi přírodu.',
    dates: ['Děčínský zámek a Růžová zahrada', 'vyhlídka z Pastýřské stěny', 'procházka podél Labe', 'výlet do Českého Švýcarska'],
    trip: 'Pravčická brána a Hřensko jsou kousek.' },
  { slug: 'karlovy-vary', name: 'Karlovy Vary', loc: 'v Karlových Varech', kraj: 'karlovarsky-kraj',
    scene: 'Karlovy Vary jsou lázeňské město s mezinárodní atmosférou. Na seznamkách se tu potkávají místní i lidé z okolí.',
    dates: ['procházka po kolonádách', 'rozhledna Diana', 'lázeňské lesy', 'kavárny podél Teplé'],
    trip: 'Loket a Mariánské Lázně jsou na výlet ideální.' },
  { slug: 'chomutov', name: 'Chomutov', loc: 'v Chomutově', kraj: 'ustecky-kraj',
    scene: 'Chomutov leží pod Krušnými horami. Online seznamky pomáhají poznat lidi z celého Chomutovska a Mostecka.',
    dates: ['Kamencové jezero', 'Podkrušnohorský zoopark', 'procházka historickým centrem', 'výlet do Krušných hor'],
    trip: 'Krušné hory jsou ideální na výlet i v zimě.' },
  { slug: 'jablonec-nad-nisou', name: 'Jablonec nad Nisou', loc: 'v Jablonci nad Nisou', kraj: 'liberecky-kraj',
    scene: 'Jablonec je město skla a bižuterie kousek od Liberce. Na seznamkách se tu často potkávají lidé z obou měst.',
    dates: ['procházka kolem přehrady Mšeno', 'Muzeum skla a bižuterie', 'kavárny v centru', 'výlet do Jizerských hor'],
    trip: 'Jizerské hory jsou přímo za městem.' },
]

// ---------- Kraje ----------

interface Kraj {
  slug: string
  name: string
  loc: string
  scene: string
  nature: string
}

const KRAJE: Kraj[] = [
  { slug: 'stredocesky-kraj', name: 'Středočeský kraj', loc: 've Středočeském kraji',
    scene: 'Středočeský kraj obepíná Prahu. Hodně lidí tu dojíždí za prací do hlavního města, a proto se na seznamkách běžně potkávají lidé z Prahy i okolních měst.',
    nature: 'Křivoklátsko, Kokořínsko a Brdy' },
  { slug: 'jihocesky-kraj', name: 'Jihočeský kraj', loc: 'v Jihočeském kraji',
    scene: 'Jižní Čechy jsou kraj menších měst, rybníků a klidného tempa. Online seznamka tu pomáhá překonat vzdálenosti mezi městy.',
    nature: 'Šumava, Třeboňsko a Lipno' },
  { slug: 'jihomoravsky-kraj', name: 'Jihomoravský kraj', loc: 'v Jihomoravském kraji',
    scene: 'Jižní Morava má velké centrum v Brně a spoustu vinařských obcí kolem. Na seznamkách tu najdete studenty, rodiče i milovníky vína.',
    nature: 'Pálava, Lednicko-valtický areál a Moravský kras' },
  { slug: 'karlovarsky-kraj', name: 'Karlovarský kraj', loc: 'v Karlovarském kraji',
    scene: 'Karlovarský kraj je nejmenší kraj v Česku. Proto se vyplatí hledat na seznamkách s větší komunitou a rozšířit okruh i na okolní kraje.',
    nature: 'Slavkovský les, Krušné hory a lázeňský trojúhelník' },
  { slug: 'kralovehradecky-kraj', name: 'Královéhradecký kraj', loc: 'v Královéhradeckém kraji',
    scene: 'Královéhradecký kraj spojuje univerzitní Hradec Králové s horskými oblastmi. Lidé tu rádi spojují rande s výlety.',
    nature: 'Krkonoše, Orlické hory a Adršpašsko-teplické skály' },
  { slug: 'liberecky-kraj', name: 'Liberecký kraj', loc: 'v Libereckém kraji',
    scene: 'Liberecký kraj je hornatý a sportovní. Na seznamkách tu potkáte hodně lidí, kteří tráví víkendy venku.',
    nature: 'Jizerské hory, Český ráj a Lužické hory' },
  { slug: 'moravskoslezsky-kraj', name: 'Moravskoslezský kraj', loc: 'v Moravskoslezském kraji',
    scene: 'Moravskoslezský kraj je druhý nejlidnatější kraj v Česku. Velká města leží blízko sebe, takže výběr na seznamkách je široký.',
    nature: 'Beskydy, Jeseníky a Poodří' },
  { slug: 'olomoucky-kraj', name: 'Olomoucký kraj', loc: 'v Olomouckém kraji',
    scene: 'Olomoucký kraj spojuje studentskou Olomouc s horským severem. Lidé tu hledají spíš klidné a dlouhodobé vztahy.',
    nature: 'Jeseníky, Litovelské Pomoraví a Hostýnské vrchy' },
  { slug: 'pardubicky-kraj', name: 'Pardubický kraj', loc: 'v Pardubickém kraji',
    scene: 'Pardubický kraj má rovinatý sever a hornatý jih. Seznamky tu pomáhají propojit lidi z Pardubic, Chrudimi i Svitav.',
    nature: 'Železné hory, Orlické hory a Králický Sněžník' },
  { slug: 'plzensky-kraj', name: 'Plzeňský kraj', loc: 'v Plzeňském kraji',
    scene: 'Plzeňský kraj má silné centrum v Plzni a hodně menších měst kolem. Online seznamka tu výrazně rozšíří výběr.',
    nature: 'Šumava, Brdy a Český les' },
  { slug: 'ustecky-kraj', name: 'Ústecký kraj', loc: 'v Ústeckém kraji',
    scene: 'Ústecký kraj má hodně středně velkých měst blízko u sebe. Na seznamkách se tu snadno potkáte s lidmi z Ústí, Teplic, Mostu i Děčína.',
    nature: 'České Švýcarsko, České středohoří a Krušné hory' },
  { slug: 'vysocina', name: 'Vysočina', loc: 'na Vysočině',
    scene: 'Vysočina je kraj menších měst a klidné přírody. Lidé tu hledají spíš vážný vztah a online seznamka jim pomáhá překonat vzdálenosti.',
    nature: 'Žďárské vrchy, Telč a rybníky kolem Pelhřimova' },
  { slug: 'zlinsky-kraj', name: 'Zlínský kraj', loc: 've Zlínském kraji',
    scene: 'Zlínský kraj spojuje Zlín, Uherské Hradiště a Valašsko. Na seznamkách tu najdete hodně lidí, kteří hledají vážný vztah.',
    nature: 'Beskydy, Bílé Karpaty a Luhačovice' },
]

// ---------- Skládání obsahu ----------

function cityLanding(c: City): Landing {
  const kraj = KRAJE.find(k => k.slug === c.kraj)
  const body = `## Jak se seznámit ${c.loc}

${c.scene}

Online seznamky nejsou vázané na jedno město. Na všech seznamkách v našem žebříčku si v hledání nastavíte své město a vzdálenost, ze které chcete lidi vidět. Čím menší město, tím víc se vyplatí okruh rozšířit${kraj ? ` na ${kraj.name === 'Vysočina' ? 'celou Vysočinu' : `celý ${kraj.name}`}` : ''}.

## Kterou seznamku vybrat ${c.loc}

- **Vážný vztah:** seznamky s osobnostním testem jako [ELITE Date](/seznamky/elite-date) nebo [Academic Singles](/seznamky/academic-singles). Doporučí vám lidi s podobnými hodnotami z okolí.
- **Flirt a nezávazné seznámení:** české seznamky [FlirtKontakt](/seznamky/flirtkontakt) nebo [Dateefy](/seznamky/dateefy), kde je hodně aktivních lidí z celé republiky.
- **Diskrétní seznámení:** [Victoria Milan](/seznamky/victoria-milan) s možností rozmazaných fotek.
- **Po padesátce:** [Singles50](/seznamky/singles50) se zaměřením na zralé singles.

## Tipy na první rande ${c.loc}

${c.dates.map(d => `- ${d.charAt(0).toUpperCase()}${d.slice(1)}`).join('\n')}

${c.trip} Další inspiraci najdete v článku [kam na první rande](/clanky/kam-na-prvni-rande).

## Bezpečně i ${c.loc}

První schůzku si domluvte na veřejném místě, řekněte o ní někomu blízkému a nikdy neposílejte peníze člověku, kterého jste osobně nepotkali. Víc v článku [online seznamování a bezpečnost](/clanky/online-seznamovani-bezpecnost).`
  return {
    slug: c.slug,
    type: 'mesto',
    name: c.name,
    kraj: c.kraj,
    h1: `Seznamka ${c.name}: kde se seznámit ${c.loc}`,
    metaTitle: `Seznamka ${c.name} {Y} – nejlepší seznamky ${c.loc}`,
    metaDescription: `Hledáte partnera ${c.loc}? Srovnání seznamek, které fungují ${c.loc}, tipy na první rande a rady, jak se seznámit bezpečně.`,
    lead: `Nejlepší seznamky pro seznámení ${c.loc} a okolí. Vybrali jsme ty s největší českou komunitou a přidali tipy, kam ${c.loc} na první rande.`,
    body,
    picks: GENERAL,
    faq: [
      { question: `Existuje speciální seznamka jen pro ${c.name}?`, answer: `Specializované městské seznamky mají obvykle málo uživatelů. Lepší je velká česká seznamka, kde si v hledání nastavíte město ${c.name} a vzdálenost.` },
      { question: `Kterou seznamku ${c.loc} doporučujete?`, answer: 'Pro vážný vztah ELITE Date, pro flirt FlirtKontakt, pro diskrétní seznámení Victoria Milan a pro lidi 50+ Singles50.' },
    ],
  }
}

function krajLanding(k: Kraj): Landing {
  const cities = CITIES.filter(c => c.kraj === k.slug)
  const cityLinks = cities.length
    ? `\n\nSeznamky pro jednotlivá města: ${cities.map(c => `[${c.name}](/seznameni/${c.slug})`).join(', ')}.`
    : ''
  const body = `## Seznamování ${k.loc}

${k.scene}${cityLinks}

## Jak vybrat seznamku ${k.loc}

1. **Ujasněte si, co hledáte.** Vážný vztah, flirt, nebo diskrétní setkání? Každý typ má jiné seznamky.
2. **Nastavte okruh hledání.** U všech seznamek v žebříčku si zvolíte vzdálenost, ze které chcete lidi vidět.
3. **Vyzkoušejte dvě nebo tři seznamky.** Registrace je zdarma a rychle uvidíte, kde je ve vašem okolí nejvíc aktivních lidí.

Podrobný návod najdete v článku [jak vybrat správnou seznamku](/clanky/jak-vybrat-spravnou-seznamku).

## Rande ${k.loc}

Na první schůzku je nejlepší kavárna nebo procházka ve městě. Až se poznáte, můžete vyrazit na výlet: ${k.nature}. Inspiraci najdete v článku [kam na první rande](/clanky/kam-na-prvni-rande).`
  return {
    slug: `seznamka-${k.slug}`,
    type: 'kraj',
    name: k.name,
    h1: `Seznamka ${k.name}: seznámení ${k.loc}`,
    metaTitle: `Seznamka ${k.name} {Y} – nejlepší seznamky ${k.loc}`,
    metaDescription: `Seznamky, které fungují ${k.loc}. Srovnání pro vážný vztah, flirt i diskrétní seznámení a tipy na rande ${k.loc}.`,
    lead: `Srovnání seznamek pro seznámení ${k.loc}. Najděte partnera ve svém okolí, ať hledáte vztah, flirt, nebo diskrétní setkání.`,
    body,
    picks: GENERAL,
  }
}

// ---------- Kdo koho hledá ----------

const KDO: Landing[] = [
  {
    slug: 'on-hleda-ji', type: 'kdo', name: 'On hledá ji',
    h1: 'On hledá ji: seznamky pro muže, kteří hledají ženu',
    metaTitle: 'On hledá ji {Y} – nejlepší seznamky pro muže, kteří hledají ženu',
    metaDescription: 'Kde jako muž najít ženu? Srovnání seznamek pro vážný vztah, flirt i diskrétní seznámení a tipy, jak na seznamce zaujmout.',
    lead: 'Seznamky, kde mají muži největší šanci najít ženu: od vážného vztahu po flirt.',
    body: `## Kde jako muž hledat ženu

Na většině seznamek je víc mužů než žen. Proto se vyplatí vybírat seznamky, kde je poměr vyrovnanější, nebo kde jsou ženy zdarma.

- **Vážný vztah:** [ELITE Date](/seznamky/elite-date) a [Academic Singles](/seznamky/academic-singles) mají téměř vyrovnaný poměr mužů a žen.
- **Flirt:** [FlirtKontakt](/seznamky/flirtkontakt) je pro ženy zdarma, a proto je jich tu víc.
- **Diskrétní seznámení:** [Victoria Milan](/seznamky/victoria-milan).

## Jak zaujmout

Dobré fotky, konkrétní profil a osobní první zpráva. Kompletní návod najdete v článku [tipy pro muže na seznamce](/clanky/tipy-pro-muze-na-seznamce) a [jak oslovit ženu na seznamce](/clanky/jak-oslovit-zenu-na-seznamce).`,
    picks: ['elite-date', 'flirtkontakt', 'victoria-milan', 'academic-singles', 'singles50', 'be2', 'dateefy', 'eroticky-kontakt', 'freerande', 'cesky-flirt'],
  },
  {
    slug: 'ona-hleda-jeho', type: 'kdo', name: 'Ona hledá jeho',
    h1: 'Ona hledá jeho: seznamky pro ženy, které hledají muže',
    metaTitle: 'Ona hledá jeho {Y} – nejlepší seznamky pro ženy',
    metaDescription: 'Kde jako žena najít muže? Seznamky, které jsou pro ženy zdarma, bezpečné a mají seriózní muže. Tipy, jak vybírat a chránit se.',
    lead: 'Seznamky, kde ženy najdou seriózní muže, a ty, které jsou pro ženy zdarma.',
    body: `## Kde jako žena hledat muže

Ženy mají na seznamkách výhodu: dostávají víc zpráv a vybírají si. Důležité je proto vybrat seznamku, kde jsou muži seriózní a profily ověřené.

- **Vážný vztah:** [ELITE Date](/seznamky/elite-date) profily ručně kontroluje a lidé tu hledají vztah.
- **Vzdělaný partner:** [Academic Singles](/seznamky/academic-singles).
- **Flirt zdarma:** [FlirtKontakt](/seznamky/flirtkontakt) je pro ženy zcela zdarma.
- **Úspěšní muži:** [Elite Meets Beauty](/seznamky/elite-meets-beauty).

## Bezpečnost na prvním místě

Používejte přezdívku, neposílejte osobní údaje hned na začátku a na první schůzku jděte na veřejné místo. Víc v článcích [tipy pro ženy na seznamce](/clanky/tipy-pro-zeny-na-seznamce) a [jak poznat falešný profil](/clanky/jak-poznat-falesny-profil).`,
    picks: ['elite-date', 'academic-singles', 'flirtkontakt', 'victoria-milan', 'be2', 'singles50', 'elite-meets-beauty', 'dateefy', 'cesky-flirt', 'yellobar'],
  },
  {
    slug: 'on-hleda-jeho', type: 'kdo', name: 'On hledá jeho',
    h1: 'On hledá jeho: gay seznamky pro muže',
    metaTitle: 'On hledá jeho {Y} – nejlepší gay seznamky v Česku',
    metaDescription: 'Gay seznamky pro muže, kteří hledají muže. České i mezinárodní seznamky pro vztah, flirt i nezávazné setkání.',
    lead: 'České i mezinárodní gay seznamky pro vztah, flirt i nezávazné setkání.',
    body: `## Kde hledají muži muže

V Česku fungují domácí gay seznamky s dlouhou historií i velké mezinárodní aplikace.

- **České gay seznamky:** [GKontakt](/seznamky/gkontakt) s velkou komunitou a [Kerl](/seznamky/kerl) bez měsíčních poplatků.
- **Mezinárodní aplikace:** [Grindr](/seznamky/grindr) pro rychlé seznámení v okolí, [PlanetRomeo](/seznamky/planetromeo) pro vztahy i přátelství.

Kompletní přehled najdete v kategorii [gay seznamky](/kategorie/gay-seznamky).

## Diskrétnost a bezpečnost

Na gay seznamkách je diskrétnost obzvlášť důležitá. Nesdílejte hned obličej ani adresu a první schůzku si domluvte na veřejném místě.`,
    picks: ['gkontakt', 'kerl', 'grindr', 'planetromeo', 'tsdates'],
  },
  {
    slug: 'ona-hleda-ji', type: 'kdo', name: 'Ona hledá ji',
    h1: 'Ona hledá ji: seznamky pro ženy, které hledají ženu',
    metaTitle: 'Ona hledá ji {Y} – lesbické seznamky a seznamky pro ženy',
    metaDescription: 'Kde se seznámit jako žena se ženou? Lesbické seznamky a seznamky, které umožňují hledat partnerku stejného pohlaví.',
    lead: 'Lesbické seznamky a seznamky, kde můžete hledat partnerku stejného pohlaví.',
    body: `## Kde hledají ženy ženy

Specializovaných lesbických seznamek je v Česku málo. Proto se vyplatí kombinovat specializovanou aplikaci se seznamkou, která umožňuje hledat partnerku stejného pohlaví.

- **Lesbická aplikace:** [HER](/seznamky/her) je největší aplikace pro lesbické, bi a queer ženy.
- **Seznamky s volbou stejného pohlaví:** [OkCupid](/seznamky/okcupid) a [Academic Singles](/seznamky/academic-singles).

Další možnosti najdete v kategorii [gay a LGBT seznamky](/kategorie/gay-seznamky).`,
    picks: ['her', 'okcupid', 'academic-singles', 'elite-date', 'flirtkontakt'],
  },
  {
    slug: 'on-hleda-par', type: 'kdo', name: 'On hledá pár',
    h1: 'On hledá pár: seznamky pro muže, kteří hledají pár',
    metaTitle: 'On hledá pár {Y} – seznamky pro páry a swingers',
    metaDescription: 'Seznamky, kde muži najdou páry a swingers. Kde hledat, jak napsat profil a na co si dát pozor.',
    lead: 'Seznamky pro páry a swingers, kde muži najdou páry otevřené novým zážitkům.',
    body: `## Kde hledat pár

Páry hledají nejčastěji na velkých seznamkách pro dospělé, které umožňují profil páru.

- [AdultFriendFinder](/seznamky/adult-friend-finder) má jednu z největších komunit párů a swingers.
- [Victoria Milan](/seznamky/victoria-milan) pro diskrétní setkání.
- České erotické seznamky jako [Erotický kontakt](/seznamky/eroticky-kontakt).

## Na co myslet

Páry si vybírají pečlivě. Buďte konkrétní, respektujte jejich pravidla a počítejte s tím, že komunikují oba partneři. Víc v článku [seznamka pro páry a swingers](/clanky/seznamka-pro-pary).`,
    picks: ['adult-friend-finder', 'victoria-milan', 'eroticky-kontakt', 'swapfinder', 'alt-com', 'bezzavazku'],
  },
  {
    slug: 'ona-hleda-par', type: 'kdo', name: 'Ona hledá pár',
    h1: 'Ona hledá pár: seznamky pro ženy, které hledají pár',
    metaTitle: 'Ona hledá pár {Y} – seznamky pro páry a swingers',
    metaDescription: 'Seznamky, kde ženy najdou páry. Kde hledat, jak se chránit a na co se ptát předem.',
    lead: 'Seznamky pro ženy, které hledají pár, a rady, jak to udělat bezpečně.',
    body: `## Kde hledat pár

Ženy, které hledají pár, jsou na seznamkách pro dospělé velmi žádané, takže výběr je velký.

- [AdultFriendFinder](/seznamky/adult-friend-finder) s profily párů a skupinami.
- [Victoria Milan](/seznamky/victoria-milan) pro diskrétní setkání.
- [Erotický kontakt](/seznamky/eroticky-kontakt) s českou komunitou.

## Bezpečnost

Ověřte si, že jde skutečně o pár, ideálně [videohovorem](/clanky/videohovor-pred-schuzkou). První setkání si domluvte na veřejném místě a předem si řekněte hranice. Víc v článku [seznamka pro páry a swingers](/clanky/seznamka-pro-pary).`,
    picks: ['adult-friend-finder', 'victoria-milan', 'eroticky-kontakt', 'swapfinder', 'alt-com'],
  },
]

// ---------- Věk ----------

const VEK: Landing[] = [
  {
    slug: 'seznamka-30', type: 'vek', name: 'Seznamka 30+',
    h1: 'Seznamka 30+: nejlepší seznamky po třicítce',
    metaTitle: 'Seznamka 30+ {Y} – nejlepší seznamky pro lidi po třicítce',
    metaDescription: 'Seznamky pro lidi 30+, kteří hledají vážný vztah. Srovnání seznamek s osobnostním testem a tipy pro seznamování po třicítce.',
    lead: 'Seznamky pro lidi po třicítce, kteří vědí, co chtějí: vztah, rodinu a partnera do života.',
    body: `## Seznamování po třicítce

Po třicítce máte méně příležitostí potkat nové lidi, ale jasnější představu o partnerovi. Nejlépe fungují seznamky s osobnostním testem, které vám nabídnou lidi s podobnými cíli.

Podrobně to rozebíráme v článku [seznamování po třicítce](/clanky/seznamovani-po-30) a ve srovnání [be2 vs. ELITE Date](/clanky/be2-vs-elite-date).`,
    picks: ['elite-date', 'academic-singles', 'be2', 'victoria-milan', 'flirtkontakt', 'cesky-flirt', 'yellobar'],
  },
  {
    slug: 'seznamka-40', type: 'vek', name: 'Seznamka 40+',
    h1: 'Seznamka 40+: seznamky pro lidi po čtyřicítce',
    metaTitle: 'Seznamka 40+ {Y} – nejlepší seznamky po čtyřicítce',
    metaDescription: 'Seznamky pro lidi 40+, po rozvodu i s dětmi. Kde hledat vážný vztah a jak začít znovu.',
    lead: 'Seznamky pro lidi po čtyřicítce: po rozvodu, s dětmi i bez nich.',
    body: `## Seznamování po čtyřicítce

Po čtyřicítce často začínáte znovu: po rozvodu, s dětmi, s jinými prioritami. Seznamky s osobnostním testem vám pomohou najít partnera, který má podobnou životní situaci.

Víc v článcích [seznamování po 40](/clanky/seznamovani-po-40), [seznamování po rozvodu](/clanky/seznamovani-po-rozvodu) a [seznamování s dětmi](/clanky/seznamovani-s-detmi).`,
    picks: ['elite-date', 'singles50', 'academic-singles', 'be2', 'victoria-milan', 'flirtkontakt', 'tajny-zraly-flirt'],
  },
  {
    slug: 'seznamka-50', type: 'vek', name: 'Seznamka 50+',
    h1: 'Seznamka 50+: seznamky pro zralé singles',
    metaTitle: 'Seznamka 50+ {Y} – nejlepší seznamky pro lidi po padesátce',
    metaDescription: 'Seznamky pro lidi 50+, kteří hledají partnera nebo společnost. Bezpečné seznamky s ověřenými profily.',
    lead: 'Seznamky pro zralé singles, kteří hledají partnera, přítele nebo společnost.',
    body: `## Seznamování po padesátce

Seznamky pro 50+ jsou dnes plné aktivních lidí. Hledejte ty, které profily ručně kontrolují a mají českou komunitu.

Víc v článcích [seznamka po padesátce](/clanky/seznamka-po-padesatce) a [bezpečnost seznamování pro seniory](/clanky/senior-bezpecnost-seznamovani).`,
    picks: ['singles50', 'zrala-laska', 'elite-date', 'loveat50', 'tajny-zraly-flirt', 'academic-singles'],
  },
  {
    slug: 'seznamka-60', type: 'vek', name: 'Seznamka 60+',
    h1: 'Seznamka 60+: seznámení pro seniory',
    metaTitle: 'Seznamka 60+ {Y} – seznamky pro seniory',
    metaDescription: 'Seznamky pro seniory 60+. Jak začít krok za krokem, kde hledat a jak se chránit před podvodníky.',
    lead: 'Seznamky pro seniory, kteří chtějí poznat nového partnera nebo přítele.',
    body: `## Seznamování po šedesátce

Online seznamka je pro seniory pohodlná cesta, jak poznat nové lidi. Důležité je zvolit seriózní seznamku a dodržovat základní pravidla bezpečnosti.

Podrobný návod najdete v článku [seznamka pro seniory](/clanky/seznamka-pro-seniory).`,
    picks: ['singles50', 'zrala-laska', 'loveat50', 'elite-date'],
  },
]

export const LANDINGS: Landing[] = [
  ...CITIES.map(cityLanding),
  ...KRAJE.map(krajLanding),
  ...KDO,
  ...VEK,
]

export function getLanding(slug: string): Landing | undefined {
  return LANDINGS.find(l => l.slug === slug)
}

export function landingsByType(type: LandingType): Landing[] {
  return LANDINGS.filter(l => l.type === type)
}

/** Sousední města ve stejném kraji */
export function siblingCities(l: Landing): Landing[] {
  if (l.type !== 'mesto') return []
  return LANDINGS.filter(x => x.type === 'mesto' && x.kraj === l.kraj && x.slug !== l.slug)
}

export function krajLandingFor(l: Landing): Landing | undefined {
  return l.kraj ? getLanding(`seznamka-${l.kraj}`) : undefined
}

export const TOP_CITIES = ['praha', 'brno', 'ostrava', 'plzen', 'liberec', 'olomouc', 'ceske-budejovice', 'hradec-kralove']
