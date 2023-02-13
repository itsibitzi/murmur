#!/usr/bin/env bash
set -e;

SCRIPT_PATH=$( cd $(dirname $0) ; pwd -P )

DB_PATH="${SCRIPT_PATH}/../murmur.db"

pushd "${SCRIPT_PATH}/.."

if [ -f "$DB_PATH" ];
then
    rm "$DB_PATH"
fi

echo "VACUUM;" | sqlite3 "$DB_PATH" 
DATABASE_URL="sqlite://${DB_PATH}" cargo sqlx migrate run

popd