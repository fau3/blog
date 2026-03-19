---
title: "Build a Personal Image Host with Cloudflare and roim-picx"
description: "How to deploy roim-picx on Cloudflare Pages and use it as your personal image bed"
publishDate: "30 Nov 2024"
tags: ["PICX", "CloudFlare"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

# 1. Create and configure the repository on GitHub

- Visit [roim-picx](https://github.com/roimdev/roim-picx) and fork it to your own account.

![](https://roim-picx-9nr.pages.dev/rest/wWhAqkK.png)

# 2. Deploy the image host service with Cloudflare Pages

- Log in to Cloudflare and connect it to GitHub as shown below.

![](https://roim-picx-9nr.pages.dev/rest/kANAqkK.png)

- Choose Pages.

![](https://roim-picx-9nr.pages.dev/rest/H8nAqkK.png)

- Select the repository you just forked and start the setup.
- Save and deploy with the default settings. (Choose `VUE` here.)
- ![](https://roim-picx-9nr.pages.dev/rest/aYNaqkK.png)
- After deployment succeeds, you will see a page that includes the image host URL.

# 3. Manage the image host

- Create a new KV namespace.

![](https://roim-picx-9nr.pages.dev/rest/WX60qkK.png)

- Create a new R2 bucket.

![](https://roim-picx-9nr.pages.dev/rest/mVP0qkK.png)

- Go to Settings and bind the three variables shown below.

![](https://roim-picx-9nr.pages.dev/rest/7JeBqkK.png)

- Go into the KV settings and set the login password.

![](https://roim-picx-9nr.pages.dev/rest/HytBqkK.png)

- Finally, redeploy the service.

![](https://roim-picx-9nr.pages.dev/rest/17obqkK.png)

- Now you can access it through the image host domain name. Enter the `TOKEN` to get into the upload and management page.

![](https://roim-picx-9nr.pages.dev/rest/lKfCqkK.png)
