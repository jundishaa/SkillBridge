[0;1;32m●[0m mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; enabled; vendor preset: enabled)
     Active: [0;1;32mactive (running)[0m since Wed 2025-01-01 21:48:09 WAT; 42s ago
       Docs: https://docs.mongodb.org/manual
   Main PID: 2802 (mongod)
     Memory: 89.4M
     CGroup: /system.slice/mongod.service
             └─2802 /usr/bin/mongod --config /etc/mongod.conf

Jan 01 21:48:09 Jundipc systemd[1]: Started MongoDB Database Server.
Jan 01 21:48:11 Jundipc mongod[2802]: {"t":{"$date":"2025-01-01T20:48:11.841Z"},"s":"I",  "c":"CONTROL",  "id":7484500, "ctx":"-","msg":"Environment variable MONGODB_CONFIG_OVERRIDE_NOFORK == 1, overriding \"processManagement.fork\" to false"}
