#!/bin/bash
# start_server.sh
# Starts the Node.js application

cd /home/ubuntu/Agrowtein || exit
echo "Starting the Node.js application..."
nohup node src/app.js > app.log 2>&1 &
echo "Node.js application started successfully."