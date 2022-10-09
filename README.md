# express-starter
a clean project to start an express app faster. This made using node v16

# features
- javascript with nodejs v16 and express 5
- everything is configurable in /configs
- clean architecture: /src has the solution logic only, outside /src can be used in any project and they doesnt require much tuning
- pm2 on production with npm start
- socketio
- logs: winston (file, console, mongo) with memory infos 
- mongo as main db
- custom json requests logs with morgan and winston
- cluster: configurable in configs/app.config
- load config file based on NODE_ENV: example: const logConf = require(`../utils/requireConf`)('log'), so if NODE_ENV=production and configs/log.config.production exists it will be used instead of configs/log.config
- api limiter
- use_strict: true


# first run: install modules and start the app with vscode
```
npm run packages:install
npm run start:code
```

# production
by default pm2 is used on production and --max-old-space-size=32000 is set

# postman collection
you can import postman collection located in
```
docs/express-starter.postman_collection.json
```