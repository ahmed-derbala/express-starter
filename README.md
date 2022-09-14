# express-starter
a clean project to start an express app faster. This made using node v14

# features
- javascript with nodejs v14
- everything is configurable in /configs
- clean architecture: /src has the solution logic only
- socketio
- logs: winston (file, console, mongo)
- mongo as main db
- json requests logs with morgan and winston
- cluster: configurable in configs/app.config
- load config file based on NODE_ENV: example: const logConf = require(`../utils/requireConf`)('log')



# first run
```
npm i
npm run start:code
```
update to latest all packages

```
npm run update:all
```

# run dev envirement
```
npm run start:dev
```

# postman collection
you can import postman collection located in
```
docs/express-starter.postman_collection.json
```