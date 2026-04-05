const fs = require('fs');

const baseContent = fs.readFileSync('src/layouts/Base.astro', 'utf-8');
const lines = baseContent.split('\n');

const linkStart = lines.findIndex(l => l.includes('hasMeting && ('));
const linkEnd = linkStart + 4; // up to '}'

const script1Start = lines.findIndex(l => l.trim() === '<script is:inline>' && lines[lines.indexOf(l)+2].includes('APPLAYER_SCRIPT_ID'));
const script1End = lines.indexOf('\t\t</script>', script1Start);

const styleStart = lines.findIndex(l => l.trim() === '<style is:global>');
const styleEnd = lines.indexOf('\t\t</style>', styleStart);

const script2Start = lines.findIndex(l => l.trim() === '<script is:inline>' && lines[lines.indexOf(l)+2].includes('bindAlbumTitle'));
const script2End = lines.indexOf('\t\t</script>', script2Start);

const metingContent = `---
// Meting JS/CSS Assets
---

<link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css" /></noscript>

${lines.slice(script1Start, script1End + 1).join('\n')}

${lines.slice(styleStart, styleEnd + 1).join('\n')}

${lines.slice(script2Start, script2End + 1).join('\n')}
`;

fs.writeFileSync('src/components/MetingAssets.astro', metingContent);

let newBaseContent = [
    ...lines.slice(0, 7),
    'import MetingAssets from "@/components/MetingAssets.astro";',
    ...lines.slice(7, linkStart - 1),
    '\t\t{hasMeting && <MetingAssets />}',
    ...lines.slice(script1End + 1, styleStart),
    ...lines.slice(styleEnd + 1, script2Start),
    ...lines.slice(script2End + 1)
].join('\n');

fs.writeFileSync('src/layouts/Base.astro', newBaseContent);
console.log("Done");
