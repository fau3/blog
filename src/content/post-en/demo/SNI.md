---
title: "SNI and Cloudflare Traffic Hijacking"
description: "A simple explanation of SNI, proxy routing, and why Cloudflare can cause detours"
publishDate: "29 Jan 2025"
tags: ["优选", "Vercel"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

## 1. The basic idea of SNI

Imagine a members-only restaurant building:

- There are many different restaurants inside the building (multiple websites)
- SNI is like your reservation information ("I am going to restaurant xx")
- The front desk uses that reservation to guide you to the right restaurant

```mermaid
graph TB
    subgraph "Members-only restaurant building (server)"
    A[Front desk<br/>server reception] -->|SNI info| B[Restaurant 114]
    A -->|SNI info| C[Restaurant 514]
    A -->|SNI info| D[Restaurant 1919]
    end
    E[Visitor<br/>client] -->|Tells the reservation target<br/>SNI info| A
```

![image.png](https://roim-picx-9nr.pages.dev/rest/M3OgfnK.png)

## 2. Normal proxy flow

Think of it like this: you want to reach a place that can only be accessed through tunnels (the target site), so you hire a local guide (the proxy VPS) to help you get there.

```mermaid
sequenceDiagram
    participant C as You (client)
    participant P as Guide (proxy VPS)
    participant T as Destination (target site)
    
    Note over C,T: A normal proxy flow is like asking a guide to lead the way
    C->>P: 1. Find the guide (establish connection)
    C->>P: 2. Tell the guide the code word (SNI)
    P->>T: 3. The guide takes you to the destination
    T->>P: 4. Gets the resource
    P->>C: 5. Hands it to you
```

![image.png](https://roim-picx-9nr.pages.dev/rest/DhPgfnK.png)

## 3. Cloudflare hijacking flow

Now imagine that your guide works at a transit station called Cloudflare, so everyone has to check in there first.

```mermaid
graph LR
    subgraph "Full flow (double the trip)"
    A[You<br/>client] -->|1. Go to the transit station first| B[CloudFlare<br/>transit station]
    B -->|2. Pass through to the guide| C[Proxy VPS<br/>guide]
    C -->|3. Has to go back to the station| B
    B -->|4. Only then reaches the destination| D[Target site]
    end
    
    style B fill:#ff9,stroke:#333,stroke-width:4px
    style C fill:#bbf,stroke:#333,stroke-width:4px
```

![image.png](https://roim-picx-9nr.pages.dev/rest/lNUgfnK.png)

### 3.1 Traffic cost explanation

It is like a place that used to take only one trip to reach:

- Now you must report to the transit station first
- Then go from the transit station to the guide
- Then the guide has to bring you back to the transit station
- Only after that can you reach the final destination

As a result:

- The guide has to travel twice the distance (proxy VPS traffic doubles)
- The route becomes longer (higher latency)
- The cost increases (more bandwidth expense)

## 4. The SNI disguise mechanism

SNI disguise is like:

- You hold a special "passport" (SNI)
- On the surface it says you are going somewhere ordinary, such as `microsoft.com`
- In reality it is a code used to pass through a special channel

```mermaid
graph TB
    subgraph "SNI disguise mechanism"
    A[Your request] -->|Looks like it is going to Microsoft| B{Proxy server}
    B -->|Actual destination| C[Real website]
    end
```

![image.png](https://roim-picx-9nr.pages.dev/rest/kDZgfnK.png)

## 5. Why does Cloudflare hijack the traffic?

Imagine Cloudflare as a mandatory checkpoint:

- If you use their label (a Cloudflare domain)
- Then all related traffic must pass through them for inspection
- It cannot take another direct path

```mermaid
sequenceDiagram
    participant C as Client
    participant CF as CloudFlare (mandatory checkpoint)
    participant V as Proxy VPS (guide)
    participant T as Target site
    
    Note over C,T: The result of using a Cloudflare domain
    C->>CF: 1. Must be checked first
    CF->>V: 2. Passed on to the guide
    V-->>T: 3. Tries to go directly to the destination (fails)
    V->>CF: 4. Forced back to the checkpoint
    CF->>T: 5. Delivered by the checkpoint
```

![image.png](https://roim-picx-9nr.pages.dev/rest/PTa6fnK.png)

## 6. Best practice suggestions

To avoid this situation, you should:

1. Use a domain that is not proxied by Cloudflare
2. Or use direct IP connections
3. Avoid unnecessary relays

```mermaid
graph TB
    subgraph "Correct configuration"
    A[Client] -->|Contact directly| B[Proxy VPS]
    B -->|Access directly| C[Target site]
    end
    
    subgraph "Incorrect configuration"
    D[Client] -->|Forced relay| E[CloudFlare]
    E -->|Extra path| F[Proxy VPS]
    end
```

## Core takeaways

1. SNI is the "reservation information" for accessing a website
2. A proxy service is like asking a "guide" to lead the way
3. A Cloudflare domain can force traffic to take a detour
4. That detour doubles the traffic consumption
5. Choosing the right SNI helps avoid these problems
