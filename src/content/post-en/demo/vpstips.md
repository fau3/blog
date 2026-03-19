---
title: "VPS Tips"
description: "A small collection of Docker, SSH, and fail2ban commands for VPS setup"
publishDate: "1 Jan 2025"
tags: ["vps", "Docker"]
---

<!-- hash: manual_translation -->

> This article is translated from the Chinese original.

Docker

```bash
Non-mainland servers
wget -qO- get.docker.com | bash
or
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh

Docker installation for mainland China servers
curl https://install.1panel.live/docker-install -o docker-install && sudo bash ./docker-install && rm -f ./docker-install

Check Docker version
docker -v

Enable Docker on boot
sudo systemctl enable docker

Uninstall Docker
sudo apt-get purge docker-ce docker-ce-cli containerd.io
sudo apt-get remove docker docker-engine
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd

Check Docker Compose version
docker compose version
```

SSH

Change the default port `22` to `11451`:

```bash
sudo sed -i 's/^#\\?Port 22.*/Port 11451/g' /etc/ssh/sshd_config
```

Restart the `sshd` service:

```bash
sudo systemctl restart sshd
```

fail2ban

Install fail2ban:

```bash
apt install fail2ban
```

Configure fail2ban

The fail2ban configuration files are usually located in `/etc/fail2ban/`. The `.conf` files can be overridden by `.local`, so it is recommended to add a `.local` file instead of modifying the original configuration.

```bash
nano /etc/fail2ban/jail.local
```

Use the following configuration:

```ini
[DEFAULT]
# List of ignored IPs (whitelist)
ignoreip = 127.0.0.1

# Allow ipv6
allowipv6 = auto

# Log monitoring backend (gamin, polling, or auto)
backend = systemd

# Per-service inspection settings, such as bantime, findtime, maxretry

[sshd]

# Enable this jail (true/false)
enabled = true

# Name of the filter, corresponds to filter.d/sshd.conf
filter = sshd

# SSH port
port = ssh

# Action parameters
action = iptables[name=SSH, port=ssh, protocol=tcp]

# System login log file
logpath = /var/log/secure

# Ban duration, in seconds
bantime = 86400

# If attempts exceed the limit within this period, the IP will be banned
findtime = 86400

# Maximum number of retries
maxretry = 3
```

Press `Ctrl+S` to save and exit.

Enable fail2ban on boot:

```bash
sudo systemctl enable fail2ban
```

Restart fail2ban:

```bash
sudo systemctl restart fail2ban
```

Check fail2ban status:

```bash
sudo systemctl status fail2ban
```

Check all available jail statuses:

```bash
fail2ban-client status
```
