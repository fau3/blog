---
title: "Example 3: Add a Cover Image"
description: "An example showing how to add a cover image"
publishDate: "1998-07-28"
coverImage:
  src: "./cover.png"
  alt: "Cover image"
tags: ["Example"]
ogImage: "/social-card.avif"
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

## Adding a cover image

In the front matter (the section wrapped in `---` at the top), add a `coverImage` property and set the image path and description.

```yaml
---
title: "Example 3: Add a Cover Image"
description: "An example showing how to add a cover image"
publishDate: "1998-07-28"
coverImage:
  src: "./cover.png"
  alt: "Cover image"
tags: ["Example"]
ogImage: "/social-card.avif"
---

```

## Path

Place the image in the same folder as the article.

Import the image with `./cover.png`.

It works the same way inside the article body.

For example:

```md
![](./cover.png)
```

It will display as:

![Astro build wallpaper](./cover.png)
