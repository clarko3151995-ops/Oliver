# Felt Diorama Studio

A single-page app (`index.html`, no build step) that draws pictures in a
felt-and-cardboard diorama style: hand-cut felt, corrugated cardboard edges,
layered drop shadows, dashed stitching, wooden buttons, yarn and crumpled paper.

Open `craft/index.html` in any modern browser.

## Modes
- **Island**: makes a floating island from a seed. Same seed, same island.
  Pick a palette (Autumn, Spring, Winter, Twilight), set how many trees, and
  turn falling leaves, backdrop hills, stitching and the craft frame on or off.
- **Photo**: turns your photo into stacked felt cutouts. It sorts the colours
  into 3 to 12 felt shades, gives each shade a hand-cut edge, and stacks them
  with shadows. The photo stays on your device.

**Save PNG** downloads the picture at 1600×1100.

## How the look is made
| Element | Technique |
|---|---|
| Felt | Tiled texture of ~5,000 short curly fibres over soft mottling and speckle; fuzzy fibres along every cut edge; 2–5 px darker "thickness" swept under the piece |
| Cardboard | Kraft face with flecks and grain; the edge is a swept band of vertical flute stripes (the corrugation) |
| Diorama depth | Every piece casts its own blurred drop shadow, sized by how far it is lifted off the layer below |
| Hand-cut shapes | Ellipses wobbled by a few sine harmonics, plus a little scissor jitter |
| Stitching | Dashed thread line set in from the edge, with a tiny shadow |
| Haberdashery | Wooden buttons (grain rings, 4 holes, thread cross), twisted-ply yarn, yarn ball |
| Paper | Layered noise, faceted crease shading, crease lines, vignette |
