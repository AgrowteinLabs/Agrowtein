#!/bin/bash
# stop_server.sh
# Kills any running Node.js processes

echo "Stopping any existing Node.js processes..."

if pgrep node > /dev/null
then
    pkill node
    echo "Node.js processes stopped successfully."
else
    echo "No Node.js process was running."
fi