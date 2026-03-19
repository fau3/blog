---
title: "DeepSeek API and Several Ways to Use It"
description: "How to obtain a DeepSeek API key and connect it through NextChat, Vercel, or Docker"
publishDate: "2 Feb 2025"
tags: ["DeepSeek", "NextChat"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

---

# Getting the DeepSeek API and Several Ways to Use It

![NVIDIA Deepseek-R1 cover image](https://roim-picx-9nr.pages.dev/rest/hXTPPnK.png)

## 1. Get an NVIDIA API key

### 1. Register an account

**Entry point:** [NVIDIA NIM platform DeepSeek-R1 page](https://build.nvidia.com/deepseek-ai/deepseek-r1)

**Account types:**

- Personal email: limit of 1000 requests per day (Gmail / Outlook recommended)
- Business email: limit of 5000 requests per day (any business-domain email, no verification required)

**Registration process:**

1. Click `Sign In` in the top-right corner and log in with a Google account.
2. Fill out the registration form. (The company information can be made up.)
3. After submission, you will immediately receive an API key.

### 2. Key management

**Where to find it:** `Dashboard -> Get API Keys -> nvapi-xxxx`

![API key screenshot](https://roim-picx-9nr.pages.dev/rest/VndQPnK.png)

**Proxy base URL:**

```bash
https://integrate.api.nvidia.com/v1
```

**Technical details:**

- Full non-distilled 671B parameter model
- Supports 16k context
- Average response speed: 2 to 3 seconds per request

---

## 2. Local client setup with NextChat

### 1. Download the client

**Supported platforms:** Windows / macOS / Linux

**Download:** [GitHub Releases](https://github.com/ChatGPTNextWeb/NextChat/releases)

### 2. Configure the parameters

![Client configuration screenshot](https://roim-picx-9nr.pages.dev/rest/ajPqPnK.png)

**Required fields:**

```yaml
API Base URL: https://integrate.api.nvidia.com/v1
API Key: nvapi-xxxx
Custom Model ID: deepseek-ai/deepseek-r1
```

**Advanced settings:**

```markdown
- Temperature: 0.7 recommended (balances creativity and accuracy)
- Max Tokens: 2048 recommended (helps avoid truncation on long output)
```

---

## 3. Self-hosted deployment options

### Option A: Deploy on Vercel for free (recommended)

**Steps:**

1. Fork the repository: open [NextChat on GitHub](https://github.com/ChatGPTNextWeb/NextChat) and click `Fork` in the top-right corner.

2. Create a Vercel project:
   - Log in to [Vercel](https://vercel.com)
   - Choose `Import Project` and import the forked repository

3. Configure environment variables:

   ```env
   OPENAI_API_KEY=nvapi-xxxx
   BASE_URL=https://integrate.api.nvidia.com/v1
   CODE=access password (for example 123456)
   CUSTOM_MODELS=deepseek-ai/deepseek-r1
   DEFAULT_MODEL=deepseek-ai/deepseek-r1
   ```

4. After deployment, you will get a domain such as `your-project.vercel.app`. You can also bind your own domain.

5. Screenshot

   ![image.png](https://roim-picx-9nr.pages.dev/rest/FIptPnK.png)

### Option B: Local Docker deployment (reference only)

`docker-compose.yml`:

```yaml
version: '3'
services:
  nextchat:
    image: yidadaa/chatgpt-next-web
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=nvapi-xxxx
      - BASE_URL=https://integrate.api.nvidia.com/v1
      - CUSTOM_MODELS=deepseek-ai/deepseek-r1
      - DEFAULT_MODEL=deepseek-ai/deepseek-r1
    restart: unless-stopped
```

Start it with:

```bash
docker-compose up -d
```

---
