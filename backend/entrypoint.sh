#!/usr/bin/env bash

while :
do
    if  nc -z ${PA_DATABASE_HOST} 5432
    then
        sleep 1
        if  nc -z ${PA_DATABASE_HOST} 5432
        then
            break
        fi
    fi
    echo "Database not up, sleeping for 5 seconds."
    sleep 5
done

exec ${@}
