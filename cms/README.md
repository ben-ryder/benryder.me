# CMS

The Headless CMS used for content is [Directus](https://directus.io/docs/self-hosting/deploying)

Directus is database-first meaning by default you configure and manage the CMS via the database.  
There is currently no code-first configuration or version management of the CMS in this repo, however
I want to change this in the future: https://github.com/ben-ryder/benryder.me/issues/22

## Docker Hosting
You can self-host the Docker image provided here: https://hub.docker.com/r/directus/directus  

Example environment variable setup:
```dotenv
# Basic
PUBLIC_URL="https://cms.benryder.me"
SECRET="..."
TELEMETRY=""false"

# Initial admin user
ADMIN_EMAIL="..."
ADMIN_PASSWORD="..."

# Database
DB_CLIENT="pg"
DB_CONNECTION_STRING="postgresql://postgres:...."

# Storage
STORAGE_LOCATIONS="local"
STORAGE_LOCAL_ROOT="/files"

# Custom
RAILWAY_RUN_UID="0" # ensure docker has permissons to use storage mount
```

### Other Tips
- Consider using a CDN/cache layer to cache public asset requests to `/assets/*`
- Ensure backups are in place to allow for rolling back or restoring database and files.
