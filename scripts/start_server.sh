#!/bin/bash

cd /home/ubuntu/Agrowtein
npm install
npm run build
node dist/app.js > /dev/null 2>&1 &


exit 0
