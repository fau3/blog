# GoToSocial deployment for `fft.im`

This folder is a deployment template for the split-domain layout you already chose:

- account domain: `fft.im`
- host domain: `social.fft.im`
- blog / WebFinger / host-meta / nodeinfo redirects: served by your Astro site on Vercel
- ActivityPub server: GoToSocial on your Singapore VPS

Important:

- Do **not** change `host` / `account-domain` after the instance has federated.
- Keep `social.fft.im` pointed directly at your VPS while bringing this up.

## Files

- `.env.example`: GoToSocial runtime settings
- `docker-compose.yml`: single-container GoToSocial deployment
- `Caddyfile.example`: simple reverse proxy with automatic TLS
- `nginx/social.fft.im.conf`: Nginx reverse proxy starter config

## 1. DNS

Make sure these records are in place:

- `fft.im` stays on Vercel
- `social.fft.im` points to your Singapore server

## 2. Install Docker

On a Debian / Ubuntu server:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker "$USER"
newgrp docker
docker --version
docker compose version
```

## 3. Prepare GoToSocial

```bash
sudo mkdir -p /opt/gotosocial
sudo chown "$USER":"$USER" /opt/gotosocial
cd /opt/gotosocial
cp /path/to/this/repo/deploy/gotosocial/.env.example .env
cp /path/to/this/repo/deploy/gotosocial/docker-compose.yml .
mkdir -p data
```

Edit `.env` and keep these values aligned with your blog config:

```env
GTS_HOST=social.fft.im
GTS_ACCOUNT_DOMAIN=fft.im
GTS_PROTOCOL=https
```

Notes:

- `GTS_BIND_ADDRESS=0.0.0.0` is intentional in Docker. The container listens on all interfaces internally, but compose only publishes it on `127.0.0.1`.
- If your Docker bridge gateway is not `172.17.0.1`, update `GTS_TRUSTED_PROXIES`.

## 4. Start GoToSocial

```bash
cd /opt/gotosocial
docker compose pull
docker compose up -d
docker compose logs -f gotosocial
```

Quick health checks:

```bash
curl -I http://127.0.0.1:8080/livez
curl -I http://127.0.0.1:8080/readyz
```

## 5. Put a reverse proxy in front

Pick one option.

### Option A: Caddy

Good for a personal VPS because it handles HTTPS for you.

```bash
sudo apt update
sudo apt install -y caddy
sudo cp /path/to/this/repo/deploy/gotosocial/Caddyfile.example /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl restart caddy
sudo systemctl enable caddy
```

### Option B: Nginx + Certbot

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
sudo cp /path/to/this/repo/deploy/gotosocial/nginx/social.fft.im.conf /etc/nginx/sites-available/social.fft.im.conf
sudo ln -s /etc/nginx/sites-available/social.fft.im.conf /etc/nginx/sites-enabled/social.fft.im.conf
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d social.fft.im
sudo systemctl enable nginx
```

## 6. Create your first user

Important: launch the server once before running the admin CLI.

```bash
cd /opt/gotosocial
docker compose exec gotosocial \
  /gotosocial/gotosocial admin account create \
  --username faust \
  --email you@example.com \
  --password 'replace-with-a-strong-password'
```

Promote the user to admin:

```bash
cd /opt/gotosocial
docker compose exec gotosocial \
  /gotosocial/gotosocial admin account promote \
  --username faust

docker compose restart gotosocial
```

## 7. Verify the whole split-domain setup

On the VPS:

```bash
curl -I https://social.fft.im/readyz
```

From anywhere:

```bash
curl 'https://fft.im/.well-known/webfinger?resource=acct:faust@fft.im'
curl -I 'https://fft.im/.well-known/nodeinfo'
```

Expected behavior:

- `https://social.fft.im/readyz` returns `200`
- `https://fft.im/.well-known/webfinger?...` returns JSON pointing at `https://social.fft.im/users/faust`
- `https://fft.im/.well-known/nodeinfo` redirects to `https://social.fft.im/.well-known/nodeinfo`

Then try searching for `@faust@fft.im` from another Fediverse instance.

## 8. Useful commands

```bash
cd /opt/gotosocial
docker compose ps
docker compose logs -f gotosocial
docker compose restart gotosocial
```

Backup the instance data:

```bash
cd /opt/gotosocial
tar czf gotosocial-backup-$(date +%F).tar.gz data
```

## References

- Split-domain deployments: https://docs.gotosocial.org/en/latest/advanced/host-account-domain/
- Reverse proxy overview: https://docs.gotosocial.org/en/latest/getting_started/reverse_proxy/
- Nginx: https://docs.gotosocial.org/en/latest/getting_started/reverse_proxy/nginx/
- Caddy: https://docs.gotosocial.org/en/latest/getting_started/reverse_proxy/caddy/
- Creating users: https://docs.gotosocial.org/en/latest/getting_started/user_creation/
- Health checks: https://docs.gotosocial.org/en/latest/advanced/healthchecks/
