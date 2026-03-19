---
title: "Enable Swap on Debian / Ubuntu"
description: "A quick note on creating, enabling, tuning, and disabling swap space"
publishDate: "16 Feb 2025"
tags: ["Swap", "Linux"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

Recently I picked up a junky little NAT VPS. It kept running out of memory and shutting down. Enabling swap helps a bit, enough to keep it barely running.

## What is swap?

Swap is like a backup tire for memory. When physical memory is not enough, the system moves older data out of RAM and lets it lie on disk instead. It is slow, painfully slow, but still better than having your programs die on the spot.

## Check the swap partition

```bash
free -m
```

![image.png](https://roim-picx-9nr.pages.dev/rest/C0V4YOK.png)

You can see that the swap partition is `0`, which means it is not enabled.

## Enable swap

A cleaner way is to create the swap file with `fallocate`:

```bash
fallocate -l 256MB /swapfile
```

A more old-school way:

```bash
dd if=/dev/zero of=/swapfile bs=1M count=256
```

In general, if your RAM is below 2 GB, setting swap to around 1.5 to 2 times the RAM is fine.

Set file permissions:

```bash
chmod 600 /swapfile
```

Activate the swap partition:

```bash
mkswap /swapfile
swapon /swapfile
```

After doing that, run `free -m` again and you should see that swap has been enabled.

![image.png](https://roim-picx-9nr.pages.dev/rest/zY4GYOK.png)

Below is some cleanup work.

## Start automatically on boot

```bash
echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
```

## Adjust the swappiness value

The default swappiness value is `60` (`0` to `100`). If it is too high, memory swapping happens too often and the CPU suffers.

You can check the value with:

```bash
cat /proc/sys/vm/swappiness
```

![image.png](https://roim-picx-9nr.pages.dev/rest/9OkgYOK.png)

Set it a bit lower. This VPS is already a pile of recycled junk anyway.

Use this command:

```bash
echo "vm.swappiness=10" >> /etc/sysctl.conf
```

Then apply it:

```bash
sysctl -p
```

![image.png](https://roim-picx-9nr.pages.dev/rest/EDL6YOK.png)

## Enable it temporarily (will be lost after reboot)

```bash
sysctl vm.swappiness=10
```

## Disable swap

Turn off the swap partition:

```bash
swapoff -v /swapfile
```

Edit `fstab`:

```bash
vim /etc/fstab
```

Delete this line:

`/swapfile swap swap defaults 0 0`

Delete the `/swapfile` file:

```bash
rm /swapfile
```

- **Use swap wisely and your VPS will shut down less often; make it too large and your disk will wear out sooner.**
