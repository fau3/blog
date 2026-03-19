---
title: "Example 2: Markdown Admonitions"
description: "This article shows how to use Markdown admonitions in Astro Cactus"
publishDate: "1998-07-29"
tags: ["Example"]
ogImage: "/social-card.avif"
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

## What are admonitions?

Admonitions (also called "callouts") are used to provide supporting and supplementary information related to the main content.

## How to use them

To use admonitions in Astro Cactus, wrap your Markdown content in a pair of triple colons `:::`. The opening line should also include the type of admonition you want to use.

For example, using this Markdown:

```md
:::note
Highlights information users should pay attention to, even while skimming.
:::
```

Output:

:::note
Highlights information users should pay attention to, even while skimming.
:::

## Admonition types

The following admonition types are currently supported:

- `note`
- `tip`
- `important`
- `warning`
- `caution`

### Note

```md
:::note
Highlights information users should pay attention to, even while skimming.
:::
```

:::note
Highlights information users should pay attention to, even while skimming.
:::

### Tip

```md
:::tip
Optional information that helps users succeed.
:::
```

:::tip
Optional information that helps users succeed.
:::

### Important

```md
:::important
Key information required for user success.
:::
```

:::important
Key information required for user success.
:::

### Warning

```md
:::warning
Critical content that requires immediate attention because of potential risk.
:::
```

:::warning
Critical content that requires immediate attention because of potential risk.
:::

### Caution

```md
:::caution
Potential negative consequences of an action.
:::
```

:::caution
Potential negative consequences of an action.
:::

## Custom admonition titles

You can customize the admonition title with the following syntax:

```md
:::note[My custom title]
This is an admonition with a custom title.
:::
```

Output:

:::note[My custom title]
This is an admonition with a custom title.
:::
