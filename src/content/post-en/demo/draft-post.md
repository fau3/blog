---
title: "Example 4: Draft"
description: "This post is for testing the draft post functionality"
publishDate: "1998-07-27"
tags: ["Example"]
draft: true
ogImage: "/social-card.avif"
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

If your article is not finished yet,

add a `draft` property in the front matter (the section wrapped in `---` at the top), and set it to `true`.

In that case, the article will only be visible while running `pnpm run dev`, and it will be ignored in other situations.

```yaml
---
title: "Example 4: Draft"
description: "This post is for testing the draft post functionality"
publishDate: "1998-07-27"
tags: ["Example"]
draft: true
ogImage: "/social-card.avif"
---
```
