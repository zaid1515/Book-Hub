const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    method: String,
    url: String,
    headers:Object,
    params:Object,
    query:Object,
    requestBody: Object,
    statusCode: Number,
    responseBody: Object,
    consoleLogs: Object,
    memoryUsageInMb: Number,
    timeTakenInMs: Number,
    location: Object,
    ipAddress:String,
    requestBodySizeInKB:Number,
    filesUploaded:Object,
    type:String,
},{timestamps:true,strict:false});

module.exports = mongoose.model('ApiLogs', logSchema);
