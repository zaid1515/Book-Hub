let logsBuffer = [];
const ApiLogs = require('../models/apiLogsModel');
const originalConsoleLog = console.log;
// const geoip = require('geoip-lite');
const multer = require('multer');

console.log = function (...args) {
    args.map((arg) => {
        if (arg && typeof arg === 'object' && Array.isArray(arg.files)) {
            arg.files.forEach(file => {
                logsBuffer.push(file);
            });
        } else {
            logsBuffer.push(arg);
        }
    });

    originalConsoleLog.apply(console, args);
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function logMiddleware(req, res, next) {
    // const ip = "223.189.24.250" || req.ip;
    // const ip = req.headers['x-forwarded-for']
    let responseBody = '';

    const startMemoryUsage = process.memoryUsage().heapUsed;

    const startTime = Date.now();

    const originalSend = res.send;
    res.send = function (data) {
        responseBody = data;
        originalSend.call(this, data);
    };

    const originalJson = res.json;
    res.json = function (data) {
        // console.log(data)
        responseBody = data;
        // console.log(responseBody)
        originalJson.call(this, data);
    };

    try {
        next();

        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        let sizeInKB;
        req.on('end', () => {
            const sizeInBytes = Buffer.byteLength(data, 'utf8');
            sizeInKB = sizeInBytes / 1024;
        });

        res.on('finish', async () => {
            const endMemoryUsage = process.memoryUsage().heapUsed;

            const memoryUsage = (endMemoryUsage - startMemoryUsage) / 1024 / 1024;

            const endTime = Date.now();
            const timeTaken = endTime - startTime;

            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const log = await ApiLogs.create({
                method: req.method,
                url: url,
                requestBody: req.body,
                responseBody: responseBody ? JSON.parse(responseBody) : null,
                statusCode: res.statusCode,
                query: req.query,
                params: req.params,
                headers: req.headers,
                memoryUsageInMb: memoryUsage,
                timeTakenInMs: timeTaken,
                // ipAddress: req.headers['x-forwarded-for'],
                // location: geoip.lookup(ip),
                requestBodySizeInKB: sizeInKB,
                consoleLogs: logsBuffer,
                filesUploaded: req.files || req.file
            });
            console.log('Log saved successfully');
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

module.exports = logMiddleware;
