all application customizations can be made here.
you dont need to make changes to code outside this folder
to make a config file for a specific NODE_ENV please create a file and concat the NODE_ENV. exemple: production.config.js

import example
```
const conf  = require(`../utils/loadConf`)
conf().db
```
