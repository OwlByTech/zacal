## Getting Started
To getting started you must have installed docker compose on
your machine.

1. Copy the `dev.env` to .env and change propertly. if is your first
setup the default config is enough.

2. Run `docker compose up -d`

3. Run migrations `docker compose exec core npx medusa migrations run`

4. Create Admin user `docker compose exec core npx medusa user --email <admin-email> --password <admin-password>`

5. Create products and then open `http://localhost:8000` in linux you should open `http://10.8.0.4:8000`

## Directus Added to Next.Js
To use directus with next.js, nedd this configurations.

1. In the directory where Next.js is located, install the Directus SDK. `npm install @directus/sdk`
2. To upload images to Directus, permissions need to be granted. `docker exec -u root <directus-container-id> chown -R node:node /directus/database /directus/extensions /directus/uploads`
3. Restart the Directus container. `docker restart <directus-container-id>`
