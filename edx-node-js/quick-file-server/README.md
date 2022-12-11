```sh
node -e "fs.mkdirSync('static')" # create folder named "static"

serve path # to serve a folder

serve -p 5050 static

node -e "fs.unlinkSync('server.js')" # remove file

node -e "fs.mkdirSync('mock-srv')"

npm init fastify
```