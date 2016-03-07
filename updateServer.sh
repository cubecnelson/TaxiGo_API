#!/bin/bash
rsync -avzh --rsh='ssh -p22022' --exclude 'server/datasources.json' ./* test@taxigomo.com:~/taxigo/;
