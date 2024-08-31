#!/bin/bash

# Find the process running on the port  and kill it
# Adjust the port to the one your app runs on

PID=$(lsof -ti:4500)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "Stopped server running on port 4500"
else
  echo "No server running on port 4500"
fi