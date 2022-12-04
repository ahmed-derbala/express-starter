# express-starter
a clean project to start an express app faster. This made using node v14

# features
- javascript with nodejs v14 and express 5
- everything is configurable in /configs
- clean architecture
- pm2 
- socketio
- logs: winston (file, console, mongo) with memory infos 
- mongo as main db
- custom json requests logs with morgan and winston
- cluster: configurable in configs
- load config file based on NODE_ENV
- api limiter
- use_strict: true by default


# first run: install modules and start the app with vscode
```
npm run i && npm run start:code
```

# production
by default pm2 is used on production and --max-old-space-size=32000 is set

# postman collection
you can import postman collection located in
```
docs/express-starter.postman_collection.json
```