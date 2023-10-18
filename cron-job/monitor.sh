#!/bin/bash

now=$(date)
status=$( docker container inspect -f '{{.State.Status}}' ms-dev-container )
pid_process=$( docker inspect -f '{{.State.Pid}}' ms-dev-container )

echo "EXECUTING MONITOR - $now"

echo "checking status container ms-dev-container"
if [ "$status" = "running" ] && [ "$pid_process" != "0" ]
then
  echo "ok. container status - $status | pid process - $pid_process"
else
  echo "need to restart container: status - $status | pid process - $pid_process"
  echo "restarting container"
  docker start ms-dev-container
fi

echo "MONITOR FINISHED"
