#!/bin/sh
# TODO: Check if the script is running on docker container or outside.
echo "Installing bash..."
apk add bash

echo "Installing dependiencies"
cd medusa-nodemailer
yarn install
yarn build:server
rm -r node_modules/@medusajs
cd ..
yarn add file:./medusa-nodemailer
yarn install

if [ $ENV = "prod" ]; then
  echo "------------ PRODUCTION MODE ------------"
  echo "Not implemented yet."
else
  echo "------------ DEVELOPMENT MODE ------------"
  npx @medusajs/medusa-cli develop
fi
