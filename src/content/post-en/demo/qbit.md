---
title: "Deploying qBittorrent"
description: "How to install, start, and auto-run qBittorrent, plus a quick note on trackers and Alist"
publishDate: "12 May 2025"
tags: ["qBittorrent", "Alist"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

## 1. Install qBittorrent

Debian:

```bash
apt update
apt install -y qbittorrent-nox
```

CentOS:

```bash
yum install -y qbittorrent-nox
```

## 2. Start qBittorrent

Start the web panel on a custom port. (The default is `8080`, which is easy to conflict with.)

```bash
qbittorrent-nox --webui-port=1145
```

Run it in the background:

```bash
qbittorrent-nox -d
```

Check the version:

```bash
qbittorrent-nox -v
```

![image.png](https://roim-picx-9nr.pages.dev/rest/8vshySK.png)

(The versions installed through `apt` and `yum` are a bit old, but it is fine. I am lazy.)

## 3. Access the panel

Open the panel according to the address shown in the terminal output.

![image.png](https://roim-picx-9nr.pages.dev/rest/zeS7ySK.png)

Alright, you are in. (Do not tell me you forgot to open the port.)

![image.png](https://roim-picx-9nr.pages.dev/rest/IL8IySK.png)

Change the password first:

![image.png](https://roim-picx-9nr.pages.dev/rest/XTk8ySK.png)

Open an incognito window to test it:

![image.png](https://roim-picx-9nr.pages.dev/rest/x4z8ySK.png)

Successfully logged in with the new password, so the change worked.

## 4. Configure auto-start on boot

```bash
vi /etc/systemd/system/qbittorrent-nox.service
```

Paste this in:

```ini
[Unit]
Description=qBittorrent-nox
After=network.target

[Service]
User=root
Type=forking
RemainAfterExit=yes
ExecStart=/usr/bin/qbittorrent-nox -d

[Install]
WantedBy=multi-user.target
```

Then save and quit with `:wq`.

- In order for the `systemd` service to start correctly, you should first terminate the currently running `qbittorrent-nox` process.

Check the process:

```bash
ps aux | grep qbittorrent-nox
```

You can see that the process with PID `3198299`, `qbittorrent-nox -d`, is running:

```bash
root     3198299  0.2  1.9 906260 48272 ?        Ssl  01:04   0:04 qbittorrent-nox -d
root     3211211  0.0  0.0   6464  2148 pts/1    S+   01:30   0:00 grep qbittorrent-nox
```

Kill it first:

```bash
sudo kill -9 3198299
```

Then verify it is really gone. The output should contain only the `grep qbittorrent-nox` line and no other `qbittorrent-nox` process:

```bash
ps aux | grep qbittorrent-nox
```

Now it can be started:

```bash
systemctl start qbittorrent-nox
systemctl enable qbittorrent-nox
```

Check whether it was set successfully. If it shows `enabled`, it has been configured to start on boot:

```bash
sudo systemctl status qbittorrent-nox.service
```

![image.png](https://roim-picx-9nr.pages.dev/rest/ZCUlySK.png)

A shorter way to check:

```bash
sudo systemctl is-enabled qbittorrent-nox.service
```

![image.png](https://roim-picx-9nr.pages.dev/rest/PLVMySK.png)

## 5. Uninstall qBittorrent

I will not demonstrate this one.

```bash
# Stop the service
sudo systemctl stop qbittorrent-nox.service

# Disable the service
sudo systemctl disable qbittorrent-nox.service

# Uninstall qbittorrent-nox and remove configuration files
sudo apt purge -y qbittorrent-nox

# Clean up leftover dependencies
sudo apt autoremove -y

# Remove the systemd service file
sudo rm /etc/systemd/system/qbittorrent-nox.service
sudo systemctl daemon-reload
```

## 6. About trackers

If you do not configure trackers, some less popular resources may have no download speed.

How to add them: just paste the links in and click save, one per line:

![image.png](https://roim-picx-9nr.pages.dev/rest/Ql3nySK.png)

How to get tracker links:

https://github.com/XIU2/TrackersListCollection/blob/master/README-ZH.md

Try downloading a movie. The speed is actually pretty good.

![image.png](https://roim-picx-9nr.pages.dev/rest/y0BPySK.png)

Since we are already here, you can also mount it through Alist. Choose `Local Storage`, set any mount name you want, and make the root folder path the qBittorrent download directory. By default it is `/root/Downloads/`.

![image.png](https://roim-picx-9nr.pages.dev/rest/AcqQySK.png)

Now you have a free magnet-link movie-watching tool, and you can say goodbye to bloated Thunder.

![image.png](https://roim-picx-9nr.pages.dev/rest/engRySK.png)
