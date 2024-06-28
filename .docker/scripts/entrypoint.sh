#!/bin/sh

check_db_connection() {
  until nc -z -v -w30 "$DB_HOST" "$DB_PORT"; do
    echo "Waiting for the database to be up..."
    sleep 2
  done
}

check_db_connection

exec /usr/bin/supervisord -c /etc/supervisord.conf
