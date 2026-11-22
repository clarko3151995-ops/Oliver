# Relic mechanics (research notes)

Confidence key: [game] read in-game by the player, [wiki] community wiki (purrwikimania.com), [guide] Prydwen/other guides, [fit] fitted from our own cards.

## Collection and display
- [game] Every owned relic gives its flat stats whether displayed or not. [guide] Collection-based; no equip needed.
- [game] 4 display slots per element tab (Light, Dark, Wind, Water, Fire = 5 tabs x 4 = 20 slots). Displayed relics get +20% on element stat and effect. [wiki] confirms "4 x 5 slots, +20%".
- [game][wiki] "Resonance Level" per element = lowest slot level; non-displayed relics of that element use it. Level all four slots of an element evenly.
- [guide] Slot levels above the season threshold fall back each new season (Prydwen: +10 in older text; green number = will reset).

## Relic stat scaling
- [fit] Element stat at +14 = 2.625 x base at +0 for every rarity (Mythic 200->525, Legendary 120->315, Epic 80->210, Rare 40->105; Rare Cinder Ridge 40->105 etc).
- [fit] Each star adds about +10% to the element stat (Legendary 315 -> 346 at 1 star; Rare 105 -> 115 -> 126 -> 136 for 1/2/3 star). Hence about +9.5% per star of base.
- [wiki] Stat = base for quality at base level x season-bonus for season level x star bonus; trigger-counting relics divide by trigger limit and multiply by triggers; displayed relic adds 20%. Stars come from shards; star 6 is Awakening.
- [wiki] Shard costs per quality to fully awaken (own shards): Mythic 960, Legendary 640, Epic 480, Rare 320; awakening also needs universal shards (Mythic 120, Legendary 80, Epic 60, Rare 40). Universal shard of the same quality substitutes 1:1 for own shards (except 16 event relics).
- [wiki] Set bonuses: Complete Set (all four owned) / 3-Star Set (all four at 3+ stars) / Awakened Set (all four awakened).
- [game] Our cards: Mythic sets are split over two regions (2 relics per region).

## Affinity / Aegis / Mastery (damage)  [wiki, unconfirmed by devs; the game text for Affinity says it divides your Affinity by your Base Elemental Add]
Elemental mult = [1 + X_Affinity/BaseElemAdd + ElemMastery/BaseElemMastery] / [1 + target X_Aegis/BaseElemAdd + target ElemRES/BaseElemMastery]
- A hit uses only ITS element's Affinity (Dark skill -> Dark Affinity) and the target's matching Aegis. Elemental Mastery applies to every elemental hit.
- Physical hits (no element) use the AVERAGE of the five Affinities and Physical Mastery.
- Hidden divisors rise every rank. Base Elemental Add: 5,992 (Expert III, lv100); 6,693 (Champion I lv110); 7,677 (II lv120); 8,661 (III lv130); 9,819 (Master I lv140); 12,103 (Master III lv160); 14,872 (Paragon II lv180); 15,927 (Paragon III lv190); 13,048 (Saint I lv200); 14,252 (Saint II lv210).
- Base Elemental Mastery: 117,047 (Champion III lv130); 195,002 (Master I lv140); 285,400 (Master III lv160); 608,229 (Paragon III lv190); 731,069 (Saint I lv200).
- Takeaway: at high rank 1,000 Affinity is worth far more than 1,000 Mastery (e.g. Saint I: +7.7% vs +0.14%). Affinity is the damage stat to stack for the element you use.
- Player's own Affinity text in game shows "increases by approximately X%" = Affinity / own Base Elemental Add: read this for Dark to confirm which rank divisor applies.

## Open questions
- Which "level" selects the divisor (character Lv 135 vs class level 192)? The in-game Dark Affinity tooltip % answers this.
- Whether % effects (e.g. ATK 5%) scale on character stat or relic stat (Prydwen guides disagree).
