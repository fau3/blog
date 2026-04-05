const fs = require('fs');

let baseContent = fs.readFileSync('src/layouts/Base.astro', 'utf-8');

// 1. Insert import
baseContent = baseContent.replace(
    'import Header from "@/components/layout/Header.astro";',
    'import Header from "@/components/layout/Header.astro";\nimport MetingAssets from "@/components/MetingAssets.astro";'
);

// 2. Remove the { hasMeting...link... }
const linkRegex = /\{\s*hasMeting && \(\s*<link rel="stylesheet".*?APlayer\.min\.css"\s*\/>\s*\)\s*\}/gm;
baseContent = baseContent.replace(linkRegex, '{hasMeting && <MetingAssets />}');

// 3. Remove the first script block
const script1Regex = /\s*<script is:inline>\s*\(\(\) => \{\s*const APPLAYER_SCRIPT_ID[\s\S]*?\}\)\(\);\s*<\/script>/gm;
baseContent = baseContent.replace(script1Regex, '');

// 4. Remove the global style block
const styleRegex = /\s*<style is:global>\s*:root\[data-theme="dark"\] \.aplayer \{[\s\S]*?<\/style>/gm;
baseContent = baseContent.replace(styleRegex, '');

// 5. Remove the second script block
const script2Regex = /\s*<script is:inline>\s*\(\(\) => \{\s*function bindAlbumTitle[\s\S]*?\}\)\(\);\s*<\/script>/gm;
baseContent = baseContent.replace(script2Regex, '');

fs.writeFileSync('src/layouts/Base.astro', baseContent);
console.log("Successfully replaced blocks.");
