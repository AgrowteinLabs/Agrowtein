#!/bin/bash

cd /home/ubuntu/Agrowtein
npm install
npm run build
nohup node dist/app.js &  # Start the server in the background