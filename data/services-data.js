// data/services-data.js
// Dedicated service landing pages, each targeting a "[service] Adelaide"
// search term. Content is honest to the referral model: we CONNECT people
// with Adelaide roofers who do the work — we don't do it ourselves.

export const servicePages = {
  "roof-restoration": {
    slug: "roof-restoration",
    name: "Roof Restoration",
    keyword: "Roof Restoration Adelaide",
    metaTitle: "Roof Restoration Adelaide | Free Quotes from Trusted Local Roofers",
    metaDescription:
      "Need roof restoration in Adelaide? We connect you with a local roofer to clean, re-point and re-coat your tile or metal roof. Free, no obligation.",
    headline: "Roof restoration in Adelaide",
    intro:
      "Looking for roof restoration in Adelaide? Adelaide Roofers connects you with a local roofing contractor who restores tile and metal roofs across the metro area — cleaning, re-pointing and re-coating to bring a tired roof back to watertight and tidy. The connection is free.",
    overview:
      "Roof restoration is the most common job on Adelaide's many ageing tile roofs. Rather than replacing a structurally sound roof, restoration renews it: the tiles are cleaned, broken ones replaced, the ridge capping re-bedded and re-pointed, and the whole roof sealed and re-coated. It's a cost-effective way to add years of life and refresh the look of a roof that's simply weathered — and it's exactly the kind of work the roofers we connect you with do day in, day out.",
    included: [
      "A thorough clean to strip moss, lichen and grime",
      "Replacing cracked, broken or slipped tiles",
      "Re-bedding and re-pointing ridge capping with flexible pointing",
      "Repairing worn flashings and valleys",
      "Sealing and re-coating the roof surface",
    ],
    signs: [
      "Faded, porous tiles that have lost their original colour",
      "Cracked or crumbling mortar along the ridge caps",
      "Moss, lichen or dark staining across the roof",
      "Minor leaks or damp patches starting to appear",
    ],
    decisionGuide: true,
    relatedLinks: [
      {
        text: "Roof just dirty, not damaged? A clean may be all it needs.",
        href: "/services/roof-cleaning",
        label: "Roof cleaning in Adelaide",
      },
      {
        text: "Got a terracotta roof? Read our guide to",
        href: "/blog/terracotta-roofs-pros-cons",
        label: "terracotta roof pros and cons",
      },
    ],
    faqs: [
      {
        q: "How much does roof restoration cost in Adelaide?",
        a: "It varies with the roof's size, pitch and condition, so it needs an on-site look. As a general guide, roof restorations across metro Adelaide typically run $6,500–$10,000+ — treat that as a ballpark. The roofer we connect you with will quote it properly after inspecting your roof.",
        link: {
          text: "For what drives the price up or down, see our",
          href: "/blog/roof-restoration-cost-adelaide",
          label: "full roof restoration cost guide",
        },
      },
      {
        q: "Is roof restoration worth it, or should I just replace the roof?",
        a: "If the roof is structurally sound and simply weathered, restoration is usually the smart, cost-effective choice — it renews protection and appearance for a fraction of a replacement. If the tiles or sheets themselves are widely failing, a roofer should tell you honestly that replacement is the better spend.",
      },
      {
        q: "How long does a roof restoration take?",
        a: "A restoration on a typical home usually takes a few days, depending on size, the amount of tile and mortar work needed, and the weather. Roofers won't rush coating work in the rain, so Adelaide's conditions can add a day here and there.",
      },
    ],
  },

  "roof-repairs": {
    slug: "roof-repairs",
    name: "Roof Repairs",
    keyword: "Roof Repairs Adelaide",
    metaTitle: "Roof Repairs Adelaide | Free Quotes from Trusted Local Roofers",
    metaDescription:
      "Need roof repairs in Adelaide? We connect you with a local roofer for broken tiles, flashings, valleys and leaks. Fast, free, no obligation.",
    headline: "Roof repairs in Adelaide",
    intro:
      "Need a roof repair in Adelaide? Adelaide Roofers connects you with a local roofing contractor for targeted fixes — a broken tile, a failed flashing, a perished valley or a leak that's started showing on the ceiling. Tell us what's wrong and we'll connect you with someone who handles it in your area. Free, no obligation.",
    overview:
      "Not every roof needs a full restoration. Often it's one specific thing — a slipped tile letting water in, a flashing that's failed around a chimney, or a valley that's rusted through. A repair fixes the actual problem without the cost of wholesale work. The roofers we connect you with can diagnose the issue and sort it, and tell you honestly if it's a bigger job than it first looks.",
    included: [
      "Replacing broken, cracked or slipped tiles",
      "Repairing or replacing failed flashings",
      "Fixing rusted or leaking valleys",
      "Sealing leaks around chimneys, vents and penetrations",
      "Making storm-damaged roofs safe and watertight",
    ],
    signs: [
      "A visible broken or missing tile",
      "A leak or water stain after rain",
      "Damaged flashing around a chimney or vent",
      "Debris or damage after a storm",
    ],
    decisionGuide: true,
    faqs: [
      {
        q: "How much do roof repairs cost in Adelaide?",
        a: "Repairs are usually far cheaper than restoration or replacement because they're targeted — but the price depends entirely on the problem and how easy it is to access. A single slipped tile is a small job; tracing and fixing a hidden leak can take longer. The roofer we connect you with will assess it and quote before starting.",
      },
      {
        q: "Can you help with an urgent or emergency roof repair?",
        a: "Tell us it's urgent when you get in touch and we'll do our best to connect you quickly with a local roofer who can make the roof safe and watertight. Active leaks are worth acting on fast to limit damage to ceilings and interiors.",
      },
      {
        q: "Will my insurance cover the repair?",
        a: "Storm and sudden-damage repairs are sometimes covered, while general wear-and-tear usually isn't. A roofer can document the damage and provide the quotes and evidence you'd need for a claim, but whether it's covered is between you and your insurer.",
      },
    ],
  },

  "roof-replacement": {
    slug: "roof-replacement",
    name: "Roof Replacement & Re-Roofing",
    keyword: "Roof Replacement Adelaide",
    metaTitle: "Roof Replacement & Re-Roofing Adelaide | Free Quotes",
    metaDescription:
      "Need a roof replacement or re-roof in Adelaide? We connect you with a local roofer for full replacements and tile-to-Colorbond conversions. Free quote.",
    headline: "Roof replacement & re-roofing in Adelaide",
    intro:
      "When a roof is past restoring, Adelaide Roofers connects you with a local roofing contractor for a full replacement or re-roof — including tile-to-Colorbond conversions. Tell us about your roof and we'll connect you with someone who does this work in your area. Free, no obligation.",
    overview:
      "Sometimes a roof has reached the end of its life — widespread cracking, rust through the sheets, sagging, or leaks that keep coming back. At that point, replacement makes more sense than repeatedly patching it. Re-roofing can also modernise a home: many Adelaide owners convert old, heavy concrete tile to lighter Colorbond steel. The roofers we connect you with handle the full process, from stripping the old roof to installing the new one.",
    included: [
      "Removing the existing tile, metal or (where required) asbestos roof",
      "Checking and replacing battens and sarking as needed",
      "Installing a new tile or Colorbond steel roof",
      "Tile-to-metal (Colorbond) conversions",
      "Insulation and ventilation upgrades where wanted",
    ],
    signs: [
      "Widespread cracked, brittle or crumbling tiles",
      "Rust through metal sheets",
      "Sagging roofline or structural concerns",
      "Repeated leaks despite previous repairs",
    ],
    decisionGuide: true,
    guides: {
      heading: "Planning a re-roof?",
      intro:
        "These guides answer the questions most Adelaide homeowners ask before replacing a roof.",
      links: [
        {
          href: "/blog/roof-replacement-cost-adelaide",
          label: "Roof replacement cost in Adelaide",
          text: "Typical price ranges and what pushes a quote up or down.",
        },
        {
          href: "/blog/signs-you-need-a-new-roof",
          label: "Signs you need a new roof, not a repair",
          text: "How to tell when patching no longer makes sense.",
        },
        {
          href: "/blog/how-long-does-roof-replacement-take",
          label: "How long a roof replacement takes",
          text: "A typical timeline, and what can stretch it out.",
        },
        {
          href: "/blog/council-approval-roof-replacement-sa",
          label: "Council approval for a new roof in SA",
          text: "When heritage overlays or a material change need a check first.",
        },
        {
          href: "/blog/insurance-roof-replacement-sa",
          label: "Does insurance cover roof replacement?",
          text: "Storm damage versus wear and tear, and how to document it.",
        },
        {
          href: "/blog/financing-a-new-roof",
          label: "Ways to finance a new roof",
          text: "Payment plans, personal loans and home equity.",
        },
        {
          href: "/blog/tile-to-metal-roofing",
          label: "Switching from tile to metal",
          text: "Weight, solar, colour and what to check before you convert.",
        },
        {
          href: "/blog/colorbond-vs-tile",
          label: "Colorbond vs tile for Adelaide homes",
          text: "A side-by-side comparison to help you choose a material.",
        },
        {
          href: "/blog/asbestos-roof-removal-guide",
          label: "Replacing an asbestos roof",
          text: "Why it needs a licensed removalist, and what that adds to the job.",
        },
      ],
    },
    faqs: [
      {
        q: "How much does a roof replacement cost in Adelaide?",
        a: "Replacement is the biggest roofing job, so it's the most variable — driven by roof size, pitch, the material you choose, and whether asbestos removal or structural work is needed. It always needs an on-site assessment. The roofer we connect you with will measure up and give you a detailed quote.",
      },
      {
        q: "How long does re-roofing take?",
        a: "Most residential roof replacements in Adelaide are completed within a few days, weather permitting. A good roofer keeps the home weather-sealed throughout the process so you're never exposed overnight.",
      },
      {
        q: "Should I convert my tile roof to Colorbond?",
        a: "It's a popular upgrade — Colorbond is lighter, quick to install, and available in coastal grades for salt-exposed suburbs. Whether it's right for your home depends on the structure, look you want and budget. A roofer can talk you through tile versus metal for your specific place.",
      },
    ],
  },

  "roof-leak-repair": {
    slug: "roof-leak-repair",
    name: "Roof Leak Repair",
    keyword: "Roof Leak Repair Adelaide",
    metaTitle: "Roof Leak Repair Adelaide | Adelaide Roofers",
    metaDescription:
      "Leaking roof in Adelaide? We connect you with a local roofer to find and fix the leak fast, before it damages your ceilings. Free, no obligation.",
    headline: "Roof leak repair in Adelaide",
    intro:
      "Got a leaking roof in Adelaide? Adelaide Roofers connects you with a local roofing contractor who can find the source and fix it — before it damages your ceilings and interiors. Tell us where you are and we'll connect you with someone who handles leaks in your area. Free, and worth acting on quickly.",
    overview:
      "Roof leaks are deceptive — the water stain on your ceiling is often nowhere near where the water is actually getting in, because water runs along beams and battens before it drips. That's why leak repair starts with proper detection, not guesswork. The roofers we connect you with track the leak back to its real source — a cracked tile, a failed flashing, a rusted valley or a gap around a penetration — and seal it properly.",
    included: [
      "Locating the true source of the leak, not just the stain",
      "Replacing cracked or slipped tiles letting water in",
      "Re-sealing flashings around chimneys, vents and skylights",
      "Repairing or replacing leaking valleys",
      "Temporary make-safe measures where a leak is active",
    ],
    signs: [
      "Water stains or brown patches on ceilings",
      "Damp smells or bubbling paint after rain",
      "Active dripping during or after a downpour",
      "Sagging or discoloured plaster",
    ],
    faqs: [
      {
        q: "Why is my roof leaking in a spot away from the damage?",
        a: "Because water travels. It enters at one point — a cracked tile or failed flashing — then runs along the roof structure before dripping through the ceiling somewhere else entirely. That's why a roofer traces the path rather than just patching above the stain, and why guessing rarely fixes it for good.",
      },
      {
        q: "Can someone come out quickly for a leaking roof?",
        a: "Let us know it's urgent and we'll try to connect you promptly with a local roofer who can help. With an active leak, getting a make-safe done sooner rather than later limits the damage to ceilings, insulation and belongings.",
      },
      {
        q: "How much does leak repair cost?",
        a: "It depends on how easily the leak is found and what's causing it — a single cracked tile is quick, while a hidden or multiple-point leak takes more work. The roofer we connect you with will diagnose it and quote before doing the repair.",
      },
    ],
  },

  "colorbond-roofing": {
    slug: "colorbond-roofing",
    name: "Colorbond & Metal Roofing",
    keyword: "Colorbond Roofing Adelaide",
    metaTitle: "Colorbond & Metal Roofing Adelaide | Adelaide Roofers",
    metaDescription:
      "Want Colorbond or metal roofing in Adelaide? We connect you with a local roofer for new metal roofs, re-roofs and coastal-grade materials. Free quote.",
    headline: "Colorbond & metal roofing in Adelaide",
    intro:
      "After Colorbond or metal roofing in Adelaide? Adelaide Roofers connects you with a local roofing contractor for new metal roofs, re-roofs and tile-to-Colorbond conversions — including coastal-grade materials for salt-exposed suburbs. Tell us what you need and we'll connect you locally. Free, no obligation.",
    overview:
      "Colorbond steel is a popular choice on Adelaide roofs — lightweight, quick to install, available in a wide range of colours, and built for local conditions. For coastal suburbs where salt corrodes standard materials faster, upgraded coastal grades hold up far better. Whether you're building, re-roofing, or converting an old tile roof to metal, the roofers we connect you with can advise on the right profile and finish for your home and area.",
    included: [
      "New Colorbond and metal roof installation",
      "Metal re-roofs and repairs",
      "Tile-to-Colorbond conversions",
      "Coastal-grade materials for salt-exposed suburbs",
      "Insulation, sarking and ventilation options",
    ],
    signs: [
      "Rust or corrosion on an ageing metal roof",
      "Wanting a lighter, modern roof over heavy tile",
      "Salt corrosion on a coastal home's roof and fixings",
      "Building or extending and choosing a roof material",
    ],
    faqs: [
      {
        q: "Is Colorbond better than tile?",
        a: "Neither is simply 'better' — it depends on the home. Colorbond is lighter, fast to install and modern-looking; tile is durable, quieter in rain and suits many traditional homes. In coastal suburbs, the salt resistance of coastal-grade Colorbond is a real advantage. A roofer can weigh it up for your specific place.",
      },
      {
        q: "What roofing suits a coastal Adelaide home?",
        a: "Near the coast, marine-grade metal (such as the upgraded Colorbond coastal range) resists salt corrosion far better than standard sheeting, and corrosion-resistant fixings last longer too. How exposed your block is — beachfront versus a few streets back — affects what's appropriate, which a local roofer can advise on.",
      },
      {
        q: "How much does a Colorbond roof cost in Adelaide?",
        a: "It depends on roof size, complexity, and whether you're converting from tile (which involves removing the old roof first). It needs an on-site measure-up. The roofer we connect you with will assess your roof and quote accordingly.",
      },
    ],
  },

  "ridge-capping": {
    slug: "ridge-capping",
    name: "Ridge Capping (Re-Bed & Re-Point)",
    keyword: "Ridge Capping Adelaide",
    metaTitle: "Ridge Capping Adelaide | Re-Bed & Re-Point",
    metaDescription:
      "Need ridge capping, re-bedding or re-pointing in Adelaide? We connect you with a local roofer to seal your roof's ridges. Free, no obligation.",
    headline: "Ridge capping, re-bedding & re-pointing in Adelaide",
    intro:
      "Need ridge capping work in Adelaide? Adelaide Roofers connects you with a local roofing contractor to re-bed and re-point the ridge caps along your roof's peaks and hips — where old mortar cracks and lets water in. Tell us your suburb and we'll connect you locally. Free, no obligation.",
    overview:
      "Ridge caps are the tiles that sit along the peaks and hips of a roof, bedded and pointed with mortar. Over decades that cement mortar becomes brittle, cracks, and lets water in — one of the most common causes of leaks on older Adelaide roofs. Re-bedding re-secures loose caps; re-pointing seals them with a flexible compound that lasts far longer than the original cement and copes better with the roof's natural movement. The roofers we connect you with do this as a standalone job or as part of a full restoration.",
    included: [
      "Re-bedding loose or dislodged ridge caps",
      "Re-pointing with flexible pointing compound",
      "Replacing cracked or damaged ridge caps",
      "Sealing the ridge line against water entry",
    ],
    signs: [
      "Cracked or crumbling mortar along the roof's peaks",
      "Loose or slipped ridge caps",
      "Leaks appearing near the top of the roof",
      "Bits of mortar found in the gutters",
    ],
    faqs: [
      {
        q: "What's the difference between re-bedding and re-pointing?",
        a: "Re-bedding is re-securing the ridge caps onto a fresh mortar bed when they've come loose. Re-pointing is applying a flexible pointing compound over the bedding to seal it and give a clean finish. Older roofs often need both; sometimes just re-pointing if the bedding is still sound.",
      },
      {
        q: "Why use flexible pointing instead of cement?",
        a: "The original cement mortar becomes brittle and cracks as the roof expands and contracts over the years. Flexible pointing compounds move with the roof, so they last much longer and are far less likely to crack and leak. It's the standard for quality ridge work today.",
      },
      {
        q: "How much does ridge capping cost in Adelaide?",
        a: "It depends on the total length of ridge and hip lines and their condition. It's often more affordable than people expect for the leak protection it provides, but it needs an on-site look. The roofer we connect you with will quote it after inspecting the ridges.",
      },
    ],
  },

  "roof-painting": {
    slug: "roof-painting",
    name: "Roof Painting & Re-Coating",
    keyword: "Roof Painting Adelaide",
    metaTitle: "Roof Painting Adelaide | Roof Re-Coating",
    metaDescription:
      "Want your roof painted in Adelaide? We connect you with a local roofer to clean, seal and re-coat your tile or metal roof. Free, no obligation.",
    headline: "Roof painting & re-coating in Adelaide",
    intro:
      "Thinking about roof painting in Adelaide? Adelaide Roofers connects you with a local roofing contractor to clean, seal and re-coat your tile or metal roof — restoring protection and giving a tired roof a fresh, uniform finish. Tell us your suburb and we'll connect you locally. Free, no obligation.",
    overview:
      "Roof painting is about more than looks — the protective coating on tiles and metal roofs wears off over time, leaving the surface porous and exposed. A proper roof paint job cleans and seals the surface, then applies protective coatings that renew weather resistance and refresh street appeal. It's often done as part of a restoration, and it's especially popular before selling a home. The roofers we connect you with use quality coating systems built for South Australian conditions.",
    included: [
      "Thorough cleaning and moss removal before coating",
      "Sealing and priming the roof surface",
      "Applying protective, weather-resistant coatings",
      "A choice of colours and finishes",
    ],
    signs: [
      "Faded, patchy or discoloured roof colour",
      "Porous tiles that soak up water",
      "Preparing a home for sale and lifting street appeal",
      "A roof that's structurally fine but looks tired",
    ],
    faqs: [
      {
        q: "How long does a painted roof last?",
        a: "With proper preparation and quality coatings, a roof paint job typically lasts many years, though exposure and roof condition affect it. The key is the prep — a coating over an unclean or unsealed roof won't last. The roofers we connect you with focus on doing the groundwork properly.",
      },
      {
        q: "Is roof painting worth it before selling my home?",
        a: "Often, yes — a freshly coated roof noticeably lifts street appeal and gives buyers the impression of a well-maintained home, which can help at sale time. It's one of the more cost-effective exterior improvements before listing.",
      },
      {
        q: "Can both tile and metal roofs be painted?",
        a: "Yes — both can be cleaned, sealed and coated, though the products and process differ between tile and metal (including Colorbond). A roofer will use the right system for your roof type.",
      },
    ],
  },

  "roof-cleaning": {
    slug: "roof-cleaning",
    name: "Roof Cleaning",
    keyword: "Roof Cleaning Adelaide",
    metaTitle: "Roof Cleaning Adelaide | Free Quotes from Trusted Locals",
    metaDescription:
      "Roof cleaning in Adelaide: what's involved, typical costs for tile and Colorbond, and the red flags to avoid. Free quotes from trusted local pros.",
    headline: "Roof cleaning in Adelaide",
    intro:
      "If you can see moss, lichen or black streaks, or your gutters keep clogging, your roof is worth a clean. Most Adelaide homes pay $400–$900 for a tiled roof or $350–$750 for Colorbond, and it's usually done in a day. We'll connect you with a trusted local pro who cleans roofs in your suburb, and the connection costs you nothing.",
    quickFacts: [
      { label: "Typical cost", value: "$350–$900" },
      { label: "Time on site", value: "Usually one day" },
      { label: "How often", value: "Every 2–5 years" },
    ],
    // `sections` replaces the template's generic overview and "Typically
    // includes" blocks on this page (see app/services/[service]/page.js).
    sections: [
      {
        q: "Does my roof need cleaning?",
        a: "Your roof is worth cleaning if you can see moss, lichen or black streaks, or your gutters keep filling with debris. If it just looks a bit dull, that's cosmetic and can wait.",
        points: [
          "Moss: green, spongy clumps that hold water against the tiles. It's most common in the Adelaide Hills and on shaded, south-facing roof faces across the plains",
          "Lichen: flat, crusty patches in white, grey, yellow or orange. It's very common on the concrete tiles of Adelaide's post-war and 1970s homes, and slowly roughens the surface",
          "Black streaks: usually algae, and worst on south-facing sides and under trees",
          "Blocked gutters and valleys: debris washed off the roof that stops water draining away",
        ],
        more: "Moss and blocked gutters are the ones to act on. Both trap water, and trapped water is what leads to leaks, rot and gutters spilling over in a winter downpour.",
      },
      {
        q: "What are the benefits of roof cleaning?",
        a: "A clean roof drains properly, lasts longer and looks better. In Adelaide it also matters for your rainwater tank and for bushfire season.",
        points: [
          "Tiles, coatings and Colorbond last longer when nothing is holding moisture against them",
          "Water runs off freely instead of backing up under tiles or spilling over the gutters",
          "Cleaner water in your tank, if your downpipes feed one, as they do on many Adelaide homes",
          "Less dry leaf litter sitting in gutters and valleys over summer, when embers are a real risk in the Hills and foothills",
          "Better kerb appeal if you're selling",
          "It also gives the roofer a clear look at the roof, including cracked tiles, crumbling ridge capping or rust the moss was hiding",
        ],
      },
      {
        q: "What's involved in a roof clean?",
        a: "A proper clean has five steps: protect your rainwater tank, inspect the roof, give it a gentle wash, treat any growth, and clear the gutters.",
        points: [
          "Protect the tank: any downpipes that feed a rainwater tank are disconnected or diverted before water or treatment goes on the roof, and stay diverted for the first couple of good rains afterwards so wash water and treatment don't end up in the tank",
          "Inspect: the roofer checks for cracked or loose tiles, ridge capping and gutters before walking on the roof, and takes before photos",
          "Soft wash: a low-pressure rinse with a cleaning solution, which lifts dirt and staining without stripping coatings or cracking brittle tiles",
          "Treat: a moss and lichen treatment that kills growth at the root, so it keeps breaking down and washing off over the following weeks",
          "Finish: gutters, valleys and downpipes are cleared of whatever came off the roof, with after photos and a note on anything that needs attention",
        ],
        link: {
          text: "If the clean shows cracked tiles, crumbling ridge capping or a worn-out coating, that's the point where a restoration may make more sense.",
          href: "/services/roof-restoration",
          label: "Roof restoration in Adelaide",
        },
      },
      {
        q: "How much does roof cleaning cost in Adelaide?",
        a: "Roof cleaning in Adelaide typically costs $400–$900 for a tiled roof and $350–$750 for Colorbond. Add about $150 if you have solar panels.",
        points: [
          "Size: a bigger roof means more time and more product",
          "Pitch and height: steep Hills blocks and two-storey homes in newer suburbs need extra safety gear and take longer",
          "Access: narrow side paths, overhanging gums and fragile pergolas or verandahs slow the job down",
          "How much growth: years of Hills moss takes longer to shift than light staining on the plains",
          "Tile condition: original terracotta on older homes needs slower, more careful work",
          "Extras: solar panels, gutter guards or a full gutter clean add to the price",
        ],
        more: "A small single-storey Colorbond roof with light staining sits at the bottom of these ranges. A large, steep, two-storey tiled roof with heavy moss and solar sits at the top. These are ballpark figures; you'll get a proper quote once a roofer has seen the roof.",
      },
      {
        q: "How do I know I'm getting value for money?",
        a: "You're getting value if the quote covers your tank, an inspection, a gentle wash, a growth treatment and the gutters, and nobody pushes you into work you don't need.",
        groups: [
          {
            heading: "Questions to ask",
            points: [
              "What's included, and are the gutters part of it?",
              "Will you use low pressure on my tiles?",
              "What product do you use, and is it safe around my tank, pets and garden?",
              "Are you insured, and will I get before-and-after photos?",
            ],
          },
          {
            heading: "Red flags",
            points: [
              "High-pressure blasting on old tiles. It can crack them, strip the surface and force water underneath, and original terracotta on older homes is especially easy to damage",
              "Being pushed into a full restoration when the roof only needs a clean",
              "No written quote, or a price that jumps once they're up on the roof",
            ],
          },
        ],
        link: {
          text: "A restoration is the right call when tiles are cracking, ridge capping is crumbling or the coating has worn through, not when the roof is just dirty.",
          href: "/services/roof-restoration",
          label: "When roof restoration is worth it",
        },
      },
      {
        q: "Are there cheaper alternatives to a full roof clean?",
        a: "Yes. If the roof is only lightly affected, a moss spray or a gutter clean on its own may be enough. If the staining is purely cosmetic, doing nothing is a fair choice too.",
        points: [
          "Moss spray: applied without washing, then the growth breaks down and rinses off with rain over several months. In Adelaide, early autumn is the time to put it on, so the winter rains can do the rinsing. It's cheaper but slower, and the roof looks patchy for a while",
          "Gutter clean only: deals with drainage, which is the part that actually causes damage. It's worth doing before bushfire season even if you skip the roof",
          "Do nothing: light staining or dull tiles on a sound roof won't hurt it. Keep an eye on it and revisit if moss starts building up",
        ],
      },
      {
        q: "What's different about cleaning a roof in Adelaide?",
        a: "Where you live in Adelaide changes how your roof should be cleaned, and when.",
        points: [
          "Adelaide Hills: shade, cooler temperatures and higher rainfall mean moss and lichen grow faster, so Hills roofs often need cleaning more often than those on the plains",
          "Beachside suburbs: salt spray builds up on roofs and in gutters near the sea, and a gentle rinse helps slow corrosion on Colorbond, fixings and flashings",
          "Unley, Norwood, Prospect and other older suburbs: many homes still have their original terracotta tiles, which are brittle with age. They need a gentle wash and a roofer who knows where to step",
          "Best time of year: spring or early autumn. It's mild and mostly dry, and the treatment needs a few dry days to work",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you clean a roof with solar panels?",
        a: "Yes. A roofer can clean around solar panels and usually rinse the panels too, which can help them perform better. Expect it to add about $150, because working around panels takes more time and care.",
      },
      {
        q: "Are roof cleaning chemicals safe for pets, gardens and rainwater tanks?",
        a: "Roofers use products made for roof cleaning, and you can reduce the risk further. Keep pets inside during the job, ask the roofer to rinse or cover nearby plants, and make sure your tank is diverted first. Ask which product they're using before they start, so you can check the label yourself.",
      },
      {
        q: "How often should I get my roof cleaned?",
        a: "Every two to five years is typical. Homes in the Hills, under trees or with shaded south-facing roofs grow moss faster and may need it every two years. Sunny, open roofs on the plains can often go five years or more.",
      },
      {
        q: "How long does roof cleaning take?",
        a: "Most Adelaide homes are done in a day. A small single-storey roof can take a few hours, while a large, steep or two-storey roof with heavy moss may take longer. The treatment keeps working for weeks afterwards.",
      },
      {
        q: "Do I need to be home while my roof is cleaned?",
        a: "Usually not, as long as the roofer can get to the roof safely and use an outside tap. It's worth being around at the start to point out problem areas and check the tank is diverted, and at the end to look over the before-and-after photos.",
      },
    ],
  },

  "gutter-repairs": {
    slug: "gutter-repairs",
    name: "Gutter Repairs & Replacement",
    keyword: "Gutter Replacement Adelaide",
    metaTitle: "Gutter Repairs & Replacement Adelaide | Adelaide Roofers",
    metaDescription:
      "Need gutter repairs, replacement, cleaning or guards in Adelaide? We connect you with a local roofer to sort your guttering. Free, no obligation.",
    headline: "Gutter repairs, replacement & cleaning in Adelaide",
    intro:
      "Need guttering sorted in Adelaide? Adelaide Roofers connects you with a local roofing contractor to repair or replace gutters and downpipes, install leaf guards, and clear blocked gutters. Tell us your suburb and we'll connect you locally. Free, no obligation.",
    overview:
      "Gutters do the unglamorous but vital job of getting water off the roof and away from the home. When they rust, sag, block with leaves or overflow, water backs up under the roof and against the walls — causing damage that costs far more than the gutters themselves. The roofers we connect you with replace worn or undersized gutters, sort downpipes and valleys, fit leaf guards, and clear blockages before they cause problems.",
    included: [
      "Replacing rusted, sagging or undersized gutters",
      "Repairing and replacing downpipes and valley iron",
      "Installing gutter guards and leaf screens",
      "Clearing blocked gutters and downpipes",
      "Colour-matching new guttering to the roof",
    ],
    signs: [
      "Rust, holes or sagging sections in the gutters",
      "Water overflowing the gutters in rain",
      "Gutters full of leaves and debris",
      "Water damage or staining down external walls",
    ],
    relatedLinks: [
      {
        text: "Gutters filling up because of moss and grime washing off the roof?",
        href: "/services/roof-cleaning",
        label: "Roof cleaning in Adelaide",
      },
    ],
    faqs: [
      {
        q: "Are gutter guards worth it?",
        a: "In leafy suburbs and the foothills, often yes — gutter guards keep leaves out, cut down how often you need to clear the gutters, and reduce the risk of blockages and (in bushfire-prone areas) ember ignition. A roofer can advise whether they're worthwhile for your home's surroundings.",
      },
      {
        q: "Should I repair or replace my gutters?",
        a: "A small isolated problem can be repaired, but if the gutters are widely rusted, sagging or undersized for the roof, replacement is usually the better long-term fix. The roofer we connect you with will give you an honest view after looking at the condition.",
      },
      {
        q: "How much does gutter replacement cost in Adelaide?",
        a: "It depends on the length of guttering, the number of downpipes, access, and the material and colour chosen. It needs an on-site measure-up, which the roofer we connect you with will do before quoting.",
      },
    ],
  },

  "fascia-repairs": {
    slug: "fascia-repairs",
    name: "Fascia Board Repairs",
    keyword: "Fascia Repairs Adelaide",
    metaTitle: "Fascia Board Repairs Adelaide | Adelaide Roofers",
    metaDescription:
      "Need fascia board repairs in Adelaide? We connect you with a local roofer to repair or replace rotten or damaged fascia. Free, no obligation.",
    headline: "Fascia board repairs in Adelaide",
    intro:
      "Got rotting or damaged fascia boards in Adelaide? Adelaide Roofers connects you with a local roofing contractor to repair or replace the timber behind your gutter line — often found and fixed at the same time as guttering. Tell us your suburb and we'll connect you locally. Free, no obligation.",
    overview:
      "Fascia boards run along the roofline behind the gutters, and they take a quiet beating — trapped moisture, overflowing gutters and general weather exposure gradually rot the timber, even when the roof and gutters above look fine. Left alone, rotten fascia can let water into the roof cavity and eaves, and it stops gutters being properly supported. Because fascia sits right behind the gutter line, it's commonly picked up during a gutter inspection or replacement — the roofers we connect you with can assess and repair both in the one visit.",
    included: [
      "Assessing fascia boards for rot, warping or damage",
      "Replacing damaged sections of timber fascia",
      "Repainting or sealing repaired and replacement boards",
      "Re-securing gutters properly once fascia is sound",
      "Checking eaves and roofline for related water damage",
    ],
    signs: [
      "Soft, spongy or crumbling timber behind the gutters",
      "Peeling paint or visible rot along the roofline",
      "Gutters sagging away from the house",
      "Water stains on eaves or under the roofline",
    ],
    faqs: [
      {
        q: "How do I know if my fascia needs repairing?",
        a: "The usual signs are soft or crumbling timber, peeling paint along the roofline, or gutters that have started sagging because they're no longer well supported. If your gutters are being replaced, it's worth having the fascia checked at the same time, since problems there are easy to miss from the ground.",
      },
      {
        q: "Can fascia be repaired, or does it need full replacement?",
        a: "It depends on how far the rot has spread. A small damaged section can often be cut out and replaced without touching the rest of the board; widespread rot along a run usually calls for full replacement. The roofer we connect you with will give you an honest assessment rather than replace more than necessary.",
      },
      {
        q: "Does fascia repair need to happen with gutter work?",
        a: "Not always, but it's common — since fascia sits directly behind the gutter line, gutter replacement is a natural time to check it, and doing both together usually saves a second call-out. If your fascia's fine, a roofer will simply tell you so.",
      },
    ],
  },
  "asbestos-roof-removal": {
    slug: "asbestos-roof-removal",
    name: "Asbestos Roof Removal",
    keyword: "Asbestos Roof Removal Adelaide",
    metaTitle: "Asbestos Roof Removal Adelaide | Adelaide Roofers",
    metaDescription:
      "Got an asbestos (fibro) roof in Adelaide? We connect you with a licensed asbestos removalist for safe removal and a new roof. Free, no obligation.",
    headline: "Asbestos roof removal in Adelaide",
    intro:
      "Have an asbestos (fibro) roof in Adelaide? Adelaide Roofers connects you with a licensed asbestos removalist to safely remove it and get a new roof installed in its place. Tell us your suburb and we'll connect you with someone properly licensed for this specific work. Free, no obligation.",
    overview:
      "Many Adelaide homes built before the early 1980s have corrugated asbestos cement roofing — often called fibro. Left undisturbed and in good condition it's generally not an immediate risk, but any work that cuts, drills, breaks or removes it can release airborne fibres, which is a genuine health hazard. Because of that, asbestos removal in South Australia legally has to be done by a licensed asbestos removalist, not a standard roofing crew. That's a different trade to general roofing, which is exactly why this is its own service: we connect you with someone who holds the right licence, handles the removal safely and legally, and can then install your new roof once the old one's gone.",
    included: [
      "Assessment to confirm whether your roofing sheets contain asbestos",
      "Safe, contained removal by a licensed asbestos removalist",
      "Correct transport and disposal at a licensed facility",
      "Installation of a new tile or Colorbond roof once removal is complete",
      "All required safety and containment measures during the work",
    ],
    signs: [
      "Corrugated cement sheet roofing, common on homes built before the early 1980s",
      "A roof that looks like older-style fibro sheeting rather than modern tile or metal",
      "Planning a renovation or extension and needing to know what's up there before work starts",
      "An ageing roof you're simply unsure about the material of",
    ],
    faqs: [
      {
        q: "How do I know if my roof has asbestos?",
        a: "Corrugated cement sheet roofing on a home built before the early 1980s is the main giveaway, but it isn't always obvious just by looking — some later materials look similar. If you're not sure, don't drill, cut or disturb it; a professional can confirm what it's actually made of before any work starts.",
      },
      {
        q: "Is it safe to stay in the house while the asbestos is being removed?",
        a: "Licensed removalists use containment and safety procedures specifically so the work can be done without releasing fibres into the rest of the property. They'll talk you through what that looks like for your job and whether any part of the property needs to be kept clear during the work itself.",
      },
      {
        q: "Do I legally need a licensed removalist, or can a regular roofer do it?",
        a: "In South Australia, asbestos removal legally requires a licensed asbestos removalist — it's a separate licence to a standard roofing or building licence. This isn't just best practice, it protects you and your family, and it's why we connect you with someone who actually holds that licence rather than a general roofing crew.",
      },
      {
        q: "How much does asbestos roof removal cost in Adelaide?",
        a: "It typically costs more than a standard roof removal, because licensed handling, containment and disposal at an approved facility all add cost that a normal tear-off doesn't have. The amount depends heavily on roof size and access, so it needs an on-site assessment — the removalist we connect you with will quote it properly after inspecting the roof.",
      },
    ],
  },

  "roof-ventilation": {
    slug: "roof-ventilation",
    name: "Roof Ventilation",
    keyword: "Roof Ventilation Adelaide",
    metaTitle: "Roof Ventilation Adelaide | Whirlybirds & Roof Vents | Adelaide Roofers",
    metaDescription:
      "Need roof ventilation in Adelaide? We connect you with a local roofer to install whirlybirds and roof vents to reduce heat and moisture build-up. Free, no obligation.",
    headline: "Roof ventilation in Adelaide",
    intro:
      "Looking into roof ventilation in Adelaide? Adelaide Roofers connects you with a local roofing contractor to install whirlybirds and roof vents that move hot, moist air out of the roof space. Tell us your suburb and we'll connect you with someone who does this work in your area. Free, no obligation.",
    overview:
      "Adelaide's hot, dry summers push a lot of heat into an unventilated roof space, which then radiates down into the ceiling below — and in winter, trapped moisture in the roof space can lead to condensation issues. Roof ventilation addresses both: whirlybirds (wind-driven turbine vents) and static roof vents give that hot, moist air somewhere to escape, rather than sitting in the roof cavity. It's a relatively small job with a real effect on comfort and, over time, on how hard your air conditioning has to work.",
    included: [
      "Assessing how many vents or whirlybirds your roof space needs",
      "Installing whirlybird turbine vents",
      "Installing static roof vents where appropriate",
      "Sealing and flashing around each new vent so it doesn't introduce a leak",
    ],
    signs: [
      "Upstairs or top-floor rooms noticeably hotter than the rest of the house",
      "A roof space that feels stifling hot when you go up there in summer",
      "Condensation or a musty smell in the roof cavity over winter",
      "Higher-than-expected cooling bills over summer",
    ],
    faqs: [
      {
        q: "Do whirlybirds actually make a difference to how hot my house gets?",
        a: "For the roof space itself, yes — they're specifically designed to vent hot air that builds up under the roof, which reduces how much heat radiates down into the ceiling below. They won't cool a room the way air conditioning does, but they take some of the load off it, particularly in top-floor rooms directly under the roof.",
      },
      {
        q: "How many whirlybirds or vents does my roof need?",
        a: "It depends on the size of your roof space and how it's currently ventilated, if at all. A roofer will look at your roof's size and layout and recommend a number that actually moves enough air, rather than a token single unit that does little.",
      },
      {
        q: "Can roof vents cause leaks?",
        a: "Only if they're poorly installed — any roof penetration needs to be properly flashed and sealed, whirlybirds and vents included. A roofer experienced with this work seals them correctly as standard, so a well-installed vent shouldn't be a leak risk.",
      },
      {
        q: "How much does roof ventilation cost in Adelaide?",
        a: "It depends on how many whirlybirds or vents your roof needs and how accessible the roof is. It's a relatively small job compared to restoration or replacement, but it still needs an on-site look for an accurate price. The roofer we connect you with will assess it and quote properly.",
      },
    ],
  },

  "roof-inspection": {
    slug: "roof-inspection",
    name: "Roof Inspection & Report",
    keyword: "Roof Inspection Adelaide",
    metaTitle: "Roof Inspection Adelaide | Honest Roof Report | Adelaide Roofers",
    metaDescription:
      "Need a roof inspection in Adelaide? We connect you with a local roofer for a thorough check of tiles, flashings, valleys and gutters, with an honest report. Free, no obligation.",
    headline: "Roof inspection & report in Adelaide",
    intro:
      "Want a proper look at the condition of your roof? Adelaide Roofers connects you with a local roofing contractor for a thorough inspection and an honest write-up of what's fine, what needs attention now, and what can wait. Tell us your suburb and we'll connect you with someone who does this in your area. Free, no obligation.",
    overview:
      "A roof inspection is worth doing before small issues become expensive ones — buying a home, after a storm, or simply because the roof hasn't been looked at in years. Rather than a sales pitch dressed up as an inspection, the roofers we connect you with give you a straight assessment: tiles, flashings, valleys, ridge capping and gutters checked properly, with a clear picture of what actually needs doing versus what's simply cosmetic or can wait.",
    included: [
      "A full check of tiles, sheets, flashings, valleys and ridge capping",
      "Checking gutters and downpipes for condition and blockages",
      "Identifying any active or developing leak points",
      "A written or verbal summary of what's urgent, what's worth planning for, and what's fine",
    ],
    signs: [
      "Buying or selling a home and wanting to know the roof's real condition",
      "After a storm, to check for damage that isn't obvious from the ground",
      "The roof hasn't been looked at in over five years",
      "General peace of mind before winter or a long dry summer",
    ],
    faqs: [
      {
        q: "How often should I get my roof inspected?",
        a: "Roughly every two to three years for a roof with no known issues, or sooner after a major storm. Regular inspection catches small problems — a slipped tile, a cracked seal — before they turn into leaks and ceiling damage.",
      },
      {
        q: "Should I get a roof inspection before buying a house?",
        a: "It's a sensible step, especially on an older home. A roof inspection can pick up issues that aren't obvious in a standard building inspection, and gives you a realistic idea of any roofing costs you might be taking on with the property.",
      },
      {
        q: "Will the inspection try to upsell me on work I don't need?",
        a: "That's exactly what we try to avoid by only connecting you with roofers who give an honest assessment — telling you what's genuinely urgent versus what can wait, not padding out a quote. If you ever feel that wasn't the case with a roofer we've connected you with, let us know directly.",
      },
      {
        q: "How much does a roof inspection cost in Adelaide?",
        a: "It varies by roofer and the size of the roof, and some offer it free or low-cost as a first step toward quoting other work. It's worth asking upfront when you're matched with someone what their inspection involves and whether there's a cost.",
      },
    ],
  },

};

export const serviceSlugs = Object.keys(servicePages);
export function getServicePage(slug) {
  return servicePages[slug] || null;
}
