var aws = require('aws-sdk');

module.exports = new aws.S3({
  //create new keys for this site
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-west-1'
});