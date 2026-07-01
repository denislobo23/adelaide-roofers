// data/locations.js
// ─────────────────────────────────────────────────────────────
// CONTENT MODEL
//
// `regions`  → the 4 hub pages (/northern-suburbs etc.)
// `suburbs`  → the spoke pages (/northern-suburbs/salisbury etc.)
//
// Voice rule (read before editing): this site is a REFERRAL service.
// We are NOT the roofer. So copy never says "we restored" or "our
// licensed team". It says roofers we connect you with, or what a
// homeowner in this suburb typically needs. Keep that voice or the
// claims become misleading.
//
// `ready: true` means the page has genuine, suburb-specific content
// and will be built + linked. Leave others false until written — they
// won't generate, so no thin pages ship.
// ─────────────────────────────────────────────────────────────

export const regions = {
  "northern-suburbs": {
    slug: "northern-suburbs",
    name: "Northern Suburbs",
    metaTitle: "Roofers in Adelaide's Northern Suburbs | Find a Local | Adelaide Roofers",
    metaDescription:
      "Get connected with a local roofer across Adelaide's northern suburbs — Salisbury, Elizabeth, Mawson Lakes and more. Tile restorations, re-roofing and leak repairs.",
    heroImage: "/images/hero-north-adelaide.webp",
    mapImage: "/images/map-northern-suburbs.webp",
    intro:
      "Adelaide's northern suburbs run from the established post-war housing around Salisbury and Elizabeth out to the newer estates of Mawson Lakes and Golden Grove. It's a part of the city where the housing skews older and the summers run hot, so the roofing work tends toward tile restoration, re-pointing and tile-to-Colorbond conversions. Tell us where you are and what's going on up top, and we'll connect you with a roofer who works the area.",
    suburbs: ["salisbury", "elizabeth", "mawson-lakes", "modbury", "golden-grove", "greenwith", "pooraka", "paralowie"],
  },
  "western-suburbs": {
    slug: "western-suburbs",
    name: "Western Suburbs",
    metaTitle: "Roofers in Adelaide's Western Suburbs | Find a Local | Adelaide Roofers",
    metaDescription:
      "Get connected with a local roofer across Adelaide's coastal western suburbs — Port Adelaide, Henley Beach, Glenelg and more. Coastal re-roofing and leak repairs.",
    heroImage: "/images/hero-west-adelaide.webp",
    mapImage: "/images/map-west-adelaide.webp",
    intro:
      "The western suburbs hug the coast from Port Adelaide down to Glenelg, and proximity to the sea is the through-line: salt-laden air is hard on fasteners, flashings and older metal roofs. Whether it's a heritage cottage in the Port or a beachside home in Henley, we'll connect you with a roofer who knows how coastal exposure changes the job.",
    suburbs: ["port-adelaide", "semaphore", "henley-beach", "grange", "glenelg", "woodville", "findon", "west-lakes"],
  },
  "eastern-suburbs": {
    slug: "eastern-suburbs",
    name: "Eastern Suburbs",
    metaTitle: "Roofers in Adelaide's Eastern Suburbs | Find a Local | Adelaide Roofers",
    metaDescription:
      "Get connected with a local roofer across Adelaide's eastern suburbs — Burnside, Norwood, Unley and more. Heritage tile, terracotta and slate specialists.",
    heroImage: "/images/hero-east-adelaide.webp",
    mapImage: "/images/map-east-adelaide.webp",
    intro:
      "The eastern suburbs sit against the foothills and carry a lot of Adelaide's heritage housing — terracotta, slate and character villas through Burnside, Norwood and Unley. Many fall under council character or heritage overlays, which can shape what you're allowed to do. We'll connect you with a roofer experienced in this kind of older, often-protected stock.",
    suburbs: ["burnside", "norwood", "unley", "magill", "mitcham", "kensington", "stonyfell", "marryatville"],
  },
  "southern-suburbs": {
    slug: "southern-suburbs",
    name: "Southern Suburbs",
    metaTitle: "Roofers in Adelaide's Southern Suburbs | Find a Local | Adelaide Roofers",
    metaDescription:
      "Get connected with a local roofer across Adelaide's southern suburbs — Morphett Vale, Noarlunga, Hallett Cove and more. Restorations, re-roofing and storm repairs.",
    heroImage: "/images/hero-south-adelaide.webp",
    mapImage: "/images/map-south-adelaide.webp",
    intro:
      "The southern suburbs stretch from Marion down through Morphett Vale to the coast at Hallett Cove and Aldinga. It's a mix of 70s–80s family homes and exposed coastal blocks, so the common jobs run from tile restoration to storm and wind repairs. Tell us your suburb and we'll connect you with a roofer who covers the south.",
    suburbs: ["morphett-vale", "noarlunga", "marion", "hallett-cove", "aberfoyle-park", "aldinga", "reynella", "christies-beach"],
  },
};

