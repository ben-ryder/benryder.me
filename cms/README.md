# CMS

## Setup

1. Ensure postgres is installed and set up locally.
```bash
# Install postgres
sudo apt install postgresql postgresql-contrib
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
