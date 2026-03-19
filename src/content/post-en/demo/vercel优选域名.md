---
title: "Speed Up a Website with Optimized Vercel Domains"
description: "A quick note on using optimized Vercel domains to improve access speed"
publishDate: "11 Jan 2025"
tags: ["优选", "Vercel"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

My blog is deployed on Vercel, but access from mainland China is very slow, so I set up an optimized domain to speed it up and improve the experience.

## Configure the domain

Although Vercel assigns a domain after you create a project, it performs poorly and is also hard to remember. First, go to Vercel settings and configure a domain in the `Domain` section.

![image.png](https://roim-picx-9nr.pages.dev/rest/TxWRmmK.png)

## Optimized domain

Reference domains for Vercel optimization:

- `vercel.cdn.cyfan.top` recommended
- `vercel.cdn.yt-blog.top`
- `vercel-cname.xingpingcn.top`

For DNS records:

`A` record --> `76.76.21.21`
`CNAME` --> any one of the optimized domains above

![image.png](https://roim-picx-9nr.pages.dev/rest/18VrmmK.png)

## Speed testing

[Test with itdog](https://www.itdog.cn)

![image.png](https://roim-picx-9nr.pages.dev/rest/YzOummK.png)

[Test with Google PageSpeed](https://pagespeed.web.dev)

Mobile

![image.png](https://roim-picx-9nr.pages.dev/rest/wtMTmmK.png)

Desktop

![image.png](https://roim-picx-9nr.pages.dev/rest/WavTmmK.png)

[Test with GTmetrix](https://gtmetrix.com)

![image.png](https://roim-picx-9nr.pages.dev/rest/ihUummK.png)

Much better now...
