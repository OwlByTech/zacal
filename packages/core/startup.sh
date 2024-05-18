#!/bin/sh
# TODO: Check if the script is running on docker container or outside.
echo "Installing bash..."
apk add bash

echo "Installing dependiencies"
yarn add file:./medusa-nodemailer
yarn install
ls
pwd

if [ $ENV = "prod" ]; then
  echo "------------ PRODUCTION MODE ------------"
  echo "Not implemented yet."
else
  echo "------------ DEVELOPMENT MODE ------------"
  npx @medusajs/medusa-cli develop
fi
