# CMS

## Setup
This setup assumes an Ubuntu/Debian/PopOS system.

1. Ensure postgres 15 is installed and set up locally.

**IMPORTANT:** Fly.io uses Postgres 15. To ensure compatibility will tools like `pg_dump` you must have the
same version locally. The default Postgres version from `sudo apt install postgresql postgresql-contrib` is v14 so won't work!

```bash
# Install postgres 15
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /etc/apt/trusted.gpg.d/pgdg.asc &>/dev/null
sudo apt update
sudo apt install postgresql-15 postgresql-client-15 -y
sudo systemctl start postgresql.service

# Create a new user (use your username)
sudo -u postgres createuser --interactive
```


2. Add `local.benryder.me` to the `/etc/hosts` file so captcha can work locally:
```bash
127.0.0.1       local.benryder.me
```

3. Create the database & user that Directus will use.
```bash
# This will create a cms_benryder_me db & user.
npm run db:init
```

4. Copy the `.env.example` file and edit as required.
```bash
cp .env.example .env
```

5. Set up the database and then start.
```bash
# This will bootstrap Directus and import the latest config snapshot.
npm run setup

# This will start the project... obviously.
npm run start
```

6. Rather than setting up a fresh database, you could also restore an existing local backup:
```bash
# This will restore an existing backup done with `npm run db:dump`.
npm run db:restore
```
