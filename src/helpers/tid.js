const { randomUUID } = require('crypto');



//process transaction id
exports.tidHandler = (request, response, next) => {
    if (!request.headers.tid) {
      request.headers.tid = randomUUID()
    }
    response.append('tid', request.headers.tid);
    next();
  }