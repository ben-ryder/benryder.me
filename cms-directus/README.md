# CMS

## Setup

1. Ensure postgres is installed and set up locally
```bash
# Install postgres
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service

# Create a new user (use your username)
sudo -u postgres createuser --interactive
```

2. Create the database that Directus will use
```bash
# Copy the example setup
cp ./scripts/example.setup.sql ./scripts/setup.sql

# Edit the setup.sql file as required

# Run the setup to create the user & database
psql postgres -f ./scripts/setup.sql
```

3. Copy the example setup script
```bash
cp ./scripts/example.setup.sql ./scripts/setup.sql
```

4. Edit the setup script as required

5. Run the setup to create the user & database
```bash
psql postgres -f ./scripts/setup.sql
```

6. Copy the `.env.example` file and edit as required
```bash
cp .env.example .env
```

6. Set up the database and then start
```bash
npm run setup
npm run start
```