export const suburbs = {
  // ══════════════════════════════════════════════════════════
  // GOLD-STANDARD EXAMPLE — fully written, honest, suburb-specific.
  // Every other suburb follows this exact shape.
  // ══════════════════════════════════════════════════════════
  salisbury: {
    ready: true,
    slug: "salisbury",
    region: "northern-suburbs",
    name: "Salisbury",
    postcode: "5108",
    metaTitle: "Roofers in Salisbury, SA | Get Matched With a Local | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Salisbury? We connect you with a local roofing contractor for tile restorations, re-pointing and leak repairs. Free, no obligation.",
    heroImage: "/images/hero-salisbury.webp",
    problemImage: "/images/problem-salisbury.webp",
    mapImage: "/images/map-salisbury.webp",

    headline: "Find a trusted roofer in Salisbury",
    intro:
      "Looking for a roofer in Salisbury? Adelaide Roofers connects you with a local roofing contractor who works the area. Tell us what's happening — a leak, cracked tiles, or a roof that's looked tired for years — and we'll connect you with someone who can take a look. There's no cost to you for the connection.",

    // Genuinely local — this is what makes the page worth indexing.
    roofStock:
      "Salisbury is largely brick-veneer family homes built from the 1960s through the 1980s, most of them under concrete tile. Roofs of that era are now well past the point where the original factory glaze has worn off the tiles, which is why re-pointing and full tile restorations are the most common jobs requested here, rather than full replacements.",
    localNote:
      "Salisbury sits in the City of Salisbury, well inland from the coast, so the roofing here is about ground and age rather than salt. Like-for-like roof restoration and repairs are treated as maintenance and generally don't need approval. The local factor worth knowing is the ground itself: pockets of Salisbury near the Little Para River sit on reactive clay soils that shift with the seasons, and that movement flexes the roof frame — a big reason rigid cement ridge mortar cracks over time, which a local roofer will check for rather than just patching the surface.",

    commonIssues: [
      "Cracked or crumbling ridge capping mortar",
      "Faded, porous concrete tiles that have lost their coating",
      "Leaks showing up as ceiling stains after heavy winter rain",
      "Slipped tiles after a windy spell",
    ],

    // Framed as what local roofers DO, not what "we" do.
    services: [
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, replacing cracked tiles, re-bedding or re-pointing ridges, and re-coating — the typical fix for an ageing Salisbury concrete tile roof.",
      },
      {
        title: "Re-pointing & re-bedding",
        description:
          "Replacing failed cement ridge mortar with flexible pointing, which copes better with the ground movement common on local clay soils.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down where water is actually getting in — often a slipped tile, a failed valley or cracked pointing — before it does more ceiling damage.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Salisbury?",
        a: "It depends on the size and pitch of the roof and how much tile and mortar work is needed, so any honest figure has to come from an on-site look. As a rough guide, restorations on a standard single-storey tiled home in Adelaide commonly fall somewhere in the mid-four-figure to high-four-figure range — but treat that as a ballpark, not a quote. The roofer we connect you with will give you a proper price after inspecting it.",
      },
      {
        q: "Why does the ridge mortar on older Salisbury homes crack?",
        a: "Two reasons usually combine. Cement mortar is rigid and slowly becomes brittle in the heat, and parts of Salisbury sit on reactive clay that moves with seasonal moisture, flexing the roof. When the frame moves and the mortar can't, it cracks. Flexible pointing is the common modern fix.",
      },
      {
        q: "Should I restore or replace an older Salisbury tiled roof?",
        a: "It comes down to the tiles themselves. A lot of Salisbury's 60s–80s homes have concrete tiles that are structurally fine but have just lost their coating and mortar — those are good candidates for restoration, which is far cheaper than replacement. If the tiles are crumbling, dropping powder or widely cracked, a re-roof (often tile-to-Colorbond) tends to make more sense long term. A local roofer can tell you which camp your roof is in.",
      },
      {
        q: "What are the most common roof problems on Salisbury homes?",
        a: "The usual ones we hear about locally are cracked ridge capping, faded and porous concrete tiles, slipped tiles after wind, and leaks showing up as ceiling stains after heavy winter rain — all typical of the area's ageing concrete tile roofs rather than anything unusual.",
      },
    ],

    landmarks: ["Salisbury Interchange", "Parabanks Shopping Centre", "Little Para River", "Salisbury North", "Paralowie"],
  },

  // ── Remaining northern suburbs (structure ready, content to write) ──
  elizabeth: {
    ready: true,
    slug: "elizabeth",
    region: "northern-suburbs",
    name: "Elizabeth",
    postcode: "5112",
    metaTitle: "Roofers in Elizabeth, SA | Re-Roofing & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Elizabeth? We connect you with a local roofing contractor for re-roofing, tile-to-Colorbond conversions and leak repairs on older homes. Free, no obligation.",
    heroImage: "/images/hero-elizabeth.webp",
    problemImage: "/images/problem-elizabeth.webp",
    mapImage: "/images/map-elizabeth.webp",

    headline: "Find a trusted roofer in Elizabeth",
    intro:
      "Looking for a roofer in Elizabeth? Adelaide Roofers connects you with a local roofing contractor who works the area. A lot of Elizabeth's housing is now reaching the age where roofs need real attention rather than another patch — tell us what's going on and we'll connect you with someone who can take a look. The connection is free.",

    roofStock:
      "Elizabeth was built largely as a South Australian Housing Trust town from the mid-1950s, so much of the suburb is original 1950s and 1960s housing — semi-detached brick and concrete-block homes, many still under their first or second roof. Because that stock is now 60-plus years old, Elizabeth sees more full re-roofing than a lot of Adelaide: tiles and old galvanised iron that have genuinely reached the end of their life, where a like-for-like restoration no longer stacks up and a tile-to-Colorbond conversion makes more sense.",
    localNote:
      "Elizabeth sits in the City of Playford. Most roof work here is straightforward maintenance, but the earliest Housing Trust housing around Elizabeth South falls within a Historic Area overlay — if your home is in that pocket, changing the roof's material, colour or profile can need council approval, even though like-for-like repairs generally don't. A local roofer familiar with Playford will know when that applies.",

    commonIssues: [
      "Concrete tiles or old galvanised iron at the end of their life",
      "Rusted roof sheets and fasteners on original homes",
      "Cracked, crumbling ridge capping",
      "Persistent leaks that have been patched repeatedly",
    ],

    services: [
      {
        title: "Tile-to-Colorbond re-roofing",
        description:
          "Stripping worn-out tile or iron and replacing it with lightweight modern Colorbond — the common choice for Elizabeth's older homes that are past restoration.",
      },
      {
        title: "Roof restoration",
        description:
          "Where the tiles are still sound, cleaning, re-pointing and re-coating to get more years out of the existing roof at lower cost than replacement.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Finding and fixing the actual source of a leak — often failed flashings, rusted iron or slipped tiles on ageing roofs.",
      },
    ],

    faqs: [
      {
        q: "Should I restore or re-roof an older home in Elizabeth?",
        a: "It depends on the condition of the roof, but Elizabeth's housing is old enough that full re-roofing comes up more often here than in newer suburbs. If the tiles are crumbling or the old iron is rusting through, a re-roof (often tile-to-Colorbond) is usually the better long-term spend. If the tiles are still structurally sound and it's mainly the coating and mortar that have failed, a restoration can be the smarter, cheaper option. A local roofer can tell you which applies after a look.",
      },
      {
        q: "How much does tile-to-Colorbond re-roofing cost in Elizabeth?",
        a: "A full re-roof is a bigger job than a restoration and the price depends on roof size, pitch, the state of the timber underneath and disposal of the old material — so it has to be quoted on site. As a general guide, full re-roofs on a standard single-storey home in Adelaide commonly run into the five figures. Treat that as a ballpark only; the roofer we connect you with will price it properly after inspecting it.",
      },
      {
        q: "Do I need council approval for roof work in Elizabeth?",
        a: "For most homes, like-for-like roof repairs, restoration and re-roofing in the same profile are treated as maintenance and generally don't need development approval from the City of Playford. The exception is the older Housing Trust housing around Elizabeth South, which sits in a Historic Area — there, changing the roof's material, colour or appearance can require approval, so it's worth checking with the council first.",
      },
      {
        q: "Why do so many Elizabeth roofs need replacing rather than just repairing?",
        a: "It comes down to age. Much of Elizabeth was built in the 1950s and 60s, so a large share of roofs are on their original or second covering and have simply worn out — porous tiles, perished mortar, and rusting old iron. At that stage repairs stop being economical and replacement becomes the sensible fix.",
      },
    ],

    landmarks: ["Elizabeth City Centre", "Playford Civic Centre", "Lyell McEwin Hospital", "Elizabeth South", "Main North Road"],
  },
  "mawson-lakes": {
    ready: true,
    slug: "mawson-lakes",
    region: "northern-suburbs",
    name: "Mawson Lakes",
    postcode: "5095",
    metaTitle: "Roofers in Mawson Lakes, SA | Metal Roof & Gutter Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Mawson Lakes? We connect you with a local contractor for box gutter, flashing and leak repairs on modern metal roofs. Free, no obligation.",
    heroImage: "/images/hero-mawson-lakes.webp",
    problemImage: "/images/problem-mawson-lakes.webp",
    mapImage: "/images/map-mawson-lakes.webp",

    headline: "Find a trusted roofer in Mawson Lakes",
    intro:
      "Looking for a roofer in Mawson Lakes? Adelaide Roofers connects you with a local roofing contractor who works the area. The roofs here are modern, but the contemporary designs come with their own quirks — tell us what's happening and we'll connect you with someone who knows them. The connection is free.",

    roofStock:
      "Mawson Lakes is one of Adelaide's newest suburbs — master-planned from 1998 around the man-made lakes and largely built out by 2011. That means the housing is modern: contemporary, often two-storey designs with low-pitch metal roofs, concealed box gutters, parapet walls and a fair amount of medium-density and townhouse stock. The problems here aren't the worn-out tiles and perished mortar of older suburbs — they're the drainage and flashing issues that come with flat, complex, modern rooflines.",
    localNote:
      "Mawson Lakes sits in the City of Salisbury, but it has an extra layer most suburbs don't: it was developed under strict design guidelines, and many properties carry covenants controlling external appearance — including roof colour and style. Townhouse and apartment buildings may also sit under body-corporate rules. So before changing how a roof looks, it's worth checking any covenant or strata rules as well as council. A local roofer who works the area will be across this.",

    commonIssues: [
      "Box gutters backing up and overflowing into ceilings",
      "Leaks along low-pitch flashings and parapet capping",
      "Debris and silt blocking concealed internal gutters",
      "Sealant and flashing failures on complex rooflines",
    ],

    services: [
      {
        title: "Box gutter & drainage work",
        description:
          "Clearing, repairing and upgrading the concealed internal box gutters common on Mawson Lakes homes, where a blockage backs straight up into the ceiling.",
      },
      {
        title: "Metal roof & flashing repairs",
        description:
          "Resealing and replacing flashings, parapet capping and penetrations on low-pitch metal roofs to stop wind-driven rain getting in.",
      },
      {
        title: "Leak detection on modern roofs",
        description:
          "Tracking leaks through complex contemporary rooflines, where water can travel a long way before it shows up inside.",
      },
    ],

    faqs: [
      {
        q: "Why does my newer Mawson Lakes home already have roof leaks?",
        a: "It's usually not age — it's design. Modern Mawson Lakes homes often have low-pitch roofs with concealed box gutters and parapet walls, which shed water through internal channels rather than simple eaves gutters. When those channels collect debris or a flashing seal fails, water has nowhere to go and backs up into the ceiling. It's a maintenance and detailing issue, not worn-out materials.",
      },
      {
        q: "What's a box gutter and why do they cause problems here?",
        a: "A box gutter is a gutter built into the roof itself rather than hung off the edge — common on the flat, modern designs in Mawson Lakes. The catch is that if one blocks or overflows, the water drains inward, into the building, instead of safely off the edge. Keeping them clear and the overflows working is the key to avoiding leaks.",
      },
      {
        q: "Are there rules about changing my roof in Mawson Lakes?",
        a: "Possibly more than in older suburbs. Mawson Lakes was built under design guidelines, and many homes carry covenants that control external appearance, including roof colour and style. Townhouses and apartments may also have body-corporate rules. So as well as the usual City of Salisbury planning position, it's worth checking your title covenants or strata rules before changing how the roof looks.",
      },
      {
        q: "How much does box gutter or roof leak repair cost in Mawson Lakes?",
        a: "It depends entirely on what's causing the leak and how accessible it is — a clear-and-reseal is a small job, while re-lining a failed box gutter is a larger one. Because of that range, it really needs an on-site look to price. The roofer we connect you with will assess it and give you a proper quote.",
      },
    ],

    landmarks: ["Sir Douglas Mawson Lake", "UniSA Mawson Lakes campus", "Technology Park Adelaide", "Mawson Lakes Boulevard", "The Cascades"],
  },
  modbury: {
    ready: true,
    slug: "modbury",
    region: "northern-suburbs",
    name: "Modbury",
    postcode: "5092",
    metaTitle: "Roofers in Modbury, SA | Restorations, Gutters & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Modbury? We connect you with a local contractor for tile restorations, gutter and valley work, and leak repairs in the foothills. Free, no obligation.",
    heroImage: "/images/hero-modbury.webp",
    problemImage: "/images/problem-modbury.webp",
    mapImage: "/images/map-modbury.webp",

    headline: "Find a trusted roofer in Modbury",
    intro:
      "Looking for a roofer in Modbury? Adelaide Roofers connects you with a local roofing contractor who works the area. Modbury's established homes and leafy, foothills setting throw up their own roofing issues — tell us what's going on and we'll connect you with someone who knows them. The connection is free.",

    roofStock:
      "Modbury filled out during the big north-eastern housing boom of the 1960s and 70s, so most of the suburb is established brick family homes, the majority under concrete tile. Those roofs are now 50-plus years old — old enough that re-pointing, restoration and the odd tile replacement are the bread-and-butter jobs. What makes Modbury a bit different from the flatter northern suburbs is its foothills setting and mature tree cover, which brings gutters and valleys into the picture as much as the tiles themselves.",
    localNote:
      "Modbury sits in the City of Tea Tree Gully, up on the lower foothills. The established gums and street trees that make the area pleasant also drop a lot of leaf litter, which clogs gutters and roof valleys and is a frequent cause of overflow leaks here. There's no heritage overlay to worry about for most homes, so like-for-like roof maintenance generally doesn't need council approval.",

    commonIssues: [
      "Gutters and valleys clogged with leaf litter, causing overflow",
      "Ageing concrete tiles that have lost their coating",
      "Cracked or perished ridge capping",
      "Slipped tiles after wind on elevated blocks",
    ],

    services: [
      {
        title: "Gutter & valley clearing and guards",
        description:
          "Clearing leaf-choked gutters and roof valleys, and fitting gutter guard, to stop the overflow leaks common on Modbury's tree-lined streets.",
      },
      {
        title: "Tile restoration & re-pointing",
        description:
          "Cleaning, re-bedding or re-pointing ridges and re-coating ageing concrete tile roofs to get more years out of them.",
      },
      {
        title: "Leak & valley repair",
        description:
          "Finding and fixing leaks, often traced back to blocked valleys, slipped tiles or failed flashings on older roofs.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Modbury?",
        a: "It depends on the roof's size, pitch and how much tile and mortar work is needed, so it really needs an on-site look to price. As a rough guide, restorations on a standard single-storey tiled home in Adelaide commonly fall in the mid-to-high four-figure range — treat that as a ballpark, not a quote. The roofer we connect you with will price it properly after inspecting it.",
      },
      {
        q: "Why do Modbury homes get blocked gutters and valley leaks?",
        a: "It's the trees. Modbury's established gums and leafy streets drop a steady load of leaf litter, and on a foothills block that debris collects in gutters and roof valleys. Once a valley or downpipe clogs, heavy rain backs up and overflows inward into the ceiling rather than draining away — which is why gutter and valley maintenance is such a common callout here.",
      },
      {
        q: "Do I need council approval for roof work in Modbury?",
        a: "For most Modbury homes, no. Like-for-like roof repairs, restoration and re-roofing in the same profile are treated as maintenance and generally don't require development approval from the City of Tea Tree Gully. If you were significantly changing the roofline or structure that can be different, but standard roof work usually isn't an issue.",
      },
      {
        q: "Is my Modbury roof old enough to need restoring?",
        a: "Quite possibly. Much of Modbury was built in the 1960s and 70s, so a lot of local roofs are well past the point where the original tile coating and ridge mortar have worn out. If your tiles are faded and porous or the ridge capping is cracking, it's likely due for a restoration — a local roofer can confirm after a look.",
      },
    ],

    landmarks: ["Westfield Tea Tree Plaza", "Modbury Hospital", "Civic Park", "Tea Tree Plaza O-Bahn Interchange", "Anstey Hill Recreation Park"],
  },
  "golden-grove": {
    ready: true,
    slug: "golden-grove",
    region: "northern-suburbs",
    name: "Golden Grove",
    postcode: "5125",
    metaTitle: "Roofers in Golden Grove, SA | Restoration & Leak Repair | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Golden Grove? We connect you with a local contractor for restorations, valley and flashing repairs on larger family homes. Free, no obligation.",
    heroImage: "/images/hero-golden-grove.webp",
    problemImage: "/images/problem-golden-grove.webp",
    mapImage: "/images/map-golden-grove.webp",

    headline: "Find a trusted roofer in Golden Grove",
    intro:
      "Looking for a roofer in Golden Grove? Adelaide Roofers connects you with a local roofing contractor who works the area. The homes here are newer and larger, with the kind of complex rooflines that need a roofer who knows what they're doing — tell us what's happening and we'll connect you. The connection is free.",

    roofStock:
      "Golden Grove is a master-planned suburb, built by Delfin from 1985 and largely finished by the early 2000s. That makes the housing newer than most of the northern suburbs — generally larger family homes on a mix of allotment sizes, often with more complex rooflines: multiple gables, longer valleys and more flashing detail than a simple older cottage. Those roofs are now 20 to 40 years old, which means a lot of Golden Grove homes are hitting the age for their first proper restoration rather than a full replacement.",
    localNote:
      "Golden Grove sits in the City of Tea Tree Gully, on elevated ground with views toward the hills. There's no heritage overlay, so standard roof maintenance generally doesn't need council approval — but parts of Golden Grove were built under estate design guidelines (the Spring Hill area is one example), and some titles carry covenants controlling external appearance. If you're changing the roof's colour or style rather than just maintaining it, it's worth checking your title for any covenant first.",

    commonIssues: [
      "Valley and flashing leaks on complex multi-gable roofs",
      "First signs of ageing on 1980s–90s tile (faded coating, mortar)",
      "Larger roof areas making small problems costlier to ignore",
      "Sealant and flashing wear around the many roof junctions",
    ],

    services: [
      {
        title: "Restoration on larger, complex roofs",
        description:
          "Cleaning, re-pointing and re-coating the bigger multi-gable tile roofs common in Golden Grove as they reach their first restoration age.",
      },
      {
        title: "Valley & flashing repair",
        description:
          "Repairing the valleys and flashing junctions that complex rooflines have a lot of — the usual source of leaks on these homes.",
      },
      {
        title: "Leak detection on complex rooflines",
        description:
          "Tracing leaks across multi-pitch roofs, where water can enter at one junction and show up well away from the source.",
      },
    ],

    faqs: [
      {
        q: "Is my Golden Grove roof old enough to need restoring?",
        a: "It may well be. Golden Grove was built largely between 1985 and the early 2000s, so a lot of local roofs are now 20–40 years old — the point where the original tile coating and ridge mortar start to fail and a restoration makes sense. It's usually too soon for full replacement, but past the point of doing nothing. A local roofer can tell you where yours sits.",
      },
      {
        q: "Why do larger Golden Grove homes get valley leaks?",
        a: "Bigger, more architectural homes tend to have more complex rooflines — multiple gables and longer valleys channelling a lot of water. Those valleys and the flashing junctions around them are the spots most prone to leaks, especially once sealants age. The more complex the roof, the more of these potential entry points there are to keep an eye on.",
      },
      {
        q: "How much does roof restoration cost in Golden Grove?",
        a: "Golden Grove homes often have larger or more complex roofs than older suburbs, and price scales with roof area and complexity, so quotes here can run a bit higher — but it genuinely has to be assessed on site. The roofer we connect you with will measure it up and give you a proper figure after inspecting it.",
      },
      {
        q: "Are there rules about changing my roof in Golden Grove?",
        a: "Standard maintenance generally isn't an issue with the City of Tea Tree Gully. But Golden Grove was a planned development, and some estates were built under design guidelines with covenants controlling external appearance, including roof colour and style. If you're changing how the roof looks rather than just repairing it, check your title for any covenant before committing.",
      },
    ],

    landmarks: ["Golden Grove Village Shopping Centre", "The Grove", "Spring Hill", "Wynn Vale Dam", "Golden Grove Recreation & Arts Centre"],
  },
  greenwith: {
    ready: true,
    slug: "greenwith",
    region: "northern-suburbs",
    name: "Greenwith",
    postcode: "5125",
    metaTitle: "Roofers in Greenwith, SA | Gutters, Restoration & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Greenwith? We connect you with a local contractor for gutter protection, restoration and leak repairs near Cobbler Creek. Free, no obligation.",
    heroImage: "/images/hero-greenwith.webp",
    problemImage: "/images/problem-greenwith.webp",
    mapImage: "/images/map-greenwith.webp",

    headline: "Find a trusted roofer in Greenwith",
    intro:
      "Looking for a roofer in Greenwith? Adelaide Roofers connects you with a local roofing contractor who works the area. Greenwith's newer homes sit right against bushland, which shapes what your roof has to deal with — tell us what's going on and we'll connect you with someone who knows the area. The connection is free.",

    roofStock:
      "Greenwith is a relatively young suburb — part of the Golden Grove development built from the mid-1980s onward — so the housing is mostly larger, modern family homes under concrete tile or metal. The roofs themselves aren't old, but plenty are now reaching the 25-to-35-year mark where coatings dull and ridge pointing starts to need attention. What really sets Greenwith apart, though, is its setting: much of the suburb borders Cobbler Creek Recreation Park and other native bushland.",
    localNote:
      "Greenwith sits in the City of Tea Tree Gully, and a big chunk of it backs onto Cobbler Creek Recreation Park — a large remnant of native mallee woodland where the park runs annual burns to manage fire risk. For homes near that interface, keeping gutters and roof valleys clear of leaf litter matters for more than just drainage; dry debris in a gutter is an ember risk. Routine roof maintenance doesn't need council approval, but if your property is near the reserve and you're doing building work, bushfire-area planning rules can apply — worth checking.",

    commonIssues: [
      "Gutters and valleys filling with native leaf litter and bark",
      "Dry gutter debris posing an ember risk near bushland",
      "Roof coatings and ridge pointing reaching their first service",
      "Leaks at valleys and flashings on larger, complex roofs",
    ],

    services: [
      {
        title: "Gutter cleaning & gutter guard",
        description:
          "Clearing gutters and valleys and fitting quality gutter guard — sensible for drainage and for reducing ember risk on homes near the Cobbler Creek bushland.",
      },
      {
        title: "Roof restoration & re-pointing",
        description:
          "Re-coating and re-pointing the 25-to-35-year-old roofs common in Greenwith, before small issues turn into leaks.",
      },
      {
        title: "Valley & flashing repair",
        description:
          "Fixing leaks on the larger, multi-angled rooflines typical of the area's family homes.",
      },
    ],

    faqs: [
      {
        q: "I'm near Cobbler Creek — does that affect my roof and gutters?",
        a: "It can. Homes backing onto the reserve catch more native leaf litter and bark in their gutters and roof valleys, which is both a drainage and an ember-risk issue during fire season. Keeping gutters clear and fitting good gutter guard is a practical step. For routine roof work it's just maintenance, but if you're building or extending near the bushland, bushfire-area planning requirements can come into play.",
      },
      {
        q: "How much does roof restoration cost in Greenwith?",
        a: "It depends on the size and complexity of the roof — and Greenwith homes are often larger with more complex rooflines, which can lift the figure. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures, with bigger homes more. It really needs an on-site look; the roofer we connect you with will quote it properly.",
      },
      {
        q: "My Greenwith home isn't old — why would it need roof work already?",
        a: "Even on a 25-to-35-year-old roof, the protective tile coating dulls and the ridge pointing starts to crack with age and sun. It's not that the roof is failing — it's reaching the point where a restoration tops it back up and prevents leaks down the track. A local roofer can tell you whether yours is due.",
      },
      {
        q: "Do I need council approval for roof work in Greenwith?",
        a: "For standard like-for-like roof repairs and restoration, generally no — the City of Tea Tree Gully treats that as maintenance. The thing to check is bushfire-area requirements if your home is close to the reserve and you're doing building work beyond routine roof maintenance, as those can carry extra construction standards.",
      },
    ],

    landmarks: ["Cobbler Creek Recreation Park", "The Stables Shopping Centre", "Greenwith Primary School", "Golden Grove Road", "Tilley Recreation Reserve"],
  },
  pooraka: {
    ready: true,
    slug: "pooraka",
    region: "northern-suburbs",
    name: "Pooraka",
    postcode: "5095",
    metaTitle: "Roofers in Pooraka, SA | Tile & Metal Roof Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Pooraka? We connect you with a local contractor for tile and metal roof repairs, restorations and leaks across this mixed suburb. Free, no obligation.",
    heroImage: "/images/hero-pooraka.webp",
    problemImage: "/images/problem-pooraka.webp",
    mapImage: "/images/map-pooraka.webp",

    headline: "Find a trusted roofer in Pooraka",
    intro:
      "Looking for a roofer in Pooraka? Adelaide Roofers connects you with a local roofing contractor who works the area. Pooraka mixes older and newer homes alongside a busy commercial strip, so the roofing here is a real range — tell us what's going on and we'll connect you with someone who handles it. The connection is free.",

    roofStock:
      "Pooraka is a more mixed suburb than most of its northern neighbours. Alongside established older homes — many under concrete tile, some with original galvanised iron — there are newer infill houses, and a significant commercial and light-industrial precinct around the SA Produce Market and Burma Road. That mix means the roofing here spans the lot: tile restorations and re-pointing on the older houses, plus metal roofing, fastener and flashing work that's more common where homes sit near, or are built like, the area's commercial stock.",
    localNote:
      "Pooraka sits in the City of Salisbury. For homes, like-for-like roof restoration and repairs are treated as maintenance and generally don't need development approval. Because the suburb has such a spread of roof types — old tile, newer tile, and metal — it's worth matching with a roofer comfortable across all of them rather than a tile-only or metal-only specialist. The Dry Creek corridor also runs through the area, so some streets carry more tree debris in gutters.",

    commonIssues: [
      "Perished ridge pointing on older tiled homes",
      "Rust and fastener failure on older metal roofs",
      "Faded, porous concrete tiles due for a re-coat",
      "Leaks at flashings on mixed older and newer roofs",
    ],

    services: [
      {
        title: "Tile restoration & re-pointing",
        description:
          "Cleaning, re-pointing and re-coating the ageing concrete tile roofs on Pooraka's older homes.",
      },
      {
        title: "Metal roof & fastener repairs",
        description:
          "Replacing rusted sheets, perished fasteners and failed flashings — more common here than in purely residential suburbs given the local mix.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Finding and fixing leaks across both tile and metal roofs, including older homes near the commercial precinct.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration or repair cost in Pooraka?",
        a: "It varies a lot here because the roofs do — a re-point on an older tiled home, a metal sheet and fastener repair, and a full restoration are very different jobs at very different prices. That's exactly why it needs an on-site look rather than a phone quote. The roofer we connect you with will assess what your roof actually needs and price it properly.",
      },
      {
        q: "My Pooraka home has an old metal roof that's rusting — can it be repaired?",
        a: "Often, yes. If the rust is localised and the sheets are still sound, a roofer can treat it, replace perished fasteners and reseal flashings. If the iron is rusted through along the laps, replacement of those sheets (or a re-roof) becomes the better option. A local roofer can tell you which after a look.",
      },
      {
        q: "Do I need council approval for roof work in Pooraka?",
        a: "For a standard home, no — like-for-like roof restoration and repairs in the City of Salisbury are treated as maintenance and generally don't need development approval. Larger structural changes are different, but routine roof work usually isn't.",
      },
      {
        q: "Should I use a tile roofer or a metal roofer in Pooraka?",
        a: "It depends on your roof, and because Pooraka has such a spread of roof types, it's worth being connected with someone comfortable on both. Tell us what you've got — tile, metal, or you're not sure — and we'll connect you with a roofer who works with it.",
      },
    ],

    landmarks: ["SA Produce Market", "Dry Creek Linear Park", "Lindblom Park", "Main North Road", "Gepps Cross"],
  },
  paralowie: {
    ready: true,
    slug: "paralowie",
    region: "northern-suburbs",
    name: "Paralowie",
    postcode: "5108",
    metaTitle: "Roofers in Paralowie, SA | Roof Restoration & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Paralowie? We connect you with a local contractor for tile restoration, re-pointing and leak repairs on family homes. Free, no obligation.",
    heroImage: "/images/hero-paralowie.webp",
    problemImage: "/images/problem-paralowie.webp",
    mapImage: "/images/map-paralowie.webp",

    headline: "Find a trusted roofer in Paralowie",
    intro:
      "Looking for a roofer in Paralowie? Adelaide Roofers connects you with a local roofing contractor who works the area. A lot of Paralowie's family homes are now at the age where the roof needs its first proper service — tell us what's going on and we'll connect you with someone local. The connection is free.",

    roofStock:
      "Paralowie grew quickly from the 1980s through the mid-1990s as an affordable family suburb, so most of the housing is modern brick homes under concrete tile. That makes its roofs younger than older northern suburbs like Salisbury or Elizabeth — but a 30-to-40-year-old concrete tile roof is exactly the age where the original coating has faded, the tiles have gone porous, and the ridge pointing is starting to crack. Restoration and re-pointing are the common jobs here, with full replacement rarely needed yet.",
    localNote:
      "Paralowie sits in the City of Salisbury. Like-for-like roof restoration and repairs are treated as maintenance and generally don't need development approval. Because so much of the suburb was built in the same 1980s–90s window, a lot of local roofs are reaching the same point together — which is why roof restoration is such a common Paralowie callout. A local roofer will know the housing well.",

    commonIssues: [
      "Faded, porous concrete tiles past their original coating",
      "Cracked ridge pointing reaching its first replacement",
      "Leaks showing as ceiling stains after winter rain",
      "Slipped tiles after windy weather",
    ],

    services: [
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, replacing broken tiles, re-pointing ridges and re-coating — the standard first service for Paralowie's 30-to-40-year-old tile roofs.",
      },
      {
        title: "Re-pointing & re-bedding",
        description:
          "Replacing cracked cement ridge mortar with flexible pointing that lasts much longer than the original.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down the source of a leak — usually a slipped tile, failed flashing or cracked pointing — before it damages the ceiling.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Paralowie?",
        a: "It depends on the roof's size and pitch and how much tile and mortar work is needed, so it has to be quoted on site. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly fall in the mid-four-figure to high-four-figure range — treat that as a ballpark only. The roofer we connect you with will price it properly after a look.",
      },
      {
        q: "My Paralowie home is fairly modern — does the roof really need restoring?",
        a: "Quite likely, yes. Most of Paralowie was built in the 1980s and 90s, so its concrete tile roofs are now 30-plus years old — the point where the factory coating has worn off and the ridge mortar starts cracking. The structure is usually fine; it just needs a restoration to re-seal it and stop leaks developing. A roofer can confirm whether yours is at that stage.",
      },
      {
        q: "Restore or replace — which does a Paralowie roof usually need?",
        a: "Almost always restore. Paralowie's roofs generally aren't old enough to need replacing — the tiles are structurally sound and it's the coating and mortar that have aged. A restoration is far cheaper than a re-roof and is the right call for the vast majority of homes here. Replacement only really comes up if tiles are widely cracked or crumbling.",
      },
      {
        q: "Do I need council approval for roof work in Paralowie?",
        a: "For most homes, no — like-for-like roof restoration and repairs in the City of Salisbury are treated as maintenance and generally don't require development approval. It's only larger changes beyond standard roof work that might, so a routine restoration is usually straightforward.",
      },
    ],

    landmarks: ["Paralowie Village Shopping Centre", "Paralowie R-12 School", "Whites Road", "Bolivar Road", "Little Para Linear Park"],
  },

  // ── Western ──
  "port-adelaide": {
    ready: true,
    slug: "port-adelaide",
    region: "western-suburbs",
    name: "Port Adelaide",
    postcode: "5015",
    metaTitle: "Roofers in Port Adelaide, SA | Heritage & Metal Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Port Adelaide? We connect you with a local contractor for heritage iron, coastal metal and leak repairs. Free, no obligation.",
    heroImage: "/images/hero-port-adelaide.webp",
    problemImage: "/images/problem-port-adelaide.webp",
    mapImage: "/images/map-port-adelaide.webp",

    headline: "Find a trusted roofer in Port Adelaide",
    intro:
      "Looking for a roofer in Port Adelaide? Adelaide Roofers connects you with a local roofing contractor who works the area. The Port's mix of heritage buildings and salt-air exposure means roof work here often needs a careful hand — tell us what's going on and we'll connect you with someone who knows it. The connection is free.",

    roofStock:
      "Port Adelaide is one of the most historically significant parts of the state — it's South Australia's first State Heritage Area, with the largest continuous group of colonial buildings anywhere in SA. That means a lot of the older roofing here is original corrugated iron and traditional profiles on Victorian-era cottages and commercial buildings. Alongside that, the suburb has plenty of newer waterfront housing from the Dock One and Newport Quays renewal. Sitting on the Port River, all of it contends with salt-laden air that's hard on metal roofs and fasteners.",
    localNote:
      "Port Adelaide sits in the City of Port Adelaide Enfield. This is the key thing to know here: if your building is heritage-listed or you're within the State Heritage Area, alterations are classed as development and generally need council approval — so roof changes that affect appearance can't just be done freely. Straightforward like-for-like repairs are usually fine, but anything changing materials or profile on a heritage property should be checked with the council first. A roofer experienced with heritage work is worth seeking out here.",

    commonIssues: [
      "Corrosion and rust on original heritage iron roofs",
      "Perished fasteners and flashings from salt exposure",
      "Lead and flashing failures on older parapets and chimneys",
      "Leaks where heritage detailing meets modern repairs",
    ],

    services: [
      {
        title: "Heritage iron repair & replacement",
        description:
          "Careful like-for-like work on traditional corrugated iron and heritage roofs, matching original profiles where appearance matters.",
      },
      {
        title: "Coastal metal roof repairs",
        description:
          "Replacing rusted sheets and salt-perished fasteners and flashings on the Port's metal roofs.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down leaks on older buildings, often around parapets, chimneys and aged flashings.",
      },
    ],

    faqs: [
      {
        q: "Do I need council approval for roof work on a Port Adelaide heritage property?",
        a: "Often, yes. Port Adelaide is South Australia's first State Heritage Area, and alterations to heritage-listed buildings or work within the heritage area are classed as development, which generally requires approval from the City of Port Adelaide Enfield. Routine like-for-like repairs are usually fine, but anything that changes the roof's material, profile or appearance should be checked with the council before you start.",
      },
      {
        q: "Why do metal roofs in Port Adelaide rust faster than inland?",
        a: "It's the salt. Sitting on the Port River and close to the coast, the Port's air carries salt that settles on metal roofs and accelerates corrosion — especially at fasteners, laps and flashings where moisture lingers. Using marine-grade materials and keeping flashings sound makes a real difference to how long a roof lasts here.",
      },
      {
        q: "Can my original heritage iron roof be repaired rather than replaced?",
        a: "Frequently, yes — and on a heritage property, keeping and repairing the original where possible is usually preferred. If sections are rusted through, a roofer can replace them with matching traditional-profile sheeting so the look is preserved. This is specialised work, so it's worth being connected with a roofer who does heritage jobs.",
      },
      {
        q: "How much does roof work cost in Port Adelaide?",
        a: "It varies widely because the buildings do — a coastal metal repair, a heritage iron section and a full restoration are very different jobs. Heritage work can also carry extra requirements. Because of that range, it really needs an on-site assessment; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Port Adelaide State Heritage Area", "SA Maritime Museum", "Hart's Mill", "Commercial Road", "Dock One"],
  },
  semaphore: {
    ready: true,
    slug: "semaphore",
    region: "western-suburbs",
    name: "Semaphore",
    postcode: "5019",
    metaTitle: "Roofers in Semaphore, SA | Coastal Roof & Salt Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Semaphore? We connect you with a local contractor for coastal roof repairs, salt corrosion and leaks on seaside homes. Free, no obligation.",
    heroImage: "/images/hero-semaphore.webp",
    problemImage: "/images/problem-semaphore.webp",
    mapImage: "/images/map-semaphore.webp",

    headline: "Find a trusted roofer in Semaphore",
    intro:
      "Looking for a roofer in Semaphore? Adelaide Roofers connects you with a local roofing contractor who works the area. Living this close to the beach is great, but the salt air is tough on roofs — tell us what's going on and we'll connect you with someone who understands coastal homes. The connection is free.",

    roofStock:
      "Semaphore is a classic Gulf St Vincent seaside suburb on the Lefevre Peninsula, with a character that goes back to its days as Adelaide's premier beach resort. The housing reflects that — a lot of older Victorian and Federation cottages and post-war homes, many still under original or older iron and tile. What ties Semaphore's roofs together isn't the era so much as the exposure: being right on the coast, the salt air drives faster corrosion of metal, fasteners and flashings than you'd see even a few kilometres inland.",
    localNote:
      "Semaphore sits in the City of Port Adelaide Enfield. Standard like-for-like roof repairs and restoration are treated as maintenance and generally don't need approval, though some individual older buildings are heritage-listed, in which case changes can. The bigger practical issue here is simply the salt: roofs and especially fasteners and flashings wear out faster near the beach, so coastal homes benefit from marine-grade materials and more regular checks than inland ones.",

    commonIssues: [
      "Rust and corrosion on metal roofs from salt air",
      "Perished roofing screws and washers near the coast",
      "Failing flashings letting wind-driven rain in",
      "Ageing iron and tile on older cottages",
    ],

    services: [
      {
        title: "Coastal roof repairs & re-roofing",
        description:
          "Replacing salt-corroded sheets and upgrading to marine-grade materials better suited to beachside Semaphore.",
      },
      {
        title: "Fastener & flashing replacement",
        description:
          "Swapping out rusted screws and failed flashings — the parts that go first on coastal roofs — before they cause leaks.",
      },
      {
        title: "Tile restoration & leak repair",
        description:
          "Restoring older tiled cottage roofs and tracking down the leaks that salt-worn flashings tend to cause.",
      },
    ],

    faqs: [
      {
        q: "Why do roofs in Semaphore wear out faster than inland?",
        a: "It comes down to salt. Semaphore is right on Gulf St Vincent, and the salt-laden sea air settles on roofs and accelerates corrosion — particularly at roofing screws, sheet laps and flashings, where moisture and salt collect. It's why beachside roofs often need attention sooner than identical roofs a few kilometres inland.",
      },
      {
        q: "What's the best roofing material for a coastal Semaphore home?",
        a: "For metal roofs near the beach, marine-grade products (such as the upgraded Colorbond coastal range) are designed to resist salt corrosion far better than standard sheeting, and stainless or upgraded fasteners last longer too. A local roofer can advise what's appropriate for how close you are to the water — exposure right on the Esplanade is harsher than a few streets back.",
      },
      {
        q: "My roofing screws are rusting — is that a problem?",
        a: "It's worth dealing with. Rusted screws and perished rubber washers are one of the first things to fail on a coastal roof, and once they go they let water in around each fixing. Replacing them with corrosion-resistant fasteners is a relatively small job that prevents bigger leaks down the line.",
      },
      {
        q: "Do I need council approval for roof work in Semaphore?",
        a: "For most homes, no — like-for-like roof repairs and restoration in the City of Port Adelaide Enfield are treated as maintenance. The exception is if your specific property is heritage-listed, where changes to appearance can need approval. A local roofer or the council can confirm whether that applies to your place.",
      },
    ],

    landmarks: ["Semaphore Jetty & foreshore", "Semaphore Road", "Time Ball Tower", "Fort Glanville", "Semaphore Palais"],
  },
  "henley-beach": {
    ready: true,
    slug: "henley-beach",
    region: "western-suburbs",
    name: "Henley Beach",
    postcode: "5022",
    metaTitle: "Roofers in Henley Beach, SA | Coastal & Modern Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Henley Beach? We connect you with a local contractor for coastal roofing, complex modern rooflines and leak repairs. Free, no obligation.",
    heroImage: "/images/hero-henley-beach.webp",
    problemImage: "/images/problem-henley-beach.webp",
    mapImage: "/images/map-henley-beach.webp",

    headline: "Find a trusted roofer in Henley Beach",
    intro:
      "Looking for a roofer in Henley Beach? Adelaide Roofers connects you with a local roofing contractor who works the area. Henley's mix of original beach homes and big modern rebuilds means roofing here ranges from straightforward repairs to complex jobs — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Henley Beach is one of Adelaide's most sought-after coastal suburbs, and its housing shows the range — 1920s bungalows and renovated villas a few streets back, and substantial modern, often two-storey rebuilds closer to the water, where knockdown-rebuilds are common. That gives the roofing here two faces: ageing tile and iron on the older homes that need restoration and repair, and complex contemporary rooflines on the newer builds that need careful flashing and detailing. Both sit in salt air off Gulf St Vincent.",
    localNote:
      "Henley Beach sits in the City of Charles Sturt. Like-for-like roof repairs and restoration are generally treated as maintenance and don't need approval. Two local realities shape roof work here: the salt exposure that comes with any beachside suburb, which favours marine-grade materials; and the prevalence of high-value modern homes, whose complex roofs and box gutters need a roofer comfortable with contemporary detailing, not just tile restoration.",

    commonIssues: [
      "Salt corrosion on metal roofs and fasteners",
      "Ageing tile and iron on older bungalows and villas",
      "Flashing and box gutter leaks on modern two-storey homes",
      "Wind-driven rain entry on exposed beachside roofs",
    ],

    services: [
      {
        title: "Coastal re-roofing & repairs",
        description:
          "Repairing and replacing salt-affected roofs with marine-grade materials suited to Henley's beachside exposure.",
      },
      {
        title: "Modern roof & flashing work",
        description:
          "Flashing, box gutter and detailing repairs on the complex contemporary rooflines common on Henley's rebuilds.",
      },
      {
        title: "Tile restoration & leak repair",
        description:
          "Restoring the older bungalow and villa roofs a few streets back, and finding leaks before they spread.",
      },
    ],

    faqs: [
      {
        q: "I'm doing a knockdown-rebuild in Henley Beach — what roof suits the coast?",
        a: "For a beachside rebuild, marine-grade metal (like the upgraded Colorbond coastal range) is a common choice because it resists salt corrosion far better than standard sheeting. Beyond the material, the detailing matters most on modern designs — well-built flashings, box gutters and overflows are what keep complex contemporary roofs watertight. A roofer experienced with modern coastal builds can advise on both.",
      },
      {
        q: "Why do Henley Beach roofs need salt-resistant materials?",
        a: "Henley sits right on Gulf St Vincent, so salt air settles on roofs and speeds up corrosion of metal, fasteners and flashings — faster than inland. Marine-grade sheeting and corrosion-resistant fixings hold up much better in that environment, which is why they're worth specifying on coastal homes here.",
      },
      {
        q: "How much does roof work cost in Henley Beach?",
        a: "It spans a wide range because the homes do — a restoration on an older bungalow and a flashing job on a large modern two-storey are very different. Bigger, more complex roofs cost more to work on. Because of that, it really needs an on-site look; the roofer we connect you with will assess it and give you a proper quote.",
      },
      {
        q: "Do I need council approval for roof work in Henley Beach?",
        a: "For standard like-for-like repairs and restoration, generally no — the City of Charles Sturt treats that as maintenance. Larger building work as part of a rebuild is a different matter and goes through the normal development process, but routine roof maintenance usually doesn't need approval.",
      },
    ],

    landmarks: ["Henley Square & jetty", "Henley Beach Esplanade", "Henley Town Hall", "Henley Beach Road", "Henley & Grange Memorial Reserve"],
  },
  grange: {
    ready: true,
    slug: "grange",
    region: "western-suburbs",
    name: "Grange",
    postcode: "5022",
    metaTitle: "Roofers in Grange, SA | Character Home & Coastal Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Grange? We connect you with a local contractor for character bungalow restoration and coastal roof repairs. Free, no obligation.",
    heroImage: "/images/hero-grange.webp",
    problemImage: "/images/problem-grange.webp",
    mapImage: "/images/map-grange.webp",

    headline: "Find a trusted roofer in Grange",
    intro:
      "Looking for a roofer in Grange? Adelaide Roofers connects you with a local roofing contractor who works the area. Grange's well-kept character homes deserve roof work done sympathetically, and the coast adds its own wear — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Grange is one of Adelaide's more established and settled beachside suburbs — quieter and more owner-occupied than its busier neighbours, with a housing stock known for well-maintained character homes, particularly 1920s and 30s bungalows. A lot of the roofing here is therefore about looking after older terracotta tile and iron roofs on character properties rather than working on new builds. Sitting a little back from the dunes, Grange gets the coastal salt exposure too, just generally less brutal than absolute beachfront.",
    localNote:
      "Grange sits in the City of Charles Sturt, and the suburb carries genuine heritage — it's named after Captain Sturt's 1840 cottage, which still stands as a heritage-listed museum, and there are local heritage and character properties through the area. Standard like-for-like repairs are treated as maintenance, but on a character or heritage home it's worth keeping the work sympathetic to the original, and checking before changing the roof's appearance.",

    commonIssues: [
      "Ageing terracotta and tile on 1920s–30s bungalows",
      "Perished ridge pointing on older character roofs",
      "Salt wear on metal roofs and fasteners near the coast",
      "Leaks at flashings and valleys on older homes",
    ],

    services: [
      {
        title: "Character home roof restoration",
        description:
          "Sympathetic cleaning, re-pointing and repair of the terracotta and tile roofs on Grange's character bungalows.",
      },
      {
        title: "Coastal roof & fastener repairs",
        description:
          "Replacing salt-worn sheeting and fasteners on metal roofs exposed to the nearby coast.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Finding and fixing the leaks that older roofs develop, usually around valleys, flashings and perished pointing.",
      },
    ],

    faqs: [
      {
        q: "How should an older character roof in Grange be restored?",
        a: "Sympathetically. Grange has a lot of 1920s–30s bungalows with terracotta or tile roofs, and the aim with these is usually to preserve the look — re-pointing ridges, replacing broken tiles with matching ones, and re-coating where appropriate, rather than anything that changes the character. A roofer used to working on older homes will approach it that way.",
      },
      {
        q: "Does being near the beach affect my Grange roof?",
        a: "Yes, though Grange generally sits a little back from the dunes, so the salt exposure is real but usually milder than absolute beachfront. It still wears metal roofs, fasteners and flashings faster than inland, so corrosion-resistant fixings and periodic checks are worthwhile — particularly for homes closer to the Esplanade.",
      },
      {
        q: "Do I need council approval for roof work in Grange?",
        a: "For standard like-for-like repairs and restoration, generally no — the City of Charles Sturt treats that as maintenance. The thing to check is whether your property is a local heritage place or in a character area, in which case changes affecting appearance can need approval. A local roofer or the council can confirm.",
      },
      {
        q: "How much does roof restoration cost in Grange?",
        a: "It depends on the roof's size, pitch and condition, and older character roofs sometimes need more careful, detailed work which can affect the figure. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures — but it needs an on-site look. The roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Charles Sturt Museum", "Grange Jetty", "Grange railway station", "Jetty Street", "Grange Esplanade"],
  },
  glenelg: {
    ready: true,
    slug: "glenelg",
    region: "western-suburbs",
    name: "Glenelg",
    postcode: "5045",
    metaTitle: "Roofers in Glenelg, SA | Apartment, Heritage & Coastal Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Glenelg? We connect you with a local contractor for apartment, heritage and coastal roof repairs. Free, no obligation.",
    heroImage: "/images/hero-glenelg.webp",
    problemImage: "/images/problem-glenelg.webp",
    mapImage: "/images/map-glenelg.webp",

    headline: "Find a trusted roofer in Glenelg",
    intro:
      "Looking for a roofer in Glenelg? Adelaide Roofers connects you with a local roofing contractor who works the area. Glenelg's mix of apartment buildings, heritage homes and beachfront exposure makes for a real spread of roofing work — tell us what you need and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Glenelg is Adelaide's premier beachside destination, and its housing reflects a long, layered history — grand Victorian seafront mansions, 1920s–30s Art Deco apartments, character homes, and a steady stream of modern multi-storey apartment development along the foreshore. That means roofing here leans more toward apartment and strata buildings, flat and low-pitch roofs and box gutters, than the simple pitched roofs of most suburbs — all in salt air off Gulf St Vincent.",
    localNote:
      "Glenelg sits in the City of Holdfast Bay — a different council to most of the western suburbs — which maintains Historic Conservation Areas and numerous Local Heritage Places across the suburb. For a heritage-listed property or within a conservation area, roof changes affecting appearance can need approval. And because so much of Glenelg is apartments and units, roof work often involves a body corporate rather than a single owner. A local roofer will know how to navigate both.",

    commonIssues: [
      "Box gutter and flat-roof leaks on apartment buildings",
      "Flashing and parapet failures on multi-storey blocks",
      "Salt corrosion on metal roofs near the foreshore",
      "Ageing roofs on heritage and character homes",
    ],

    services: [
      {
        title: "Apartment & strata roof work",
        description:
          "Box gutter, flat-roof and flashing repairs on the apartment and unit buildings common in Glenelg, coordinated with the body corporate where needed.",
      },
      {
        title: "Heritage & character roof repairs",
        description:
          "Sympathetic repair and restoration of the suburb's older mansions and character homes, in line with conservation requirements.",
      },
      {
        title: "Coastal metal repairs",
        description:
          "Replacing salt-affected sheets, fasteners and flashings on roofs exposed to the foreshore.",
      },
    ],

    faqs: [
      {
        q: "Who arranges roof repairs for a Glenelg apartment or unit?",
        a: "For a strata property, roof and common-area repairs are usually the body corporate's responsibility rather than an individual owner's, so it's typically organised through the strata manager. If you own a unit and suspect a roof leak, raising it with your body corporate is usually the first step. A roofer experienced with strata work can quote and coordinate accordingly.",
      },
      {
        q: "Do I need council approval for roof work in Glenelg?",
        a: "It depends where you are. Glenelg is in the City of Holdfast Bay, which has Historic Conservation Areas and many Local Heritage Places. For a heritage-listed building or within a conservation area, roof changes that affect appearance can need approval. Routine like-for-like repairs are generally treated as maintenance — but it's worth checking your property's status before changing materials or profile.",
      },
      {
        q: "Why do flat and low-pitch roofs leak more often in Glenelg?",
        a: "A lot of Glenelg's apartment buildings have flat or low-pitch roofs with internal box gutters, which drain water through the building rather than off the edge. When those channels block or a flashing fails, water backs up inside instead of running away — so they need more regular maintenance than a simple pitched roof. Add salt air and the flashings and fixings wear faster too.",
      },
      {
        q: "How much does roof work cost in Glenelg?",
        a: "It varies a lot given the spread of buildings — a unit-block box gutter repair, a heritage roof job and a coastal metal repair are very different in scope and price, and strata work can involve extra coordination. Because of that, it really needs an on-site assessment. The roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Glenelg Jetty", "Moseley Square", "Jetty Road", "Holdfast Shores Marina", "Glenelg Town Hall"],
  },
  woodville: {
    ready: true,
    slug: "woodville",
    region: "western-suburbs",
    name: "Woodville",
    postcode: "5011",
    metaTitle: "Roofers in Woodville, SA | Heritage & Character Roof Restoration | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Woodville? We connect you with a local contractor for character home restoration, terracotta and tile repairs. Free, no obligation.",
    heroImage: "/images/hero-woodville.webp",
    problemImage: "/images/problem-woodville.webp",
    mapImage: "/images/map-woodville.webp",

    headline: "Find a trusted roofer in Woodville",
    intro:
      "Looking for a roofer in Woodville? Adelaide Roofers connects you with a local roofing contractor who works the area. Woodville is one of the older western suburbs, with plenty of character housing that needs roof work done properly — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Woodville is one of the oldest of Adelaide's western suburbs, settled from the 1850s and considered a genteel area in its day. The result is a suburb with many fine examples of colonial, Victorian and Federation architecture, alongside post-war homes built up around the Holden era and the Queen Elizabeth Hospital. Unlike the beachside western suburbs, Woodville is inland, so there's no salt story here — the roofing is about age and character: terracotta and tile on older villas, with the perished mortar and worn coatings that come with decades of weather.",
    localNote:
      "Woodville sits in the City of Charles Sturt — in fact it's the council seat. The suburb contains a number of buildings of local heritage significance recorded in the council's planning controls, including landmarks like the Church of St Margaret of Scotland. For most homes, like-for-like roof restoration and repairs are treated as maintenance, but on a heritage or character property, changes affecting appearance can need approval, so it's worth checking your home's status first.",

    commonIssues: [
      "Perished ridge mortar on older terracotta and tile roofs",
      "Cracked and slipped tiles on ageing villas",
      "Worn coatings on decades-old concrete tile roofs",
      "Leaks at valleys, flashings and around chimneys",
    ],

    services: [
      {
        title: "Heritage & character roof restoration",
        description:
          "Sympathetic restoration of Woodville's older terracotta and tile roofs, preserving the look of colonial and Federation homes.",
      },
      {
        title: "Re-pointing & re-bedding",
        description:
          "Replacing perished ridge mortar on older roofs with flexible pointing that copes better with the building's movement.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down leaks on older homes, often around chimneys, valleys and aged flashings, before they damage ceilings.",
      },
    ],

    faqs: [
      {
        q: "My Woodville home is an old villa — how should its roof be handled?",
        a: "Carefully and sympathetically. Woodville has a lot of colonial, Victorian and Federation homes, and the aim with their terracotta or tile roofs is to preserve the original character — re-pointing ridges, replacing broken tiles with matching ones, and repairing rather than replacing where possible. A roofer experienced with older homes is the right fit for this.",
      },
      {
        q: "Do I need council approval for roof work in Woodville?",
        a: "For most homes, like-for-like roof restoration and repairs are treated as maintenance by the City of Charles Sturt and generally don't need approval. But Woodville has a number of locally heritage-significant buildings, so if your property is heritage-listed or in a character area, changes that affect appearance can require approval — worth checking your status before changing materials or profile.",
      },
      {
        q: "Why does the ridge mortar on older Woodville roofs fail?",
        a: "It's age. The cement mortar bedding the ridge capping on older roofs becomes brittle over many decades and eventually cracks and lets water in. On a heritage or character home it's usually replaced with flexible pointing, which lasts much longer and copes better with the building's natural movement, while keeping the roofline looking right.",
      },
      {
        q: "How much does roof restoration cost in Woodville?",
        a: "It depends on the roof's size and condition and how much careful work an older roof needs. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures, with heritage detailing sometimes adding to that. It really needs an on-site look — the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Woodville Town Hall", "Queen Elizabeth Hospital", "St Margaret of Scotland Church", "Woodville Road", "Woodville Oval"],
  },
  findon: {
    ready: true,
    slug: "findon",
    region: "western-suburbs",
    name: "Findon",
    postcode: "5023",
    metaTitle: "Roofers in Findon, SA | Roof Restoration & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Findon? We connect you with a local contractor for tile restoration, re-pointing and leak repairs on post-war homes. Free, no obligation.",
    heroImage: "/images/hero-findon.webp",
    problemImage: "/images/problem-findon.webp",
    mapImage: "/images/map-findon.webp",

    headline: "Find a trusted roofer in Findon",
    intro:
      "Looking for a roofer in Findon? Adelaide Roofers connects you with a local roofing contractor who works the area. A lot of Findon's solid post-war homes are now at the age where the roof needs attention — tell us what's going on and we'll connect you with someone local. The connection is free.",

    roofStock:
      "Findon is an established, affordable inland suburb that filled out largely in the post-war decades, with a strong Italian community whose solid, well-built brick homes are a defining feature of the area. Most of the housing is that era's masonry homes under concrete tile, alongside some newer infill. Being inland, there's no coastal salt to deal with here — the roofing is about age: concrete tile roofs that have lost their coating, with ridge mortar and the odd cracked tile that come with decades of weather.",
    localNote:
      "Findon sits in the City of Charles Sturt. Like-for-like roof restoration and repairs are treated as maintenance and generally don't need development approval. One thing worth noting locally: a lot of Findon's post-war homes are very solidly built, which is good news — the structures are sound, and it's usually just the roof covering that's reached the end of its life and needs restoring rather than anything structural.",

    commonIssues: [
      "Faded, porous concrete tiles past their coating",
      "Perished ridge pointing on post-war roofs",
      "Cracked or slipped tiles after decades of weather",
      "Leaks showing as ceiling stains after heavy rain",
    ],

    services: [
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, replacing broken tiles, re-pointing ridges and re-coating the ageing concrete tile roofs common on Findon's post-war homes.",
      },
      {
        title: "Re-pointing & re-bedding",
        description:
          "Replacing perished cement ridge mortar with flexible pointing that lasts much longer than the original.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down leaks — usually a slipped tile, cracked pointing or failed flashing — before they reach the ceiling.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Findon?",
        a: "It depends on the roof's size and pitch and how much tile and mortar work is needed, so it has to be quoted on site. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly fall in the mid-four-figure to high-four-figure range — treat that as a ballpark only. The roofer we connect you with will price it properly after a look.",
      },
      {
        q: "My Findon home is solidly built — is restoring the roof worth it?",
        a: "Usually, yes. A lot of Findon's post-war homes are very well built, so the structure is typically sound and it's just the roof covering that's aged — the tile coating worn off and the ridge mortar cracked. That makes restoration a sensible, cost-effective fix: you preserve a good house with a refreshed, watertight roof rather than facing a full replacement.",
      },
      {
        q: "Do I need council approval for roof work in Findon?",
        a: "For most homes, no — like-for-like roof restoration and repairs in the City of Charles Sturt are treated as maintenance and generally don't require development approval. Only larger changes beyond standard roof work would, so a routine restoration is usually straightforward.",
      },
      {
        q: "Why do concrete tile roofs in Findon need restoring after a few decades?",
        a: "Concrete tiles have a factory coating that gradually wears off with sun and weather, leaving the tiles porous, and the cement mortar bedding the ridge capping becomes brittle and cracks. After several decades both reach the point where a restoration — clean, re-point, re-coat — is needed to keep the roof watertight. It's normal wear for roofs of this age.",
      },
    ],

    landmarks: ["Findon Shopping Centre", "Findon Road", "Findon Community Centre", "Findon High School", "St Clair Recreation Centre"],
  },
  "west-lakes": {
    ready: true,
    slug: "west-lakes",
    region: "western-suburbs",
    name: "West Lakes",
    postcode: "5021",
    metaTitle: "Roofers in West Lakes, SA | Waterfront & Coastal Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in West Lakes? We connect you with a local contractor for waterfront roof repairs, restoration and salt-exposure work. Free, no obligation.",
    heroImage: "/images/hero-west-lakes.webp",
    problemImage: "/images/problem-west-lakes.webp",
    mapImage: "/images/map-west-lakes.webp",

    headline: "Find a trusted roofer in West Lakes",
    intro:
      "Looking for a roofer in West Lakes? Adelaide Roofers connects you with a local roofing contractor who works the area. West Lakes' waterfront homes and 1970s–80s housing have their own roofing quirks — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "West Lakes is unlike anywhere else in the western suburbs — a planned community built by Delfin in the 1970s around a large artificial lake on reclaimed land. The housing dates mostly from that 1970s–80s era, so a lot of roofs are now at the age where restoration and re-pointing are due. The twist here is the lake itself: it's a tidal saltwater lake connected to Gulf St Vincent, so waterfront and lakeside homes get a degree of salt and humidity exposure you wouldn't expect this far from the open coast.",
    localNote:
      "West Lakes sits in the City of Charles Sturt. Standard like-for-like roof repairs and restoration are treated as maintenance and generally don't need approval. Two local points: homes right on the lake benefit from corrosion-resistant materials given the saltwater exposure; and because West Lakes was a planned Delfin development, some original properties carry land-title encumbrances that historically guided house design, so it's worth a quick title check before changing the roof's appearance.",

    commonIssues: [
      "Ageing 1970s–80s concrete tile and metal roofs",
      "Salt and humidity wear on lakeside metal roofs",
      "Perished ridge pointing due for replacement",
      "Leaks at flashings and valleys on older roofs",
    ],

    services: [
      {
        title: "Roof restoration & re-pointing",
        description:
          "Cleaning, re-pointing and re-coating the 1970s–80s roofs across West Lakes that are now reaching restoration age.",
      },
      {
        title: "Waterfront metal roof repairs",
        description:
          "Replacing salt-affected sheets and fasteners on lakeside homes exposed to the tidal saltwater lake.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Finding and fixing leaks on older roofs, typically around valleys, flashings and worn pointing.",
      },
    ],

    faqs: [
      {
        q: "Does the lake affect roofs in West Lakes?",
        a: "For waterfront and lakeside homes, yes. The West Lakes lake is a tidal saltwater body connected to Gulf St Vincent, so homes right on the water get some of the same salt and humidity exposure as coastal properties — which wears metal roofs, fasteners and flashings faster. Corrosion-resistant materials are worth considering for lakeside homes. Properties further back from the water are less affected.",
      },
      {
        q: "My West Lakes home is from the 1970s or 80s — does the roof need work?",
        a: "Quite possibly. Most of West Lakes was built in that era, so a lot of local roofs are now 40-plus years old — the point where concrete tile coatings have worn off and ridge mortar has cracked. The structure is usually fine; a restoration re-seals and re-points the roof to keep it watertight. A local roofer can confirm whether yours is due.",
      },
      {
        q: "Are there rules about changing my roof in West Lakes?",
        a: "Possibly. As a planned Delfin development, some original West Lakes properties carry land-title encumbrances that historically controlled house design and appearance. Routine roof maintenance is generally fine, but before changing the roof's colour or style it's worth checking your title for any encumbrance, alongside the usual City of Charles Sturt position.",
      },
      {
        q: "How much does roof work cost in West Lakes?",
        a: "It depends on the roof's size and condition, and lakeside homes may warrant corrosion-resistant materials that affect the figure. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures — but it needs an on-site look. The roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["West Lakes (the lake)", "Westfield West Lakes", "Delfin Island", "West Lakes Boulevard", "Adelaide Sailing Club"],
  },

  // ── Eastern ──
  burnside: {
    ready: true,
    slug: "burnside",
    region: "eastern-suburbs",
    name: "Burnside",
    postcode: "5066",
    metaTitle: "Roofers in Burnside, SA | Heritage, Slate & Tile Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Burnside? We connect you with a local contractor for heritage, slate and terracotta roof restoration on character homes. Free, no obligation.",
    heroImage: "/images/hero-burnside.webp",
    problemImage: "/images/problem-burnside.webp",
    mapImage: "/images/map-burnside.webp",

    headline: "Find a trusted roofer in Burnside",
    intro:
      "Looking for a roofer in Burnside? Adelaide Roofers connects you with a local roofing contractor who works the area. Burnside's grand heritage homes — many with slate, terracotta or original iron roofs — need a roofer who knows older roofs, not just modern tile. Tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Burnside is one of Adelaide's most prestigious suburbs, set in the lower eastern foothills, and its housing reflects that — grand bluestone and freestone villas and substantial character homes on leafy, elevated streets. The roofing here is genuinely period: the area's historic homes carry pitched roofs in terracotta tile and galvanised iron, and some retain their original slate, which is specialist work to repair. Add the foothills setting, with mature trees dropping leaf into gutters and valleys, and Burnside roofs ask more of a roofer than a standard suburban tile roof.",
    localNote:
      "Burnside sits in the City of Burnside, which maintains Historic Area overlays over its character streetscapes and even employs a heritage adviser who can give guidance on roofing and stonework. For a heritage property or within a historic area, roof changes that affect appearance — particularly switching away from slate or traditional iron — can need approval. Like-for-like repairs are generally fine, but it's worth checking your home's status before changing materials.",

    commonIssues: [
      "Slipped or cracked slate on original slate roofs",
      "Corrosion on heritage galvanised iron roofs",
      "Perished mortar and bedding on terracotta tile roofs",
      "Gutters and valleys choked by foothills leaf litter",
    ],

    services: [
      {
        title: "Slate & heritage iron repair",
        description:
          "Specialist repair and replacement of original slate and traditional galvanised iron roofs, matching materials to preserve the home's character.",
      },
      {
        title: "Terracotta tile restoration",
        description:
          "Re-bedding, re-pointing and repairing the terracotta tile roofs common on Burnside's character villas.",
      },
      {
        title: "Gutter, valley & leak work",
        description:
          "Clearing leaf-choked gutters and valleys and fixing the leaks that older, complex foothills roofs tend to develop.",
      },
    ],

    faqs: [
      {
        q: "My Burnside home has a slate roof — can it be repaired?",
        a: "Usually, yes, and on a heritage home that's the preferred approach. Slate is durable but individual tiles slip or crack over time; a roofer experienced with slate can replace them with matching material and re-secure them rather than replacing the whole roof. It's specialist work, so it's worth being connected with someone who genuinely does slate rather than a tile-only roofer.",
      },
      {
        q: "Do I need council approval for roof work in Burnside?",
        a: "It depends on your property. The City of Burnside has Historic Area overlays and a heritage adviser, and for a heritage-listed home or one in a historic area, roof changes affecting appearance — especially moving away from slate or traditional iron — can need approval. Like-for-like repairs are generally treated as maintenance, but it's worth checking your status, and the council's heritage adviser can guide you.",
      },
      {
        q: "Why do Burnside's foothills roofs get gutter and valley problems?",
        a: "The same leafy, elevated streets that make Burnside beautiful also drop a lot of leaf litter, which collects in gutters and the complex valleys of larger character roofs. Once a valley or downpipe blocks, water can back up under the roof and into the ceiling — so gutter and valley maintenance is a regular need on Burnside's bigger homes.",
      },
      {
        q: "How much does heritage roof work cost in Burnside?",
        a: "It varies widely because the roofs do — slate, heritage iron and terracotta are all different jobs, and heritage work can carry extra care and requirements that affect the figure. Larger, more complex roofs cost more too. Because of that range, it really needs an on-site assessment; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Burnside Village", "Hazelwood Park", "Greenhill Road", "Tusmore Park", "Mount Lofty foothills"],
  },
  norwood: {
    ready: true,
    slug: "norwood",
    region: "eastern-suburbs",
    name: "Norwood",
    postcode: "5067",
    metaTitle: "Roofers in Norwood, SA | Character Cottage & Heritage Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Norwood? We connect you with a local contractor for character cottage roof restoration, iron and tile repairs. Free, no obligation.",
    heroImage: "/images/hero-norwood.webp",
    problemImage: "/images/problem-norwood.webp",
    mapImage: "/images/map-norwood.webp",

    headline: "Find a trusted roofer in Norwood",
    intro:
      "Looking for a roofer in Norwood? Adelaide Roofers connects you with a local roofing contractor who works the area. Norwood's tightly-packed character cottages and bungalows need roof work that respects their heritage — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Norwood is one of Adelaide's oldest and most character-rich inner-east suburbs, with streets densely lined with Victorian and Edwardian cottages, single-fronted villas and 1920s–30s bungalows. The housing sits on tight blocks, often with shared boundary walls and complex little rooflines, and much of it carries traditional corrugated iron or terracotta tile. That density and age is what shapes roofing here — heritage-sympathetic repairs on older iron and tile, where the work has to fit a protected streetscape rather than just a single house.",
    localNote:
      "Norwood sits in the City of Norwood Payneham & St Peters, which has an unusually large number of Historic Areas and Character Areas — covering much of the suburb — where roof form and materials are among the streetscape elements specifically protected. That means roof changes affecting appearance can need council approval here more often than in most suburbs. Routine like-for-like repairs are generally fine, but it's genuinely worth checking your property's overlay status before changing the roof's look.",

    commonIssues: [
      "Corrosion on traditional corrugated iron roofs",
      "Perished mortar on terracotta and tile cottage roofs",
      "Leaks along party walls and tight valleys on cottages",
      "Failing flashings around old chimneys and parapets",
    ],

    services: [
      {
        title: "Heritage cottage roof restoration",
        description:
          "Sympathetic repair of the corrugated iron and terracotta roofs on Norwood's Victorian and Edwardian cottages.",
      },
      {
        title: "Iron roof repair & replacement",
        description:
          "Matching traditional-profile sheeting on heritage iron roofs to keep the streetscape and the home's character intact.",
      },
      {
        title: "Flashing & party-wall leak repair",
        description:
          "Fixing the leaks that tightly-built cottages develop around shared walls, parapets and old chimneys.",
      },
    ],

    faqs: [
      {
        q: "Do I need council approval for roof work in Norwood?",
        a: "Often, yes — more so than in most suburbs. The City of Norwood Payneham & St Peters has many Historic Areas and Character Areas covering much of Norwood, and roof form and materials are among the streetscape features they protect. So changing the roof's appearance can require approval. Like-for-like repairs are generally treated as maintenance, but given how widely the overlays apply here, it's worth confirming your property's status first.",
      },
      {
        q: "My Norwood cottage has an old iron roof — should I keep it?",
        a: "On a character cottage in a heritage area, keeping and repairing the traditional iron is usually both preferred and, in many cases, expected by the overlay. A roofer experienced with heritage iron can replace corroded sections with matching traditional-profile sheeting so the look is preserved. Switching to a modern material may need approval, so it's worth checking before deciding.",
      },
      {
        q: "Why do Norwood cottages get leaks along the walls between houses?",
        a: "Many Norwood cottages are built right up to their boundaries with shared or party walls, and the roof meets those walls through flashings that perish over decades. When a flashing fails, rain running down the wall gets behind it and into the ceiling. These tight junctions are a common leak point on older inner-east cottages and need careful repair.",
      },
      {
        q: "How much does roof restoration cost in Norwood?",
        a: "It depends on the roof's size, materials and how much heritage-sensitive work is involved — iron, terracotta and tight cottage rooflines all differ. As a general guide, restorations on a standard single-storey home in Adelaide commonly run in the mid-to-high four figures, with heritage detailing sometimes adding to that. It needs an on-site look; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["The Parade", "Norwood Oval", "Osmond Terrace", "Norwood Town Hall", "Magill Road"],
  },
  unley: {
    ready: true,
    slug: "unley",
    region: "eastern-suburbs",
    name: "Unley",
    postcode: "5061",
    metaTitle: "Roofers in Unley, SA | Heritage Villa & Stone Home Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Unley? We connect you with a local contractor for heritage villa restoration, slate, iron and tile roof repairs. Free, no obligation.",
    heroImage: "/images/hero-unley.webp",
    problemImage: "/images/problem-unley.webp",
    mapImage: "/images/map-unley.webp",

    headline: "Find a trusted roofer in Unley",
    intro:
      "Looking for a roofer in Unley? Adelaide Roofers connects you with a local roofing contractor who works the area. Unley's stone villas and Federation homes need roof work done sympathetically and to council requirements — tell us what's going on and we'll connect you with someone who knows heritage roofs. The connection is free.",

    roofStock:
      "Unley is one of Adelaide's premier inner-south heritage suburbs, full of grand Victorian and Federation villas, stone cottages and Edwardian homes on its leafy streets around Unley Road and King William Road. The housing is typically bluestone and sandstone with rendered detailing, and the roofs are period to match — slate and galvanised iron on the older villas, terracotta tile on others. Looking after these roofs is specialist work: it's about preserving original materials and detailing, not just patching a modern tile roof.",
    localNote:
      "Unley sits in the City of Unley, whose planning controls include a number of Historic Conservation areas covering much of the suburb's character housing. Within those overlays, external changes — including to the roof's appearance — frequently require development approval, and the council publishes guidance on appropriate materials and finishes. Like-for-like repairs are generally treated as maintenance, but given how much of Unley sits under heritage controls, it's worth checking your property's status before changing the roof.",

    commonIssues: [
      "Slipped or broken slate on original slate roofs",
      "Corrosion on heritage galvanised iron roofs",
      "Perished ridge mortar on terracotta villa roofs",
      "Leaks around ornate chimneys, parapets and valleys",
    ],

    services: [
      {
        title: "Heritage villa roof restoration",
        description:
          "Sympathetic restoration of slate, iron and terracotta roofs on Unley's stone villas, preserving original materials and detailing.",
      },
      {
        title: "Slate & traditional iron repair",
        description:
          "Specialist repair and matching of original slate and galvanised iron roofs to keep the home's heritage character.",
      },
      {
        title: "Leak detection & flashing repair",
        description:
          "Finding and fixing leaks on older homes, often around ornate chimneys, parapets and complex valleys.",
      },
    ],

    faqs: [
      {
        q: "Do I need council approval for roof work in Unley?",
        a: "Quite possibly. Much of Unley sits within Historic Conservation areas under the City of Unley's planning controls, and within those, changes to a home's external appearance — including the roof — frequently require development approval. Routine like-for-like repairs are generally treated as maintenance, but because the overlays are so widespread here, it's worth confirming your property's status and checking the council's heritage guidance before changing materials or colour.",
      },
      {
        q: "My Unley villa has a slate or iron roof — how should it be handled?",
        a: "Sympathetically, and ideally by a roofer who specialises in those materials. On a heritage villa, the aim is to preserve the original — re-securing or replacing slipped slate with matching slate, and repairing traditional iron with matching profiles — rather than switching to modern materials, which may also need approval. It's specialist work, so being connected with the right roofer matters.",
      },
      {
        q: "Why does the ridge mortar fail on older Unley roofs?",
        a: "On terracotta tile villas, the cement mortar bedding the ridge capping becomes brittle over many decades and cracks, letting water in. It's usually replaced with flexible pointing, which lasts much longer and copes better with the building's movement, while keeping the heritage roofline looking right. On slate and iron roofs the failure points are different — typically fixings and flashings.",
      },
      {
        q: "How much does heritage roof restoration cost in Unley?",
        a: "It varies a lot with the roof's material and size — slate, iron and terracotta are very different jobs, and heritage-sensitive work and council requirements can add to the figure. As a guide, restorations on a standard single-storey home in Adelaide commonly run in the mid-to-high four figures, with grander villas more. It needs an on-site look; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["King William Road", "Unley Road", "Unley Oval", "Hyde Park", "Unley Town Hall"],
  },
  magill: {
    ready: true,
    slug: "magill",
    region: "eastern-suburbs",
    name: "Magill",
    postcode: "5072",
    metaTitle: "Roofers in Magill, SA | Roof Restoration & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Magill? We connect you with a local contractor for heritage and tile roof restoration, leak repairs and re-roofing. Free, no obligation.",
    heroImage: "/images/hero-magill.webp",
    problemImage: "/images/problem-magill.webp",
    mapImage: "/images/map-magill.webp",

    headline: "Find a trusted roofer in Magill",
    intro:
      "Looking for a roofer in Magill? Adelaide Roofers connects you with a local roofing contractor who works the area. Magill mixes very old heritage homes with later housing across the foothills, so the roofing varies a lot — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Magill is one of the oldest parts of eastern Adelaide — first subdivided in 1838, with early stone homes built from local quarry stone, settled by the stonemasons and tradespeople who worked the area. The result today is a real mix: heritage stone cottages and villas alongside post-war homes and pockets of newer development, including the former university campus site being redeveloped. Set at the foot of the Mount Lofty Ranges around Third Creek, Magill's roofs span everything from original iron and slate to mid-century tile.",
    localNote:
      "Magill has an unusual quirk worth knowing: the suburb straddles two councils. Roughly speaking, the area north of Magill Road sits in the City of Campbelltown and the area south in the City of Burnside — so which council you deal with for any approvals depends on which side of Magill Road your home is on. For most homes, like-for-like roof repairs are treated as maintenance either way, but on a heritage or character property, changes affecting appearance can need approval from whichever council you fall under.",

    commonIssues: [
      "Ageing iron and slate on older heritage homes",
      "Perished pointing on mid-century tile roofs",
      "Cracked or slipped tiles after decades of weather",
      "Leaks at valleys, flashings and old chimneys",
    ],

    services: [
      {
        title: "Heritage & character roof repair",
        description:
          "Sympathetic repair of the iron, slate and early tile roofs on Magill's older stone cottages and villas.",
      },
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, re-pointing and repairing the mid-century tile roofs across Magill's post-war housing.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down leaks on older and newer roofs alike, usually around valleys, flashings and chimneys.",
      },
    ],

    faqs: [
      {
        q: "Which council do I deal with for roof work in Magill?",
        a: "It depends which part of Magill you're in. The suburb straddles two councils — broadly, north of Magill Road is the City of Campbelltown and south is the City of Burnside. For routine like-for-like roof repairs it usually doesn't matter, as those are treated as maintenance. But if your property is heritage or character-listed and you're changing the roof's appearance, you'd deal with whichever council your side of Magill Road falls under. A local roofer can help you work out which applies.",
      },
      {
        q: "My Magill home is an old stone house — how should its roof be handled?",
        a: "Sympathetically, with materials matched to the original. Many of Magill's oldest homes were built from local quarry stone with iron, slate or early tile roofs, and the aim is to preserve that character — repairing and matching rather than replacing with modern materials, which may also need approval if your property is heritage-listed. A roofer experienced with older homes is the right fit.",
      },
      {
        q: "Does Magill's foothills location affect roofs?",
        a: "To a degree. Being at the foot of the Mount Lofty Ranges, Magill gets more leaf litter from established trees and a bit more exposure than the plains, so gutters and valleys need clearing more often to prevent water backing up. It's not a bushfire-interface suburb like the higher hills, but the foothills setting does mean a little more roof maintenance.",
      },
      {
        q: "How much does roof work cost in Magill?",
        a: "It varies widely given the mix of housing — a heritage iron repair, a tile restoration and a re-roof are very different jobs. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures, with heritage work sometimes more. It needs an on-site look; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Penfolds Magill Estate", "Magill Road", "Third Creek", "St Bernards Road", "Murray Park"],
  },
  mitcham: {
    ready: true,
    slug: "mitcham",
    region: "eastern-suburbs",
    name: "Mitcham",
    postcode: "5062",
    metaTitle: "Roofers in Mitcham, SA | Heritage Cottage & Stone Home Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Mitcham? We connect you with a local contractor for heritage cottage restoration, iron, slate and tile repairs. Free, no obligation.",
    heroImage: "/images/hero-mitcham.webp",
    problemImage: "/images/problem-mitcham.webp",
    mapImage: "/images/map-mitcham.webp",

    headline: "Find a trusted roofer in Mitcham",
    intro:
      "Looking for a roofer in Mitcham? Adelaide Roofers connects you with a local roofing contractor who works the area. Mitcham has some of the oldest housing stock in Adelaide, which needs a roofer who genuinely knows heritage work — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Mitcham Village was surveyed in 1840, making it one of the oldest European settlements in South Australia — and the area still holds some of Adelaide's earliest building stock. Around the old village you'll find genuinely old stone settler cottages and villas, many with original or early roofing in slate, galvanised iron or early tile, alongside later character homes. Sitting on the foothills edge near Brownhill Creek, the suburb mixes that very old village core with leafy established streets. Roofing here is heritage work first and foremost — preserving very old roofs, not just maintaining modern ones.",
    localNote:
      "Mitcham sits in the City of Mitcham, and the old village core is covered by the Mitcham Village Historic Conservation Zone — one of the suburb's defining features. Within that zone, and for heritage-listed properties, roof changes affecting appearance can need council approval, since the original character is specifically protected. Like-for-like repairs are generally treated as maintenance, but given how old and protected much of Mitcham's stock is, it's worth checking your property's status before changing the roof.",

    commonIssues: [
      "Slipped or cracked slate on very old cottage roofs",
      "Corrosion on original galvanised iron roofs",
      "Perished lime mortar and bedding on old stonework roofs",
      "Leaks around old chimneys, valleys and parapets",
    ],

    services: [
      {
        title: "Heritage cottage roof restoration",
        description:
          "Sympathetic repair of the slate, iron and early tile roofs on Mitcham's old stone settler cottages and villas.",
      },
      {
        title: "Slate & traditional iron repair",
        description:
          "Specialist matching and repair of original slate and galvanised iron roofs to preserve the village's heritage character.",
      },
      {
        title: "Leak detection & flashing repair",
        description:
          "Finding and fixing leaks on very old homes, often around aged chimneys, valleys and perished flashings.",
      },
    ],

    faqs: [
      {
        q: "Do I need council approval for roof work in Mitcham?",
        a: "Possibly, depending on where you are. The old village core sits within the Mitcham Village Historic Conservation Zone under the City of Mitcham, and heritage-listed properties are also protected — so within those, roof changes that affect appearance can need approval. Routine like-for-like repairs are generally treated as maintenance, but because so much of Mitcham is old and protected, it's worth confirming your property's status first.",
      },
      {
        q: "My Mitcham cottage is very old — what's involved in roofing it?",
        a: "It's specialist heritage work. Some of Mitcham's cottages date to the colony's earliest decades, and their slate, iron or early tile roofs need to be repaired with matching materials and methods rather than replaced with modern ones — both to preserve the home and, in the conservation zone, often to meet council expectations. Being connected with a roofer who genuinely does heritage work matters here.",
      },
      {
        q: "Why does old stone-cottage roofing need special care?",
        a: "Very old roofs were built with materials and methods — slate, hand-formed iron, lime-based mortars — that don't match modern products. Patching them with the wrong materials can look wrong and trap moisture against old stone and timber, causing more harm than good. A heritage-experienced roofer uses compatible materials so the repair lasts and the character is kept.",
      },
      {
        q: "How much does heritage roof restoration cost in Mitcham?",
        a: "It varies a lot with the roof's age, material and condition — slate, iron and early tile are very different jobs, and the oldest homes can need the most careful work. As a guide, restorations on a standard single-storey home in Adelaide commonly run in the mid-to-high four figures, with heritage work sometimes more. It needs an on-site look; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Mitcham Village", "Brownhill Creek", "Mitcham Reserve", "Belair Road", "Old Mitcham"],
  },
  kensington: {
    ready: true,
    slug: "kensington",
    region: "eastern-suburbs",
    name: "Kensington",
    postcode: "5068",
    metaTitle: "Roofers in Kensington, SA | Heritage Cottage & Villa Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Kensington? We connect you with a local contractor for heritage cottage restoration, iron and tile roof repairs. Free, no obligation.",
    heroImage: "/images/hero-kensington.webp",
    problemImage: "/images/problem-kensington.webp",
    mapImage: "/images/map-kensington.webp",

    headline: "Find a trusted roofer in Kensington",
    intro:
      "Looking for a roofer in Kensington? Adelaide Roofers connects you with a local roofing contractor who works the area. This is one of Adelaide's oldest village suburbs, with heritage cottages that need roofing done sympathetically — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Kensington is one of the oldest suburbs in the immediate area — its village was surveyed in 1838, and Kensington and Norwood together were the first township outside the City of Adelaide to win municipal government. The suburb has an unusual layout to match: its streets run diagonally, set out to minimise crossings of Second Creek, which still runs through. The housing is rich in heritage — Victorian and Edwardian cottages and villas, many with traditional corrugated iron, slate or early tile roofs. Roofing here is heritage work, preserving the character of a genuinely historic village.",
    localNote:
      "Kensington sits in the City of Norwood Payneham & St Peters, which protects its historic areas through Historic Area Overlays and even runs a Cultural Heritage Centre with an advisor who can give conservation advice. For heritage-listed homes or those within a historic area, roof changes affecting appearance can need approval. Like-for-like repairs are generally treated as maintenance, but given how much of Kensington is historic, it's worth checking your property's status — and the council's heritage advisor is a useful free resource.",

    commonIssues: [
      "Corrosion on traditional corrugated iron cottage roofs",
      "Slipped slate and perished bedding on old villas",
      "Leaks at flashings and valleys on heritage homes",
      "Failing detailing around old chimneys and parapets",
    ],

    services: [
      {
        title: "Heritage cottage & villa restoration",
        description:
          "Sympathetic repair of the iron, slate and early tile roofs on Kensington's Victorian and Edwardian homes.",
      },
      {
        title: "Iron & slate roof repair",
        description:
          "Matching traditional iron profiles and slate to preserve the historic village character and meet overlay expectations.",
      },
      {
        title: "Leak detection & flashing repair",
        description:
          "Finding and fixing leaks on older homes, often around aged chimneys, valleys and perished flashings.",
      },
    ],

    faqs: [
      {
        q: "Do I need council approval for roof work in Kensington?",
        a: "Possibly. Kensington has significant historic areas under the City of Norwood Payneham & St Peters, protected by Historic Area Overlays, and heritage-listed homes are protected too — so within those, roof changes affecting appearance can need approval. Routine like-for-like repairs are generally treated as maintenance. The council also runs a Cultural Heritage Centre whose advisor can help you understand what applies to your property.",
      },
      {
        q: "My Kensington cottage has an old iron or slate roof — should I keep it?",
        a: "On a heritage cottage in a historic area, keeping and repairing the original is usually both preferred and, in many cases, expected by the overlay. A roofer experienced with heritage iron and slate can repair or replace sections with matching materials so the character is preserved. Switching to a modern material may need approval, so it's worth checking first.",
      },
      {
        q: "Does Second Creek affect homes in Kensington?",
        a: "The creek shaped the suburb's unusual diagonal street layout rather than posing a direct roofing issue for most homes. That said, low-lying older properties can be more sensitive to drainage and stormwater, so keeping gutters, downpipes and roof drainage clear and well-maintained is worthwhile. A local roofer can advise if your home sits in a spot where that matters more.",
      },
      {
        q: "How much does heritage roof restoration cost in Kensington?",
        a: "It varies with the roof's material, size and condition — iron, slate and early tile are very different jobs, and heritage-sensitive work can add to the figure. As a guide, restorations on a standard single-storey home in Adelaide commonly run in the mid-to-high four figures, with grander villas more. It needs an on-site look; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Kensington village", "The Rising Sun Inn", "Second Creek", "Regent Street", "Kensington Road"],
  },
  stonyfell: {
    ready: true,
    slug: "stonyfell",
    region: "eastern-suburbs",
    name: "Stonyfell",
    postcode: "5066",
    metaTitle: "Roofers in Stonyfell, SA | Foothills & Bushfire-Area Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Stonyfell? We connect you with a local contractor for foothills roof repairs, gutter protection and re-roofing. Free, no obligation.",
    heroImage: "/images/hero-stonyfell.webp",
    problemImage: "/images/problem-stonyfell.webp",
    mapImage: "/images/map-stonyfell.webp",

    headline: "Find a trusted roofer in Stonyfell",
    intro:
      "Looking for a roofer in Stonyfell? Adelaide Roofers connects you with a local roofing contractor who works the area. Up on the hills face, surrounded by big gums and with bushfire risk on the higher edges, Stonyfell's roofs ask more of a roofer — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Stonyfell is an affluent eastern-foothills suburb set high on the hills face, among huge native gums and mature shrubs, with two creeks running through it. The housing is largely substantial — established larger homes alongside big modern and designer rebuilds, often on elevated, sloping blocks with complex rooflines. Two things define roofing here: the heavy leaf load that big native gums drop into gutters and valleys, and the suburb's position partly within the City of Burnside Bushfire Area on its higher, eastern edges.",
    localNote:
      "Stonyfell sits in the City of Burnside, and parts of it — the higher, eastern slopes against the hills face — fall within the City of Burnside Bushfire Area, with some land zoned Hills Face Zone. For homes in the bushfire area, roofing choices matter for ember protection: non-combustible roofing, sealed roof spaces and gutter guards all reduce risk. Standard roof repairs are treated as maintenance, but bushfire-area requirements can apply to building work, so it's worth raising your location with whoever does the job.",

    commonIssues: [
      "Gutters and valleys choked by native gum leaf litter",
      "Ember-entry risk at gutters and roof gaps in the bushfire area",
      "Complex rooflines and valleys on large elevated homes",
      "Leaks where multiple roof sections meet on big houses",
    ],

    services: [
      {
        title: "Gutter protection & valley clearing",
        description:
          "Fitting gutter guards and clearing the heavy gum-leaf load that builds up in Stonyfell's gutters and valleys — important for both leaks and ember protection.",
      },
      {
        title: "Bushfire-aware roof repairs",
        description:
          "Repairs and re-roofing on hills-face homes with ember protection in mind — sealing gaps and using non-combustible materials where appropriate.",
      },
      {
        title: "Large & complex roof work",
        description:
          "Repairs across the multi-section rooflines and valleys common on Stonyfell's larger established and designer homes.",
      },
    ],

    faqs: [
      {
        q: "Is my Stonyfell home in a bushfire area, and does it affect roofing?",
        a: "It can, depending on where in the suburb you are. The higher, eastern slopes of Stonyfell fall within the City of Burnside Bushfire Area, against the hills face. For homes there, roofing matters for ember protection — a well-sealed roof, non-combustible materials and gutter guards all reduce the chance of embers getting in or igniting leaf litter. It's worth telling your roofer your location so they can factor it in.",
      },
      {
        q: "Why do Stonyfell's gutters need so much attention?",
        a: "Stonyfell sits among large native gums, which drop a heavy, constant load of leaf and bark into gutters and the valleys of big roofs. Left to build up, that causes water to back up under the roof in winter — and in summer, dry leaf litter in gutters is an ember-ignition risk. Regular clearing and gutter guards address both, which is why they're a common job here.",
      },
      {
        q: "Do bigger Stonyfell homes have trickier roofs?",
        a: "Often, yes. A lot of Stonyfell's homes are large, on sloping elevated blocks, with multiple roof sections, valleys and changes of pitch. More junctions means more potential leak points, and the work needs someone comfortable with complex rooflines rather than a simple single-pitch roof. The roofer we connect you with can assess the specifics.",
      },
      {
        q: "How much does roof work cost in Stonyfell?",
        a: "It varies with the roof's size and complexity, and bushfire-area or hills-face requirements can add to the figure — larger homes with complex rooflines naturally cost more to work on. Because of that range, it really needs an on-site assessment rather than a phone estimate. The roofer we connect you with will quote it properly after a look.",
      },
    ],

    landmarks: ["Stonyfell Quarry", "Stonyfell Quarry Reserve", "St Peter's Collegiate Girls' School", "Glynburn Road", "Stonyfell Winery site"],
  },
  marryatville: {
    ready: true,
    slug: "marryatville",
    region: "eastern-suburbs",
    name: "Marryatville",
    postcode: "5068",
    metaTitle: "Roofers in Marryatville, SA | Heritage Villa & Character Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Marryatville? We connect you with a local contractor for heritage villa restoration, slate and tile roof repairs. Free, no obligation.",
    heroImage: "/images/hero-marryatville.webp",
    problemImage: "/images/problem-marryatville.webp",
    mapImage: "/images/map-marryatville.webp",

    headline: "Find a trusted roofer in Marryatville",
    intro:
      "Looking for a roofer in Marryatville? Adelaide Roofers connects you with a local roofing contractor who works the area. Marryatville's grand heritage homes on leafy, tree-lined streets need roofing done with care — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Marryatville is a small, prestigious inner-east suburb, laid out as a village in 1848 and now known for its leafy, tree-lined streets and substantial heritage homes — grand Victorian and Edwardian villas on generous, established blocks. Some of its finest heritage buildings, like Eden Park and The Acacias, now sit within the local school grounds. The roofs match the homes: slate, galvanised iron and terracotta on larger, often complex villa rooflines, set among mature trees with First and Second Creek running through the suburb.",
    localNote:
      "Marryatville sits in the City of Norwood Payneham & St Peters, whose Historic Area Overlays protect much of the suburb's character. For heritage-listed homes or those in a historic area, roof changes affecting appearance can need approval. Two practical points stand out here: the homes are larger, so roofs are bigger and more complex than average; and the mature trees that make Marryatville beautiful also drop a steady leaf load into gutters and valleys, so drainage maintenance matters.",

    commonIssues: [
      "Slipped or cracked slate on grand villa roofs",
      "Gutters and valleys choked by leaf from mature trees",
      "Perished ridge mortar on terracotta villa roofs",
      "Leaks where complex roof sections meet on large homes",
    ],

    services: [
      {
        title: "Heritage villa roof restoration",
        description:
          "Sympathetic restoration of slate, iron and terracotta roofs on Marryatville's grand villas, preserving original materials and detailing.",
      },
      {
        title: "Gutter & valley maintenance",
        description:
          "Clearing the heavy leaf load that mature trees drop into the gutters and valleys of Marryatville's larger roofs.",
      },
      {
        title: "Complex roof & leak repair",
        description:
          "Repairs across the multi-section rooflines of substantial homes, and finding leaks where roof sections meet.",
      },
    ],

    faqs: [
      {
        q: "Do I need council approval for roof work in Marryatville?",
        a: "Possibly. Much of Marryatville's character is protected through Historic Area Overlays under the City of Norwood Payneham & St Peters, and heritage-listed homes are protected too — so within those, roof changes affecting appearance can need approval. Like-for-like repairs are generally treated as maintenance, but given the suburb's heritage character, it's worth confirming your property's status before changing materials.",
      },
      {
        q: "My Marryatville home is a grand old villa — what's involved in roofing it?",
        a: "These are larger, often complex roofs in slate, iron or terracotta, so the work is more involved than a standard suburban roof — and on a heritage villa, the aim is to preserve the original with matching materials and detailing. It's specialist work that benefits from a roofer experienced with grand heritage homes — exactly the kind of roofer we aim to connect you with.",
      },
      {
        q: "Why do Marryatville's gutters need regular attention?",
        a: "The mature, leafy trees that give Marryatville its character drop a steady load of leaf and debris into gutters and the valleys of large villa roofs. Left to build up, that causes water to back up under the roof and into ceilings, especially in winter. Regular clearing — and gutter guards on the worst-affected roofs — keeps the water flowing where it should.",
      },
      {
        q: "How much does heritage roof restoration cost in Marryatville?",
        a: "It varies with the roof's size, material and complexity, and Marryatville's larger villas naturally cost more to work on than a small cottage — plus heritage-sensitive work can add to the figure. As a guide, restorations on a standard single-storey home in Adelaide commonly run in the mid-to-high four figures, with grand villas more. It needs an on-site look; the roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Marryatville High School", "Loreto College", "Marryatville Hotel", "Kensington Road", "First & Second Creek"],
  },

  // ── Southern ──
  "morphett-vale": {
    ready: true,
    slug: "morphett-vale",
    region: "southern-suburbs",
    name: "Morphett Vale",
    postcode: "5162",
    metaTitle: "Roofers in Morphett Vale, SA | Roof Restoration & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Morphett Vale? We connect you with a local contractor for tile roof restoration, re-pointing and leak repairs. Free, no obligation.",
    heroImage: "/images/hero-morphett-vale.webp",
    problemImage: "/images/problem-morphett-vale.webp",
    mapImage: "/images/map-morphett-vale.webp",

    headline: "Find a trusted roofer in Morphett Vale",
    intro:
      "Looking for a roofer in Morphett Vale? Adelaide Roofers connects you with a local roofing contractor who works the area. A huge number of Morphett Vale's homes were built in the same era and their roofs are now reaching restoration age together — tell us what's going on and we'll connect you with someone local. The connection is free.",

    roofStock:
      "Morphett Vale is the largest suburb in South Australia — a vast residential area that grew from an 1840 township into a metropolitan suburb through extensive subdivision in the 1960s and 70s. The legacy of that is street after street of family homes from the same few decades, most under concrete tile that's now well past its original coating. There's a small heritage core too — the old Courthouse and the 1878 bluestone Institute survive — but the defining roofing reality here is the sheer volume of mid-century tile roofs all hitting restoration age around the same time.",
    localNote:
      "Morphett Vale sits in the City of Onkaparinga, well inland from the coast, so there's no salt to deal with — the roofing here is about age, not exposure. Like-for-like roof restoration and repairs are treated as maintenance and generally don't need approval. The practical upside of so many similar-era homes is that restoring these roofs is well-understood, routine work for a local roofer — clean, re-point and re-coat to get another long stretch of life out of them.",

    commonIssues: [
      "Faded, porous concrete tiles past their coating",
      "Perished ridge pointing on 1960s–70s roofs",
      "Cracked or slipped tiles after decades of weather",
      "Leaks showing as ceiling stains after heavy rain",
    ],

    services: [
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, replacing broken tiles, re-pointing ridges and re-coating the ageing concrete tile roofs on Morphett Vale's mid-century homes.",
      },
      {
        title: "Re-pointing & re-bedding",
        description:
          "Replacing perished cement ridge mortar with flexible pointing that lasts far longer than the original.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down leaks — usually a slipped tile, cracked pointing or failed flashing — before they reach the ceiling.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Morphett Vale?",
        a: "It depends on the roof's size and pitch and how much tile and mortar work is needed, so it has to be quoted on site. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly fall in the mid-to-high four-figure range — treat that as a ballpark. Many Morphett Vale homes are standard single-storey houses, which keeps things predictable. The roofer we connect you with will price it after a look.",
      },
      {
        q: "Why do so many Morphett Vale roofs seem to need work at once?",
        a: "Because so much of the suburb was built in the same era. When street after street goes up across the 1960s and 70s, those concrete tile roofs all age on roughly the same timeline — and decades on, they reach the point where the coating has worn off and the ridge mortar has cracked together. It's normal wear, just happening across a lot of homes around the same time.",
      },
      {
        q: "Is restoring my Morphett Vale tile roof worth it versus replacing?",
        a: "Usually restoration makes sense. The tiles themselves are often still sound — it's the surface coating and the ridge pointing that have aged. Cleaning, re-pointing and re-coating restores weather protection and appearance for a fraction of a full re-roof. A roofer will only recommend replacement if the tiles themselves are widely cracked or failing.",
      },
      {
        q: "Do I need council approval for roof work in Morphett Vale?",
        a: "For most homes, no — like-for-like roof restoration and repairs in the City of Onkaparinga are treated as maintenance and generally don't require development approval. Only larger building changes would, so a routine restoration or re-roof is usually straightforward.",
      },
    ],

    landmarks: ["Old Courthouse", "Morphett Vale Institute", "Wheatsheaf Road", "Main South Road", "Emmaus Christian College"],
  },
  noarlunga: {
    ready: true,
    slug: "noarlunga",
    region: "southern-suburbs",
    name: "Noarlunga",
    postcode: "5168",
    metaTitle: "Roofers in Noarlunga, SA | Heritage & Tile Roof Restoration | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Noarlunga? We connect you with a local contractor for heritage, tile and metal roof restoration and leak repairs. Free, no obligation.",
    heroImage: "/images/hero-noarlunga.webp",
    problemImage: "/images/problem-noarlunga.webp",
    mapImage: "/images/map-noarlunga.webp",

    headline: "Find a trusted roofer in Noarlunga",
    intro:
      "Looking for a roofer in Noarlunga? Adelaide Roofers connects you with a local roofing contractor who works the area. From the old stone village on the river to the surrounding suburban homes, Noarlunga's roofing varies a lot — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Noarlunga is the heart of Adelaide's south, and it spans a wide range. At its core is Old Noarlunga — a township laid out in 1840 on a horseshoe bend of the Onkaparinga River, still full of old stone buildings with a preserved village character. Around it sits the modern regional hub built up from the late 1970s, with Colonnades and the hospital, and street after street of surrounding family homes. So the roofs here run from genuinely old stone-building roofs in the village to standard mid-century and newer tile across the district.",
    localNote:
      "Noarlunga sits in the City of Onkaparinga. For most homes, like-for-like roof repairs and restoration are treated as maintenance and don't need approval. The exception is the Old Noarlunga heritage area: there, the old stone buildings carry genuine heritage value, so roof changes affecting appearance can need approval and benefit from a roofer experienced with heritage work. Elsewhere across Noarlunga, it's the usual ageing-tile restoration story, well inland from salt.",

    commonIssues: [
      "Ageing iron and heritage roofs on old stone village buildings",
      "Faded concrete tiles on surrounding suburban homes",
      "Perished ridge pointing due for replacement",
      "Leaks at valleys, flashings and old chimneys",
    ],

    services: [
      {
        title: "Heritage roof repair (Old Noarlunga)",
        description:
          "Sympathetic repair of the iron and heritage roofs on Old Noarlunga's old stone buildings, matching materials to preserve the village character.",
      },
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, re-pointing and re-coating the mid-century tile roofs across Noarlunga's suburban housing.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Finding and fixing leaks on older and newer roofs alike, usually around valleys, flashings and chimneys.",
      },
    ],

    faqs: [
      {
        q: "Do I need council approval for roof work in Noarlunga?",
        a: "It depends where you are. Around the Old Noarlunga heritage area, the old stone buildings carry heritage value under the City of Onkaparinga, so roof changes affecting appearance can need approval. Across the rest of Noarlunga, like-for-like roof restoration and repairs are treated as maintenance and generally don't. If you're in or near the old village, it's worth checking your property's status first.",
      },
      {
        q: "My home is one of Old Noarlunga's stone buildings — how should the roof be handled?",
        a: "Sympathetically, by a roofer who knows heritage work. The old stone buildings around the village have roofs in iron or other traditional materials, and the aim is to preserve that character — repairing and matching rather than switching to modern materials, which may also need approval. It's specialist work, and being connected with the right roofer matters.",
      },
      {
        q: "How much does roof work cost in Noarlunga?",
        a: "It varies with the job — a heritage repair in the old village and a standard tile restoration on a suburban home are quite different in scope. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures, with heritage work sometimes more. It needs an on-site look; the roofer we connect you with will quote it properly.",
      },
      {
        q: "Does Noarlunga get coastal salt exposure?",
        a: "The main Noarlunga area sits inland of the coast, so it doesn't get the heavy salt exposure of the beachfront suburbs — the roofing here is mostly about age rather than salt. Homes closer to the river or coast can get a little more exposure, but for most of Noarlunga, ageing tile and heritage roofs are the main considerations.",
      },
    ],

    landmarks: ["Old Noarlunga village", "Onkaparinga River", "Colonnades", "Noarlunga Hospital", "Old Noarlunga stone bridge"],
  },
  marion: {
    ready: true,
    slug: "marion",
    region: "southern-suburbs",
    name: "Marion",
    postcode: "5043",
    metaTitle: "Roofers in Marion, SA | Roof Restoration & Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Marion? We connect you with a local contractor for tile roof restoration, re-pointing and leak repairs. Free, no obligation.",
    heroImage: "/images/hero-marion.webp",
    problemImage: "/images/problem-marion.webp",
    mapImage: "/images/map-marion.webp",

    headline: "Find a trusted roofer in Marion",
    intro:
      "Looking for a roofer in Marion? Adelaide Roofers connects you with a local roofing contractor who works the area. Marion's solid post-war homes are at the age where their roofs need attention — tell us what's going on and we'll connect you with someone local. The connection is free.",

    roofStock:
      "Marion is an established middle-ring suburb, roughly halfway between the city and the coast. It began as a rural village back in 1838, but the Marion most people know was built out after the war, when the suburb grew rapidly and the SA Housing Trust developed large estates here. A lot of that housing is solid, no-nonsense stock — three- and four-bedroom homes of double brick or brick-and-stone on generous blocks, with cement or terracotta tile roofs. Decades on, those roofs are now squarely at restoration age. (Fittingly, Marion was once home to Wunderlich, a maker of terracotta roof tiles.)",
    localNote:
      "Marion sits in the City of Marion, well back from the coast, so the roofing here is about age rather than salt. Like-for-like roof restoration and repairs are treated as maintenance and generally don't need approval. The good news with Marion's post-war homes is that they were solidly built — double-brick and brick-stone walls mean the structures are typically sound, and it's usually just the roof covering that's reached the end of its life and needs restoring.",

    commonIssues: [
      "Faded, porous cement and terracotta tiles past their coating",
      "Perished ridge pointing on post-war roofs",
      "Cracked or slipped tiles after decades of weather",
      "Leaks showing as ceiling stains after heavy rain",
    ],

    services: [
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, replacing broken tiles, re-pointing ridges and re-coating the cement and terracotta tile roofs on Marion's post-war homes.",
      },
      {
        title: "Re-pointing & re-bedding",
        description:
          "Replacing perished cement ridge mortar with flexible pointing that lasts far longer than the original.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Tracking down leaks — usually a slipped tile, cracked pointing or failed flashing — before they reach the ceiling.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Marion?",
        a: "It depends on the roof's size and pitch and how much tile and mortar work is needed, so it has to be quoted on site. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly fall in the mid-to-high four-figure range — treat that as a ballpark. Many Marion homes are standard single-storey post-war houses, which keeps things predictable. The roofer we connect you with will price it after a look.",
      },
      {
        q: "My Marion home is solidly built — is restoring the roof worth it?",
        a: "Usually, yes. Marion's post-war homes were built solidly — double brick or brick-and-stone — so the structure is typically sound and it's just the roof covering that's aged: the tile coating worn off and the ridge mortar cracked. That makes restoration a sensible, cost-effective fix that refreshes the roof and keeps it watertight, rather than facing a full replacement.",
      },
      {
        q: "What's the difference between cement and terracotta tile restoration?",
        a: "Cement (concrete) tiles have a surface coating that wears off over time, leaving them porous — restoring them involves cleaning, repairs and re-coating. Terracotta tiles don't have that coating; they're naturally durable, so their restoration focuses more on replacing cracked tiles and re-pointing the ridges. Marion has both, and a roofer will tailor the work to which you have.",
      },
      {
        q: "Do I need council approval for roof work in Marion?",
        a: "For most homes, no — like-for-like roof restoration and repairs in the City of Marion are treated as maintenance and generally don't require development approval. Only larger building changes would, so a routine restoration or re-roof is usually straightforward.",
      },
    ],

    landmarks: ["Westfield Marion", "Marion Cultural Centre", "Marion Road", "SA Aquatic & Leisure Centre", "Oaklands Reserve"],
  },
  "hallett-cove": {
    ready: true,
    slug: "hallett-cove",
    region: "southern-suburbs",
    name: "Hallett Cove",
    postcode: "5158",
    metaTitle: "Roofers in Hallett Cove, SA | Coastal & Wind-Exposed Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Hallett Cove? We connect you with a local contractor for wind and salt-exposed coastal roof repairs and re-roofing. Free, no obligation.",
    heroImage: "/images/hero-hallett-cove.webp",
    problemImage: "/images/problem-hallett-cove.webp",
    mapImage: "/images/map-hallett-cove.webp",

    headline: "Find a trusted roofer in Hallett Cove",
    intro:
      "Looking for a roofer in Hallett Cove? Adelaide Roofers connects you with a local roofing contractor who works the area. Up on the exposed clifftops, Hallett Cove's roofs cop wind and salt that gentler suburbs don't — tell us what's going on and we'll connect you with someone who understands coastal roofs. The connection is free.",

    roofStock:
      "Hallett Cove is a clifftop coastal suburb that grew mainly from the 1970s as Adelaide spread south, so its housing is largely 1970s–90s homes on elevated, often steep blocks, alongside newer developments. The defining local factor isn't just salt — it's wind. Perched high above Gulf St Vincent with little shelter, Hallett Cove's roofs take a real battering from coastal winds, on top of the salt exposure every seaside suburb gets. A lot of those original roofs are now at the age where wind and weather have started to tell.",
    localNote:
      "Hallett Cove sits in the City of Marion. Standard like-for-like roof repairs and restoration are treated as maintenance and generally don't need approval. The practical issues here are exposure-driven: wind can lift loose tiles and ridge capping and drive rain in under sheeting, and salt corrodes metal and fasteners. Roofs on the higher, more exposed streets benefit from extra attention to fixings and capping, and from corrosion-resistant materials.",

    commonIssues: [
      "Lifted or dislodged tiles and ridge caps from wind",
      "Wind-driven rain getting in under sheeting and flashings",
      "Salt corrosion on metal roofs and fasteners",
      "Ageing 1970s–90s roofs reaching restoration age",
    ],

    services: [
      {
        title: "Wind-exposed roof repairs",
        description:
          "Re-securing tiles and ridge capping and sealing the gaps where wind-driven rain gets in on Hallett Cove's exposed clifftop homes.",
      },
      {
        title: "Coastal re-roofing",
        description:
          "Replacing salt-affected roofs with corrosion-resistant, well-fixed materials suited to a high-exposure coastal position.",
      },
      {
        title: "Roof restoration",
        description:
          "Cleaning, re-pointing and re-coating the 1970s–90s tile roofs across the suburb that are now reaching restoration age.",
      },
    ],

    faqs: [
      {
        q: "Why do roofs in Hallett Cove have so many wind problems?",
        a: "Hallett Cove sits high on exposed clifftops above Gulf St Vincent with little to break the wind, so roofs here take far more wind load than sheltered suburbs. Strong coastal winds can lift loose tiles and ridge capping and force rain in under sheeting and flashings. Keeping tiles, capping and fixings secure is the key to a roof that copes with that exposure.",
      },
      {
        q: "What roofing holds up best in Hallett Cove's coastal conditions?",
        a: "Two things matter here: corrosion resistance and secure fixing. Marine-grade metal (such as the upgraded Colorbond coastal range) resists the salt, and well-secured tiles, ridge capping and quality fasteners resist the wind. For a re-roof on an exposed block, a roofer will usually focus on both — the right material and a fixing approach built for wind.",
      },
      {
        q: "My Hallett Cove home is from the 1970s or 80s — does the roof need work?",
        a: "Quite possibly. Much of the suburb was built in that era, so a lot of roofs are now 40-plus years old and have spent decades in wind and salt — the conditions that wear roofs fastest. The structure is usually sound; a restoration re-seals and re-secures the roof. A local roofer can confirm whether yours is due after a look.",
      },
      {
        q: "How much does roof work cost in Hallett Cove?",
        a: "It depends on the roof's size, pitch and condition, and exposed or steep clifftop blocks can make access trickier, which affects the figure. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures — but it needs an on-site look. The roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Hallett Cove Conservation Park", "The Boardwalk", "Hallett Cove Beach", "Marion Coastal Walk", "Hallett Cove Pavilion"],
  },
  "aberfoyle-park": {
    ready: true,
    slug: "aberfoyle-park",
    region: "southern-suburbs",
    name: "Aberfoyle Park",
    postcode: "5159",
    metaTitle: "Roofers in Aberfoyle Park, SA | Foothills & Bushfire-Area Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Aberfoyle Park? We connect you with a local contractor for foothills roof restoration, gutter protection and repairs. Free, no obligation.",
    heroImage: "/images/hero-aberfoyle-park.webp",
    problemImage: "/images/problem-aberfoyle-park.webp",
    mapImage: "/images/map-aberfoyle-park.webp",

    headline: "Find a trusted roofer in Aberfoyle Park",
    intro:
      "Looking for a roofer in Aberfoyle Park? Adelaide Roofers connects you with a local roofing contractor who works the area. Up in the leafy southern foothills, Aberfoyle Park's roofs deal with tree litter and bushfire risk that flatter suburbs don't — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Aberfoyle Park is a leafy family suburb in the southern foothills, sitting where suburban Adelaide meets the Adelaide Hills at around 200 metres elevation. Most of it was built out through the 1980s and 90s — predominantly detached family homes on generous, often sloping blocks, typically under concrete tile. Those roofs are now reaching the age where restoration is due, and the suburb's hilly, heavily treed setting adds two extra factors: a constant load of leaf litter in gutters and valleys, and a position partly on the bushfire interface.",
    localNote:
      "Aberfoyle Park sits in the City of Onkaparinga, in the southern foothills, and parts of the suburb are in bushfire-prone areas given the hills setting. Standard like-for-like roof repairs are treated as maintenance, but for homes in the bushfire interface, roofing choices matter for ember protection — gutter guards, sealed roof spaces and non-combustible materials all reduce risk. It's worth telling whoever does the work where your home sits so they can factor that in.",

    commonIssues: [
      "Gutters and valleys choked by tree leaf litter",
      "Ember-entry risk at gutters and roof gaps in bushfire areas",
      "Ageing 1980s–90s concrete tile roofs at restoration age",
      "Leaks on sloping-block homes with complex rooflines",
    ],

    services: [
      {
        title: "Gutter protection & valley clearing",
        description:
          "Fitting gutter guards and clearing the leaf load that builds up in Aberfoyle Park's gutters and valleys — important for both leaks and ember protection.",
      },
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, re-pointing and re-coating the 1980s–90s concrete tile roofs across the suburb that are now reaching restoration age.",
      },
      {
        title: "Bushfire-aware roof repairs",
        description:
          "Repairs on foothills homes with ember protection in mind — sealing gaps and using non-combustible materials where appropriate.",
      },
    ],

    faqs: [
      {
        q: "Is my Aberfoyle Park home in a bushfire area, and does it affect roofing?",
        a: "It can, depending where in the suburb you are. Aberfoyle Park sits in the southern foothills at the hills interface, and parts fall within bushfire-prone areas. For those homes, roofing matters for ember protection — a well-sealed roof, non-combustible materials and gutter guards all reduce the chance of embers getting in or igniting leaf litter. It's worth telling your roofer your location so they can factor it in.",
      },
      {
        q: "Why do Aberfoyle Park gutters need so much attention?",
        a: "The leafy, treed foothills setting that makes the suburb attractive also drops a steady load of leaf litter into gutters and the valleys of complex roofs. Left to build up, that causes water to back up under the roof in winter — and in summer, dry leaf litter is an ember-ignition risk. Regular clearing and gutter guards address both, which is why they're common jobs here.",
      },
      {
        q: "My Aberfoyle Park home is from the 1980s or 90s — does the roof need work?",
        a: "Quite possibly. Much of the suburb was built in that era, so a lot of concrete tile roofs are now 30-plus years old — reaching the point where the coating has worn off and the ridge mortar has cracked. The structure is usually sound; a restoration re-seals and re-points the roof. A local roofer can confirm whether yours is due after a look.",
      },
      {
        q: "How much does roof work cost in Aberfoyle Park?",
        a: "It depends on the roof's size, pitch and condition, and sloping foothills blocks or bushfire-area requirements can affect the figure. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures — but it needs an on-site look. The roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["The Hub Shopping Centre", "Happy Valley Reservoir", "Thalassa Park", "Aberfoyle Park High School", "Flagstaff Hill Golf Course"],
  },
  aldinga: {
    ready: true,
    slug: "aldinga",
    region: "southern-suburbs",
    name: "Aldinga",
    postcode: "5173",
    metaTitle: "Roofers in Aldinga, SA | Coastal & New-Build Roofing | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Aldinga or Aldinga Beach? We connect you with a local contractor for coastal roof repairs, new-build and re-roofing work. Free, no obligation.",
    heroImage: "/images/hero-aldinga.webp",
    problemImage: "/images/problem-aldinga.webp",
    mapImage: "/images/map-aldinga.webp",

    headline: "Find a trusted roofer in Aldinga",
    intro:
      "Looking for a roofer in Aldinga or Aldinga Beach? Adelaide Roofers connects you with a local roofing contractor who works the area. Aldinga mixes brand-new estate homes with older village and beachside housing, all on an exposed outer coast — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Aldinga, taking in the coastal township of Aldinga Beach, is one of Adelaide's fastest-growing southern areas — a sea-change suburb on the edge of the McLaren Vale wine region, around 40km south of the city. Its housing splits two ways: a lot of newer estate homes from the recent growth, with younger metal and tile roofs, plus older village and beachside properties. Out here on the exposed outer coast, salt and wind exposure is a real factor, so even newer roofs benefit from coastal-grade materials.",
    localNote:
      "Aldinga sits in the City of Onkaparinga, which has earmarked the area for significant ongoing growth. Like-for-like roof repairs and restoration are treated as maintenance and generally don't need approval. The local mix shapes the work: newer homes are less about restoration and more about coastal-grade durability and the occasional new-build detailing issue, while older village and beach homes need the usual ageing-roof care — all in a salt-and-wind exposed outer-coastal position.",

    commonIssues: [
      "Salt and wind exposure on an open outer coast",
      "Coastal corrosion on metal roofs and fasteners",
      "Flashing or detailing issues on newer estate builds",
      "Ageing roofs on older village and beach homes",
    ],

    services: [
      {
        title: "Coastal roof repairs & re-roofing",
        description:
          "Repairing and replacing salt-affected roofs with marine-grade materials suited to Aldinga's exposed outer-coast position.",
      },
      {
        title: "New-build roof checks & repairs",
        description:
          "Sorting flashing, capping and detailing issues on newer estate homes so they stay watertight in coastal conditions.",
      },
      {
        title: "Roof restoration & leak repair",
        description:
          "Restoring the older village and beachside roofs and finding leaks before they spread.",
      },
    ],

    faqs: [
      {
        q: "I've got a newer home in Aldinga — does the roof still need attention?",
        a: "Newer roofs need less work than older ones, but Aldinga's exposed outer-coast position means salt and wind are still factors, so it's worth making sure your roof uses corrosion-resistant materials and that flashings and capping are well detailed. Occasionally newer builds have small detailing issues that show up as leaks — easily fixed once found. A check is worthwhile if you've noticed anything.",
      },
      {
        q: "What roofing suits Aldinga's coastal conditions best?",
        a: "Marine-grade metal (such as the upgraded Colorbond coastal range) is a common choice because it resists salt corrosion far better than standard sheeting, and on an exposed coast secure fixing matters for wind too. Whether you're building, re-roofing or repairing, a roofer can advise what's appropriate for how exposed your block is.",
      },
      {
        q: "Does Aldinga's outer-coast location wear roofs faster?",
        a: "It can. Out on the open coast near the vines, Aldinga gets both salt and wind with little shelter, which wears metal, fasteners and flashings faster than inland or more sheltered suburbs. It's the main reason coastal-grade materials and sound fixings are worth specifying here, even on relatively new homes.",
      },
      {
        q: "How much does roof work cost in Aldinga?",
        a: "It varies with the job — a coastal repair, a new-build flashing fix and an older-home restoration are very different in scope. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly run in the mid-to-high four figures, but it really needs an on-site look. The roofer we connect you with will quote it properly.",
      },
    ],

    landmarks: ["Aldinga Beach", "Aldinga Scrub Conservation Park", "Port Willunga", "Aldinga Central", "McLaren Vale (nearby)"],
  },
  reynella: {
    ready: true,
    slug: "reynella",
    region: "southern-suburbs",
    name: "Reynella",
    postcode: "5161",
    metaTitle: "Roofers in Reynella, SA | Roof Restoration & Heritage Repairs | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Reynella? We connect you with a local contractor for tile roof restoration, heritage repairs and leak fixes. Free, no obligation.",
    heroImage: "/images/hero-reynella.webp",
    problemImage: "/images/problem-reynella.webp",
    mapImage: "/images/map-reynella.webp",

    headline: "Find a trusted roofer in Reynella",
    intro:
      "Looking for a roofer in Reynella? Adelaide Roofers connects you with a local roofing contractor who works the area. From the historic old wine-village core to the surrounding suburban homes, Reynella's roofing covers a real range — tell us what's going on and we'll connect you with the right person. The connection is free.",

    roofStock:
      "Reynella holds a special place in the state's history — it's the birthplace of South Australia's wine industry, where John Reynell planted the colony's first commercial vines around 1840 and built Chateau Reynella, home to the oldest surviving operational wine cellar in Australia. The old village core of Old Reynella still celebrates that heritage. From the 1950s and 60s, though, the town was engulfed by Adelaide's southern growth, so today most of Reynella is mid-century suburban housing under concrete tile, wrapped around that historic heart.",
    localNote:
      "Reynella sits in the City of Onkaparinga, inland from the coast, so the roofing here is about age rather than salt. Like-for-like roof restoration and repairs are treated as maintenance and generally don't need approval. The exception is the historic Old Reynella core, where heritage-listed buildings mean roof changes affecting appearance can need approval. Across the surrounding suburban streets, it's the familiar ageing-tile restoration story.",

    commonIssues: [
      "Faded, porous concrete tiles on mid-century homes",
      "Perished ridge pointing due for replacement",
      "Ageing iron and heritage roofs in the old village core",
      "Leaks at valleys, flashings and chimneys",
    ],

    services: [
      {
        title: "Tile roof restoration",
        description:
          "Cleaning, re-pointing and re-coating the ageing concrete tile roofs on Reynella's mid-century suburban homes.",
      },
      {
        title: "Heritage roof repair (Old Reynella)",
        description:
          "Sympathetic repair of the older heritage roofs in the historic Old Reynella core, matching traditional materials.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Finding and fixing leaks — usually a slipped tile, cracked pointing or failed flashing — before they reach the ceiling.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Reynella?",
        a: "It depends on the roof's size, pitch and condition, so it has to be quoted on site. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly fall in the mid-to-high four-figure range — treat that as a ballpark. Most of Reynella's homes are standard suburban houses, which keeps things predictable. The roofer we connect you with will price it after a look.",
      },
      {
        q: "Do I need council approval for roof work in Reynella?",
        a: "For most homes, no — like-for-like roof restoration and repairs in the City of Onkaparinga are treated as maintenance. The exception is the historic Old Reynella core, where heritage-listed buildings mean roof changes affecting appearance can need approval. If your home is in or near the old village, it's worth checking its status; elsewhere a routine restoration is usually straightforward.",
      },
      {
        q: "Why do Reynella's concrete tile roofs need restoring after a few decades?",
        a: "Concrete tiles have a factory coating that gradually wears off with sun and weather, leaving the tiles porous, and the cement mortar bedding the ridge capping becomes brittle and cracks. After several decades both reach the point where a restoration — clean, re-point, re-coat — is needed to keep the roof watertight. It's normal wear for roofs of this age, which much of Reynella's housing now is.",
      },
      {
        q: "Is restoring my Reynella tile roof worth it versus replacing?",
        a: "Usually restoration makes sense. The tiles themselves are often still sound — it's the coating and the ridge pointing that have aged. Cleaning, re-pointing and re-coating restores weather protection and appearance for far less than a full re-roof. A roofer will only recommend replacement if the tiles are widely cracked or failing.",
      },
    ],

    landmarks: ["Chateau Reynella", "Old Reynella village", "Old South Road", "John Reynell Park", "Reynella East College"],
  },
  "christies-beach": {
    ready: true,
    slug: "christies-beach",
    region: "southern-suburbs",
    name: "Christies Beach",
    postcode: "5165",
    metaTitle: "Roofers in Christies Beach, SA | Coastal Roof Restoration | Adelaide Roofers",
    metaDescription:
      "Need a roofer in Christies Beach? We connect you with a local contractor for roof restoration, coastal repairs and re-roofing. Free, no obligation.",
    heroImage: "/images/hero-christies-beach.webp",
    problemImage: "/images/problem-christies-beach.webp",
    mapImage: "/images/map-christies-beach.webp",

    headline: "Find a trusted roofer in Christies Beach",
    intro:
      "Looking for a roofer in Christies Beach? Adelaide Roofers connects you with a local roofing contractor who works the area. A lot of Christies Beach's post-war homes are now at the age where the roof needs work, with the coast adding its own wear — tell us what's going on and we'll connect you with someone local. The connection is free.",

    roofStock:
      "Christies Beach started as a holiday-shack town in the 1920s and grew into a suburb through the post-war years, when the SA Housing Trust built rows of modest single-storey homes across the southern beaches. The result is an affordable, established beach suburb where a lot of the housing is mid-century, typically under concrete tile that's now well past its original coating, alongside older cottages and newer infill. Sitting on Gulf St Vincent below Witton Bluff, all of it gets the coastal salt that wears roofs faster than inland.",
    localNote:
      "Christies Beach sits in the City of Onkaparinga. Like-for-like roof restoration and repairs are treated as maintenance and generally don't need approval. The practical picture here is two-fold: a lot of post-war tile roofs have simply reached restoration age, and the coastal position means salt wears metal, fasteners and flashings faster — so corrosion-resistant fixings are worthwhile for any metal roofing near the beach.",

    commonIssues: [
      "Faded, porous concrete tiles on post-war roofs",
      "Perished ridge pointing due for replacement",
      "Salt corrosion on metal roofs and fasteners",
      "Leaks showing as ceiling stains after coastal storms",
    ],

    services: [
      {
        title: "Roof restoration",
        description:
          "Cleaning, re-pointing and re-coating the ageing concrete tile roofs common on Christies Beach's post-war homes.",
      },
      {
        title: "Coastal repairs & re-roofing",
        description:
          "Replacing salt-affected sheeting and fasteners with corrosion-resistant materials suited to a beachside position.",
      },
      {
        title: "Leak detection & repair",
        description:
          "Finding and fixing the leaks coastal storms expose — usually a slipped tile, cracked pointing or failed flashing.",
      },
    ],

    faqs: [
      {
        q: "How much does a roof restoration cost in Christies Beach?",
        a: "It depends on the roof's size, pitch and condition, so it has to be quoted on site. As a general guide, restorations on a standard single-storey tiled home in Adelaide commonly fall in the mid-to-high four-figure range — treat that as a ballpark only. Many Christies Beach homes are modest single-storey post-war houses, which can keep things at the more affordable end. The roofer we connect you with will price it after a look.",
      },
      {
        q: "Does being near the beach affect my Christies Beach roof?",
        a: "Yes. The salt in coastal air settles on roofs and speeds up corrosion of metal, fasteners and flashings faster than you'd see inland. For tile roofs the bigger factor is age, but any metal roofing or fixings benefit from corrosion-resistant materials given the seaside position. It's worth factoring in when planning repairs or a re-roof.",
      },
      {
        q: "My Christies Beach home is a post-war house — is restoring the roof worth it?",
        a: "Usually, yes. A lot of the suburb's post-war homes are solid, so the structure is typically sound and it's just the roof covering that's aged — the tile coating worn off and the ridge mortar cracked. That makes restoration a cost-effective fix that refreshes the roof and keeps it watertight, rather than facing a full replacement.",
      },
      {
        q: "Do I need council approval for roof work in Christies Beach?",
        a: "For most homes, no — like-for-like roof restoration and repairs in the City of Onkaparinga are treated as maintenance and generally don't require development approval. Only larger building changes would, so a routine restoration or re-roof is usually straightforward.",
      },
    ],

    landmarks: ["Christies Beach foreshore", "Witton Bluff", "Beach Road", "The Esplanade", "Christies Beach Surf Life Saving Club"],
  },
};

// ── Helpers ────────────────────────────────────────────────
export const getSuburb = (slug) => suburbs[slug] || null;
export const getRegion = (slug) => regions[slug] || null;

// Only suburbs with real content get built + linked.
export const readySuburbSlugs = Object.values(suburbs)
  .filter((s) => s.ready)
  .map((s) => s.slug);

// Other suburbs in the same region, for internal linking (real geography).
export const siblingSuburbs = (suburbSlug) => {
  const s = suburbs[suburbSlug];
  if (!s) return [];
  return regions[s.region].suburbs
    .filter((slug) => slug !== suburbSlug)
    .map((slug) => suburbs[slug]);
};
