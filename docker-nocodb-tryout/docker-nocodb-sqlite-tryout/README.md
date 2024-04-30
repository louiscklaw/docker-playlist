```bash
$ docker run -d --name nocodb 
    -v "$(pwd)"/volume:/usr/app/data/ 
    -p 8080:8080 
    nocodb/nocodb:latest
```
