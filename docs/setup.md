# Setup

## Database
```bash
# Copy the example setup
cp ./scripts/example.setup.sql ./scripts/setup.sql

# Edit the setup.sql file as required

# Run the setup to create the user & database
psql postgres -f ./scripts/setup.sql
```