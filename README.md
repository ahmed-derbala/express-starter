# express-starter
a clean project to start an express app faster. This made using node v14

# features
- javascript with nodejs v16 and express 5
- everything is configurable in /configs
- clean architecture: /src has the solution logic only
- pm2 on production with npm start
- socketio
- logs: winston (file, console, mongo) with memory infos 
- mongo as main db
- json requests logs with morgan and winston
- cluster: configurable in configs/app.config
- load config file based on NODE_ENV: example: const logConf = require(`../utils/requireConf`)('log'), so if NODE_ENV=production and configs/log.config.production exists it will be used instead of configs/log.config
- vscode: most npm scripts ends with && code .


# first run: update all modules and start the app with vscode
```
npm run update:all
```

# production
by default pm2 is used on production and --max-old-space-size=32000 is set

# postman collection
you can import postman collection located in
```
docs/express-starter.postman_collection.json
```