---
title: "Building a Node on Serv00"
description: "A quick record of deploying a sing-box vmess node on Serv00 with Argo"
publishDate: "19 Dec 2024"
tags: ["vps", "singbox"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

# 1. Background and prerequisites

Serv00 recently opened S14, and I grabbed two small machines to play with, so I wrote this down as a way to build a backup proxy node.

- Prerequisites:
- 1. Register and log in to a Serv00 account
- 2. Open the required Serv00 permissions and ports

![](https://roim-picx-9nr.pages.dev/rest/gC2n7LK.png)

- Randomly choose a TCP port

![](https://roim-picx-9nr.pages.dev/rest/3mqn7LK.png)

# 2. Install sing-box with a script and deploy a vmess node

Because I did not want a node with too many protocols, I did not choose those all-in-one scripts. I picked a modified script that supports only the vmess protocol. The GitHub repository is:

https://github.com/amclubs/am-serv00-vmess

- Installation command:

```bash
bash <(curl -Ls https://raw.githubusercontent.com/amclubs/am-serv00-vmess/main/install_serv00_vmess.sh)
```

## Installation

- Enter `1` to install sing-box

- ![](https://roim-picx-9nr.pages.dev/rest/U4To7LK.png)

- Confirm the installation and enter the TCP port you generated earlier

- Confirm that you want to use an Argo tunnel

  ![](https://roim-picx-9nr.pages.dev/rest/928P7LK.png)

  You can use a random Argo tunnel here, but a fixed Argo tunnel is more stable. So just follow the script flow and move on to creating one.

## Create a fixed Argo tunnel

First, you need a domain managed by Cloudflare. Then open Cloudflare and click here:

![](https://roim-picx-9nr.pages.dev/rest/0eWp7LK.png)

(You need to bind a payment method to enable this feature. I used PayPal successfully. The free plan is enough.)

Then click `Tunnels`.

![](https://roim-picx-9nr.pages.dev/rest/vOlQ7LK.png)

Create a tunnel. The name can be anything.

![](https://roim-picx-9nr.pages.dev/rest/JFyQ7LK.png)

Continue.

![](https://roim-picx-9nr.pages.dev/rest/yl6q7LK.png)

Enter the tunnel name and click deploy.

![](https://roim-picx-9nr.pages.dev/rest/r9mq7LK.png)

Copy out the token for later use.

![](https://roim-picx-9nr.pages.dev/rest/Nv4R7LK.png)

Click next and fill in the corresponding content as shown below.

![](https://roim-picx-9nr.pages.dev/rest/Wicr7LK.png)

Click here to view the tunnel.

![](https://roim-picx-9nr.pages.dev/rest/okMr7LK.png)

Copy the domain name.

![](https://roim-picx-9nr.pages.dev/rest/n5zr7LK.png)

Then fill the tunnel name into the panel and enter the token you saved earlier. You will then see the generated node. Import it into V2Ray and it will work.

![](https://roim-picx-9nr.pages.dev/rest/G5JS7LK.png)

## Set up origin port forwarding

To use Cloudflare optimized IPs to improve node speed, we need to configure origin port forwarding.

- Click the domain you just used, choose `DNS`, and click edit
- ![](https://roim-picx-9nr.pages.dev/rest/fWFT7LK.png)
- Change the `CNAME` to an `A` record, put in the server IP, and enable the orange cloud
- ![](https://roim-picx-9nr.pages.dev/rest/9YYT7LK.png)
- Then click `Rules`, and create an `Origin Rules` rule
- ![](https://roim-picx-9nr.pages.dev/rest/eZPt7LK.png)
- Fill it out according to the screenshot below, save, and deploy
- ![](https://roim-picx-9nr.pages.dev/rest/5Psu7LK.png)
- Then fill in the disguised domain in V2Ray
- ![](https://roim-picx-9nr.pages.dev/rest/fx7V7LK.png)
- At this point you can use any optimized IP you want. Tutorial finished.
