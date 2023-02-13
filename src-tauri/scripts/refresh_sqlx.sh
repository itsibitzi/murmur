#!/usr/bin/env bash
set -e;

SCRIPT_PATH=$( cd $(dirname $0) ; pwd -P )

DB_PATH="${SCRIPT_PATH}/../murmur.db"

DATABASE_URL="sqlite://${DB_PATH}" 
cargo sqlx prepare --database-url "$DATABASE_URL"
