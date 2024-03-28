const winston = require('winston');


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' })
  ]
});


function memoryLogger(req, res, next) {
  const memoryBefore = process.memoryUsage().heapUsed;
  const start = process.hrtime();

  res.on('finish', () => {
    const memoryAfter = process.memoryUsage().heapUsed;
    const end = process.hrtime(start);

    logger.info(`API Call: ${req.method} ${req.url}`);
    logger.info(`Memory Before: ${memoryBefore} bytes`);
    logger.info(`Memory After: ${memoryAfter} bytes`);
    logger.info(`Memory Diff: ${memoryAfter - memoryBefore} bytes`);
    logger.info(`Execution Time: ${end[0]}s ${end[1] / 1000000}ms`);
  });

  next();
}

module.exports=memoryLogger