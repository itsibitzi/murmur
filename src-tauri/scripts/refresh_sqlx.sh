#!/usr/bin/env bash
set -e;

SCRIPT_PATH=$( cd $(dirname $0) ; pwd -P )

DB_PATH="${SCRIPT_PATH}/../murmur.db"

DATABASE_URL="sqlite://${DB_PATH}" 

if [ -f "$DB_PATH" ];
then
    rm "$DB_PATH"
fi

# Create DB
echo "VACUUM;" | sqlite3 "$DB_PATH" 
cargo sqlx migrate run --database-url "$DATABASE_URL"

# Update SQLx 
cargo sqlx prepare --database-url "$DATABASE_URL"

popd
