/Applications/MySQLWorkbench.app/Contents/MacOS/mysqldump  --set-gtid-purged=OFF --user=sans -p 11676178 --protocol=socket --socket=/Applications/MAMP/tmp/mysql/mysql.sock --default-character-set=utf8 --skip-triggers "sans_taxigo" > DemoData.sql;